const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const app = express();

const { categorizeAndInsertNewTodo } = require("../helpers.js");

module.exports = (db) => {
  router.get("/all", (req, res) => {
    const queryToReturnTodos = `
        SELECT memo, memo_type, timestamp
        FROM todos
        JOIN users ON user_id = users.id
        WHERE user_id = 2
        ORDER BY timestamp;
        `;

    db.query(queryToReturnTodos)
      .then((results) => {
        const memoRows = results.rows;

        res.json(memoRows);
      })
      .catch((err) => console.error(err));
  });

  router.get("/towatch", (req, res) => {
    const queryToReturnTodosBasedOnType = `
        SELECT memo, memo_type, timestamp
        FROM todos
        JOIN users ON user_id = users.id
        WHERE (user_id = 2 AND memo_type = 'To Watch')
        ORDER BY timestamp;
        `;

    db.query(queryToReturnTodosBasedOnType)
      .then((results) => {
        const memoRows = results.rows;

        res.json(memoRows);
      })
      .catch((err) => console.error(err));
  });

  router.get("/toeat", (req, res) => {
    const queryToReturnTodosBasedOnType = `
        SELECT memo, memo_type, timestamp
        FROM todos
        JOIN users ON user_id = users.id
        WHERE (user_id = 2 AND memo_type = 'To Eat')
        ORDER BY timestamp;
        `;

    db.query(queryToReturnTodosBasedOnType)
      .then((results) => {
        const memoRows = results.rows;

        res.json(memoRows);
      })
      .catch((err) => console.error(err));
  });

  router.get("/tobuy", (req, res) => {
    const queryToReturnTodosBasedOnType = `
        SELECT memo, memo_type, timestamp
        FROM todos
        JOIN users ON user_id = users.id
        WHERE (user_id = 2 AND memo_type = 'To Buy')
        ORDER BY timestamp;
        `;

    db.query(queryToReturnTodosBasedOnType)
      .then((results) => {
        const memoRows = results.rows;

        res.json(memoRows);
      })
      .catch((err) => console.error(err));
  });

  router.get("/toread", (req, res) => {
    const queryToReturnTodosBasedOnType = `
        SELECT memo, memo_type, timestamp
        FROM todos
        JOIN users ON user_id = users.id
        WHERE (user_id = 2 AND memo_type = 'To Read')
        ORDER BY timestamp;
        `;

    db.query(queryToReturnTodosBasedOnType)
      .then((results) => {
        const memoRows = results.rows;

        res.json(memoRows);
      })
      .catch((err) => console.error(err));
  });

  router.post("/", (req, response) => {
    categorizeAndInsertNewTodo(req.body.memo, 2);

    const data = req.body;
    response.redirect("/profile");
    console.log(
      "This is the req.body from the post request on '/todos/ ",
      data
    );

    console.log(data);
  });
  return router;
};
