const express = require('express')
const app = express()
const bcrypt = require('bcryptjs');
require('dotenv').config()


var cors = require('cors')

const Users = require('./model/User');
const router = require('./routes/index');


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers","Content-Type, Authorization");
  app.use(cors());
  next();
})
 
/***********************************************************************************************************/

app.get('/', (req,res)=>{
  res.send("API no ar...")
})

app.use(router)

app.listen(3030, ()=>{
  console.log(`Servidor iniciado na porta: 3030`)
})














