var mongoose = require("mongoose");

var ideaSchema = mongoose.Schema({
    topic: String,
    description: String,
    upvotes: Number,
    downvotes: Number,
    date: Date,
    employee:
        {
            type: mongoose.Schema.Types.Mixed,
            ref: "Employee"
        },
    comments: [
        {
            type: mongoose.Schema.Types.Mixed,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Idea", ideaSchema);