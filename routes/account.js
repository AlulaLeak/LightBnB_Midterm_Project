/*
 * All routes for Login are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const res = require('express/lib/response');
const router  = express.Router();
const app = express()


module.exports = (db) => {
  router.get("/", (req, res) => {

    const templateVars = {
        userId: 2
    }

    if (!templateVars.userId) {
        res.redirect('../login')
    }

    res.render('../views/partials/_account.ejs', templateVars)
  });
  router.post("/", (req, response) => {
      
    const data = typeof (req.body)

    console.log(data)
  })
  return router;
};