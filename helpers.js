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
// addUser('Jamal Flat', 'jamalllllly@mail.com', '123', 'http://fakepic.png') // <-- pic needs default

function categorizeAndInsertNewTodo(text, userID){

    const queryToReturnAllMemosAndTypes = `
    SELECT memo, memo_type
    FROM todos
    `

    db.query(queryToReturnAllMemosAndTypes)
    .then((res) => {

        const memoAndTypeArray = res.rows

        for (const set of memoAndTypeArray) {
            classifier.addDocument(set.memo, set.memo_type);
        }
        // Train
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
        console.log(res)
    })
    .catch(err => console.error(err))

    })
    .catch(err => console.error(err))

}
// categorizeAndInsertNewTodo("get new earrings", 2)





function sortListOfTodosByCategory(userID, category){

    const values = [userID, category]
    const queryToReturnTodosAndTypes = `
    SELECT memo, memo_type
    FROM todos
    JOIN users ON user_id = users.id
    WHERE (user_id = $1 AND memo_type = $2)
    ORDER BY timestamp;
    `
    db.query(queryToReturnTodosAndTypes, values)
    .then((res) => {

        const memoRows = res.rows // <---- Array of every memo and memo_type
        let memoList = []

        for (const memoSet of memoRows) {
            memoList.push(createMemoElement(memoSet))
        }
        memoList = memoList.join('\n');
        console.log(memoList)
    })
    .catch(err => console.error(err))

}
// sortListOfTodosByCategory(2, "To Watch")





function createMemoElement(todo){
    return `<li>${todo.memo}</li>`
}

