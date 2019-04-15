const express = require("express"),
      app = express(),
      bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended:true}));
//allows files in dir "public" to be used
app.use(express.static("public"));
//makes the default files in the view dir as ejs
app.set("view engine", "ejs");


app.use( (req, res, next) => {
    res.locals.currentURL = req.url;
    next();
 });

const port = process.env.PORT || 3000


//HOME=============================================================
app.get("/", function(req, res){
    res.render("landing");
})

app.get("/profile", (req, res) => {
    res.render("index");
})

app.get("/contact", (req, res) => {
    res.render("contact");
})

app.get("/work", (req, res) => {
    res.render("work")
})



app.listen(port, function(){
    console.log("Server is running...");
})