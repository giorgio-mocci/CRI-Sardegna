const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
require('dotenv').config();
const session = require("express-session");
const passport = require("passport");
const db = require("./db/prepare.js");
const pgSession = require('connect-pg-simple')(session);
require("./config/pass.js")(passport, db);

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(session({
  maxAge: (1000 * 60 * 60 * 24 * 3),
  httpOnly: true,
  /*secure: true,*/
  store: new pgSession({
    pool : db.pool,
    tableName: "sessions"
  }),
  secret: "keyboard cattelan", /*must be changed with an env var*/
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

/* ROUTES */
app.get("/",function(req,res){
  res.render("index");
});

app.get("/registrati", function(req,res){
  res.render("registrati");
});

app.get("/login", function(req,res){
  res.render("login");
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

app.get("/homepage",function(req,res){ /*req.user contains the user info*/
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

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

const server = app.listen(process.env.PORT || 3000,function(){
  console.log("server started on port 3000");
});

server.on('close', function(){
  console.log("server closed");
  db.pool.end();
});
