var mongoose = require("mongoose");

var ideaSchema = mongoose.Schema({
    topic: String,
    description: String
});

module.exports = mongoose.model("Comment", ideaSchema);