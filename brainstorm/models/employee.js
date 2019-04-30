var mongoose = require("mongoose");

//SCHEMA Setup
var employeeSchema = new mongoose.Schema({
    u_id: String,
    fullname:  String,
    emp_id:  [Number],
    pwd: String
});

module.exports = mongoose.model("Employee", employeeSchema);