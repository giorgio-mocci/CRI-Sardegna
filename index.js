const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var items = [];

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

app.post("/",function(req,res){
  items.push(req.body.newItem);
  res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
  console.log("server started on port 3000");
});
