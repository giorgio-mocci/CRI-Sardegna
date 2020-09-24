const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { Pool } = require('pg');
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let connection=process.env.DATABASE_URL;

if(!connection){
  connection=process.env.LOCAL_DB;
}

pool = new Pool({
    connectionString: connection,
    ssl: {
      rejectUnauthorized: false
    }
  });

pool.connect();

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


app.listen(process.env.PORT || 3000,function(){
  console.log("server started on port 3000");
});
