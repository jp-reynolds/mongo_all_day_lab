const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/todo-lab");





module.exports.Todo = require("./todo");
module.exports.People = require("./people");