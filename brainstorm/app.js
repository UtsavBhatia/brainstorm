var express = require("express"),
    app = express(),
    expressSanitizer = require("express-sanitizer"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Employee = require("./models/employee"),
    Idea = require("./models/idea"),
    Comment = require("./models/comments"),
    session = require("express-session");

mongoose.connect("mongodb://localhost/brainstorm");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(expressSanitizer());
app.use(bodyParser.urlencoded({extended:true}));
session = require("express-session");

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}));

app.get("/",function(req,res){
    res.render("index");
});

app.get("/login",function(req,res){
    res.render("login");
});

app.get("/signup",function(req,res){
    res.render("signup");
});

app.get("/feed",function(req,res){
    var employee = req.session.Auth;
    if(employee) {
        Idea.find({},function(err,allIdeas){
            if(err)
                console.log(err);
            else
                res.render("feed",{employee : req.session.Auth, ideas : allIdeas});     
        });
    }
    else
        res.redirect("login");
});

app.post("/signup",function(req,res){
    var newEmployee = {
        u_id : req.body.u_id,
        fullname : req.body.fullname,
        emp_id : req.body.emp_id,
        pwd : req.body.password
    };
    Employee.create(newEmployee, function(err,employee){
        if(err)
            console.log(err);
        else {
            console.log(employee);
            res.redirect("login");
        }
    });
});

app.post("/login",function(req,res)
{
    Employee.findOne({'u_id':req.body.u_id},function(err,emp){
        if(err || !emp) {
            console.log("Invalid User");
            res.redirect("login?error=invalidUser");
        } else {
            if(emp.pwd===req.body.password) {
                console.log(emp.emp_id);
                req.session.Auth = emp;
                res.redirect("feed");
            } else {
                console.log("Password wrong");
                res.redirect("login?error=invalidPw");
            }
        }
    });
});

app.post("/new",function(req, res) {
    var topic = req.body.topic;
    var description = req.body.description;
    var date = new Date();
    var employee = req.session.Auth;
    var newIdea = {topic: topic, upvotes: 0, downvotes: 0, description: description, date: date, employee: employee};
    Idea.create(newIdea, function(err,idea){
        if(err)
            console.log(err);
        else
            res.redirect("feed");
    });
});

app.get("/feed/:id",function(req, res) {
    Idea.findById(req.params.id,function(err, foundIdea){
        if(err)
            console.log(err);
        else{
            res.render("discussion",{idea: foundIdea});
        }
    });
});

app.post("/feed/:id",function(req,res){
    Idea.findById(req.params.id,function(err, idea) {
        if(err){
            console.log(err);
            res.redirect("/feed");
        }
        else{
            var employee = req.session.Auth;
            var cmnt = {comment: req.body.comment, employee: employee};
            Comment.create(cmnt, function(err,comment){
                if(err)
                    console.log(err);
                else{
                    idea.comments.push(comment);
                    idea.save();
                    res.redirect("/feed/"+idea._id);
                }
            });
        }
    });
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("brainstorm has started!");
});