const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
require('dotenv').config();
const session = require("express-session");
const passport = require("passport");
const db = require("./db/prepare.js");
require("./config/pass.js")(passport, db);

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(session({
  maxAge: (1000 * 60 * 60 * 24 * 3),
  httpOnly: true,
  /*secure: true,*/

  secret: "string",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


app.get("/",function(req,res){
  res.render("index");
});

app.get("/registrati", function(req,res){
  res.render("registrati");
});

app.get("/login", function(req,res){
  res.render("login");
});

app.get("/homepage",function(req,res){ /*req contains the user info*/
  if(req.isAuthenticated()){
    res.render("homepage");
  }else{
    res.redirect("/login");
  }
});

app.get("/aggiorna-competenze",function(req,res){
  if(req.isAuthenticated()){
    res.render("aggiorna-competenze");
  }else{
    res.redirect("/login");
  }
});

app.get("/aggiorna-disponibilita",function(req,res){
  if(req.isAuthenticated()){
    res.render("aggiorna-disponibilita");
  }else{
    res.redirect("/login");
  }
});

app.get("/aggiorna-profilo", function(req,res){
  if(req.isAuthenticated()){
    res.render("aggiorna-profilo");
  }else{
    res.redirect("/login");
  }
});

app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/homepage');
    });
  })(req, res, next);
});

app.post("/registrati", function(req,res){
  res.render("pre-autorizzazione");
});


const server = app.listen(process.env.PORT || 3000,function(){
  console.log("server started on port 3000");
});

server.on('close', function(){
  console.log("server closer");
  /*chiudi connessione con pool.end*/
});
