const express = require('express'),
      sgMail = require('@sendgrid/mail')
      
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

router.post("/contact", async (req, res) =>{
    
    try{
        var data = {
            to: 'hrithik7132@gmail.com',
            from: req.body.email,
            subject: req.body.subject,
            text: req.body.content
        }
        await sgMail.send(data);
        req.flash('success', 'Message successfully sent to Hrithik')
        res.redirect('/contact');
    }catch(e){
        req.flash('error', e.message);
        res.redirect('/contact');
    }
});


module.exports = router;