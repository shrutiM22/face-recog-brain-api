const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'smart_brain'
  }
});

//console.log(postgres.select('*').from('users'));
db.select('*').from('users').then(data => {
    console.log(data);
}) ;

const app = express();

app.use(bodyParser.json());
app.use(cors());


//app.post('/signin', signin.handleSignin(db,bcrypt) );//can write like this too where (req,res) fn is execute after (db,bcrypt)
app.get('/', (req,res) => {
    res.send('It is working');
})
app.post('/signin', (req,res) => {signin.handleSignin(req,res,db,bcrypt) });

app.post('/register',(req,res) => {register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id',(req,res) => {profile.handleProfile(req,res,db)})

app.put('/image',(req,res) => {image.handleImage(req,res,db)})

app.post('/imageurl',(req,res) => {image.handleApiCall(req,res)})


app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})


/*
/ --> res = this is working
/signin --> POST = success/fail
/-register --> POST = user
/profile/:userId --> GET = user
/image --> PUT -->user



*/