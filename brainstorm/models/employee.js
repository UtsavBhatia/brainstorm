var mongoose = require("mongoose");

//SCHEMA Setup
var employeeSchema = new mongoose.Schema({
    u_id: String,
    fullname:  String,
    emp_id:  [Number],
    password: String,
    ideas: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Idea"
            }
        ]
});

module.exports = mongoose.model("Employee", employeeSchema);