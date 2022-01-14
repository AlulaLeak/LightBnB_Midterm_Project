/*
 * All routes for Login are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const app = express()
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

module.exports = (db) => {
  router.get("/", (req, res) => {

    const templateVars = {
        userId: null
    }

    if (templateVars.userId) {
        res.redirect('../')
    }

    res.render('../views/partials/_login.ejs', templateVars)
  });
  router.post("/", (req, res) => {
      
    console.log(req.body)
  router.post("/push", (req, res) => {


    // This is where we need to set a cookie

  })
  return router;
};

app.post('/register', (req, res) => {
  const email = req.body.email;
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  if (email === '' && hashedPassword === '') {
    return res.status(400).send('Email & password cannot be empty')
  }
  const userFound = getUserByEmail(email, userDB);
  if (userFound) {
    res.status(400).send('Sorry, that user already exists!');
    return;
  }
  const userID = createUser(email, hashedPassword, userDB)
  req.session.user_id = userID
  res.redirect('../')
})

app.post('/', (req, res) => {
  const email = req.body.email;
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  const user = getUserByEmail(email, userDB);
  if (user) {
    if (hashedPassword === user.password) {
      req.session.user_id = user.id
      res.redirect('../');
    } else {
      res.status(403).send('Wrong Information!! Try again <a href="/login">login</a>')
    }
  } else {
    res.status(403).send('Register <a href="/register">register</a> here!!')
  }
    console.log('user', user);
})

app.post('/', (req, res) => {
  const email = req.body.email;
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  if (email === '' && hashedPassword === '') {
    return res.status(400).send('Email & password cannot be empty')
  }
  const userFound = getUserByEmail(email, userDB);
  if (userFound) {
    res.status(400).send('Sorry, that user already exists!');
    return;
  }
  const userID = createUser(email, hashedPassword, userDB)
  req.session.user_id = userID
  res.redirect('../')
})
