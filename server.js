const express = require('express');

const { registerUser } = require('./controllers/Register');
const { userSignIN } = require('./controllers/SignIN');
const { getUserByID } = require('./controllers/GetUserByID');
const { image,handleAPI } = require('./controllers/Image')

const knex = require('knex');

const Clarifai = require('clarifai');

const cors = require('cors');

const bcrypt = require('bcrypt-nodejs')

const app = express();

app.use(express.json())
app.use(cors());

const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl : {
      rejectUnauthorized: false
    },
  }
});




app.post('/signin',(req,res)=>{ userSignIN(req,res,db,bcrypt) });
app.post("/register",(req,res)=>{registerUser(req,res,db,bcrypt)});

app.get("/",(req,res)=>{res.send('Working')})

app.get('/profile/:id',(req,res)=>{ getUserByID(req,res,db)});

app.put("/image",(req,res)=>{ image(req,res,db) })//injecting dependencies
//also can do image(db) instead of (req,res)=>{ image(req,res,db) } and req,res get called automatically

app.post("/imageurl",handleAPI)

app.listen(process.env.PORT || 3000,()=>{
  console.log(`App running on ${process.env.PORT}`);
});



// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//   // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//   // res = false
// });