const express     = require("express"),
      app         = express(),
      session     = require('express-session'),
      cookieParser= require('cookie-parser'),
      bodyParser  = require("body-parser"),
      indexRoutes = require('./routes/index.js'),
      flash       = require('connect-flash')

require('dotenv').config()

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(flash())

app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false
}))

const port = process.env.PORT || 8080

app.use( (req, res, next) => {
    res.locals.currentURL = req.url;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
 });

 app.use(indexRoutes);

app.listen(port, function(){
    console.log("Server is running...");
})