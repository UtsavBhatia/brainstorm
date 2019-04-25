var express = require("express"),
    app = express(),
    expressSanitizer = require("express-sanitizer"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Employee = require("./models/employee"),
    Idea = require("./models/idea");

mongoose.connect("mongodb://localhost/brainstorm");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(expressSanitizer());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.render("index");
});

app.get("/login",function(req,res){
    res.render("login");
});

app.get("/signup",function(req,res){
    res.render("signup");
});

app.post("/signup",function(req,res){
    var newEmployee = {
        u_id : req.body.u_id,
        fullname : req.body.fullname,
        emp_id : req.body.emp_id,
        pwd : req.body.password
    }
    Employee.create(newEmployee, function(err,employee){
        if(err)
            console.log(err);
        else {
            console.log(employee);
            res.redirect("login");
        }
    });
});

app.post("/feed",function(req,res){
    var employee = {
        id : req.body.u_id,
        pwd : req.body.password
    }
    console.log(employee);
    res.render("feed",{employee:employee});
})

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("brainstorm has started!");
});