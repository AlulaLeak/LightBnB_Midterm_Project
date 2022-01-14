/*
 * All routes for Login are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const app = express()
const cookieSession = require('cookie-session')

module.exports = (db) => {
  router.get("/", (req, res) => {

    const templateVars = {
        userId: null
    }

    if (templateVars.userId) {
        res.redirect('../')
    }

    res.render('../views/partials/_register.ejs', templateVars)
  });
  router.post("/push", (req, res) => {


    // This is where we need to set a cookie

  })
  router.post('/', (req, res) => {
    console.log(req.body)
    const email = req.body.email;
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const values = [email];
    const userQuery = `
    SELECT email
    FROM users
    WHERE email = $1
    `
    db.query(userQuery, values)
    .then((result) => {
      console.log(result)
      if (email === '' && hashedPassword === '') {
        return res.status(400).send('Email & password cannot be empty')
      }
      const userFound = getUserByEmail(email, result);
      if (userFound) {
        res.status(400).send('Sorry, that user already exists!');
        return;
      }
      const userID = createUser(email, hashedPassword, result)
      req.session.user_id = userID
      res.redirect('/')
    })

  })



  return router;
};

app.use(cookieSession({
    name: 'session',
    keys: [/* secret keys */],
}))
