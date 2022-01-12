require('dotenv').config()




// CONNECTING TO DATABASE
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();





// NATURAL LANGUAGE
const natural = require('natural');
const classifier = new natural.BayesClassifier();




        // HELPER FUNCTIONS //


function addUser(name, email, password, profile_picture){ // Need a default to be inserted

    const values = [name, email, password, profile_picture]
    const queryString = `
    INSERT INTO users (name, email, password, profile_picture)
    VALUES ($1, $2, $3, $4)`

    db.query(queryString, values)
    .then((res) => {
        console.log(res)
    })
    .catch(err => console.error(err))

}



// TEST FUNCTION FOR ADD USER
//addUser('Jamallllllllllllllllllll Flat', 'jamalllllly@mail.com', '123', 'http://fakepic.png') // <-- pic needs default

function categorizeAndInsertNewTodo(text, userID){

    const queryToReturnAllMemosAndTypes = `
    SELECT memo, memo_type
    FROM todos
    `

    db.query(queryToReturnAllMemosAndTypes)
    .then((res) => {


        //console.log(res.rows)
        const memoAndTypeArray = res.rows

        for (const set of memoAndTypeArray) {
            classifier.addDocument(set.memo, set.memo_type);
        }
        // Train classifier.addDocument("eat spaghetti", "To Watch")
    classifier.train();


    const type = classifier.classify(text)
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();


    // console.log(date)
    
    const values = [text, type, date, userID]
    const queryToInsertTodo = `
    INSERT INTO todos ( memo, memo_type, timestamp, user_id )
    VALUES ( $1, $2, $3, $4 );
    `

    db.query(queryToInsertTodo, values)
    .then((res) => {
    })
    .catch(err => console.error(err))

    })
    .catch(err => console.error(err))

}
// categorizeAndInsertNewTodo("000000000000000", 2)





function sortListOfTodosByCategoryAndId(userID, category){

    const values = [userID, category]
    const queryToReturnTodosBasedOnType = `
    SELECT memo, memo_type, timestamp
    FROM todos
    JOIN users ON user_id = users.id
    WHERE (user_id = $1 AND memo_type = $2)
    ORDER BY timestamp;
    `
    db.query(queryToReturnTodosBasedOnType, values)
    .then((res) => {

        const memoRows = res.rows // <---- Array of every memo and memo_type
        let memoList = []

        for (const memoSet of memoRows) {
            memoList.push(createMemoElement(memoSet))
        }
        memoList = memoList.join('\n');
        return memoList
    })
    .catch(err => console.error(err))

}
//sortListOfTodosByCategory(2, "To Eat")

function sortListOfTodosById(userID){

    const values = [userID]
    const queryToReturnTodosBasedOnType = `
    SELECT memo, memo_type, timestamp
    FROM todos
    JOIN users ON user_id = users.id
    WHERE user_id = $1
    ORDER BY timestamp;
    `
    db.query(queryToReturnTodosBasedOnType, values)
    .then((res) => {

        const memoRows = res.rows // <---- Array of every memo and memo_type
        let memoList = []

        for (const memoSet of memoRows) {
            memoList.push(createMemoElement(memoSet))
        }
        memoList = memoList.join('\n');
        return memoList
    })
    .catch(err => console.error(err))

}

//sortListOfTodosById(2)


function createMemoElement(todo){
    return `
                <ul class="list-group list-group-horizontal rounded-0 bg-transparent">
              <li class="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
                <div class="form-check">
                  <input
                    class="form-check-input me-0"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked1"
                    aria-label="..."
                    checked
                  />
                </div>
              </li>
              <li class="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                <p class="lead fw-normal mb-0">${todo.memo}</p>
              </li>
              <li class="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
                <div class="d-flex flex-row justify-content-end mb-1">
                  <a href="#!" class="text-info" data-mdb-toggle="tooltip" title="Edit todo"><i class="fas fa-pencil-alt me-3"></i></a>
                  <a href="#!" class="text-danger" data-mdb-toggle="tooltip" title="Delete todo"><i class="fas fa-trash-alt"></i></a>
                </div>
                <div class="text-end text-muted">
                  <a href="#!" class="text-muted" data-mdb-toggle="tooltip" title="Created date">
                    <p class="small mb-0"><i class="fas fa-info-circle me-2"></i>${todo.timestamp}</p></a>
                </div>
              </li>
            </ul>
    `
}



module.exports = {
    addUser,
    categorizeAndInsertNewTodo,
    sortListOfTodosByCategoryAndId,
    sortListOfTodosById
}