const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
require('dotenv').config();
const db = require("./db/prepare.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


db.query('SELECT * from comitati', (err, res) => {
  if (err) {
    console.log(err.stack)
  } else {
    console.log(res.rows[0])
  }
})

app.get("/",function(req,res){
  res.render("index");
});

app.get("/registrati", function(req,res){
  res.render("registrati");
});

app.get("/login", function(req,res){
  res.render("login");
});

app.get("/homepage",function(req,res){
  res.render("homepage");
});

app.get("/aggiorna-competenze",function(req,res){
  res.render("aggiorna-competenze");
});

app.get("/aggiorna-disponibilita",function(req,res){
  res.render("aggiorna-disponibilita");
});

app.get("/aggiorna-profilo", function(req,res){
  res.render("aggiorna-profilo");
});

app.post("/pre-autorizzazione", function(req,res){
  /*fai cose con il db */
  res.render("pre-autorizzazione");
});


const server = app.listen(process.env.PORT || 3000,function(){
  console.log("server started on port 3000");
});

server.on('close', function(){
  console.log("server closer");
  /*chiudi connessione con pool.end*/
});
