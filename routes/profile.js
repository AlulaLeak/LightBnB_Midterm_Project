/*
 * All routes for Login are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const app = express();

// NATURAL LANGUAGE
const natural = require("natural");
const classifier = new natural.BayesClassifier();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));

const { categorizeAndInsertNewTodo } = require("../helpers.js");
const { response } = require("express");

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("This is the 'profile/' get req.body: ", req.body);

    const templateVars = {
      userId: 2,
    };

    if (!templateVars.userId) {
      res.redirect("../login");
    }

    res.render("../views/partials/_profile.ejs", templateVars);
  });
  router.post("/", (req, response) => {
    response.redirect("/profile");

    categorizeAndInsertNewTodo(req.body.memo, 2);

    const data = req.body;

    // console.log("This is the 'profile/' post req.body: ", req.body);

    const templateVars = {
      userId: 2,
    };
  });

  return router;
};
