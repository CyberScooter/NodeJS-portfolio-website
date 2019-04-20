const express = require('express'),
      sgMail = require('@sendgrid/mail')
      request = require('request');
      
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router = express.Router();

//HOME=============================================================

router.get("/", function(req, res){
    res.render("landing");
})

router.get("/profile", (req, res) => {
    res.render("index");
})

router.get("/work", (req, res) => {
    res.render("work")
})

router.get("/contact", (req, res) => {
    res.render("contact");
})

router.post("/contact", (req, res) =>{
    // g-recaptcha-response is the key that browser will generate upon form submit.
    // if its blank or null means user has not selected the captcha, so return the error.
    if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        req.flash('error', "Please select captcha");
        return res.redirect('/contact');
    }
    // Put your secret key here.
    var secretKey = process.env.RECAPTCHA_PRIVATE_KEY;
    // req.connection.remoteAddress will provide IP address of connected user.
    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
    // Hitting GET request to the URL, Google will respond with success or error scenario.
    request(verificationUrl, function(error,response,body) {
        body = JSON.parse(body);
        // Success will be true or false depending upon captcha validation.
        if(body.success !== undefined && !body.success) {
            req.flash('error', "Failed captcha verification");
            return res.redirect('/contact');
        }
        var data = {
            to: process.env.EMAIL,
            from: req.body.email,
            subject: req.body.subject,
            text: req.body.content
        }
        sgMail.send(data , (err, json) => {
            if(err){
                req.flash('error', err.message);
                res.redirect('/contact');
            }
            req.flash('success', 'Message successfully sent to Hrithik')
            res.redirect('/contact');
        });
    });
});


module.exports = router;