const express = require('express');
const bodyParser = require('body-parser'); // latest version of exressJS now comes with Body-Parser!
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const knexfile = require('./knexfile');

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')


const db = knex(knexfile.development);

const app = express();

app.use(cors())
app.use(express.json()); // latest version of exressJS now comes with Body-Parser!


app.get('/', (req, res)=> {
  res.send(db.users);
})

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => { image.handleImage(req, res,db) })

app.listen(3000, ()=> {
  console.log('app is running on port 3000');
})
