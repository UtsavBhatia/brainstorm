var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    employee:
        {
            type: mongoose.Schema.Types.Mixed,
            ref: "Employee"
        },
    comment: String
});

module.exports = mongoose.model("Comment", commentSchema);