const mongoose = require("mongoose");

if (process.env.NODE_ENV == "production") {
  mongoose.connect(process.env.MLAB_URL)
} else {
  mongoose.connect("mongodb://localhost/todo-lab");
}





module.exports.Todo = require("./todo");
module.exports.People = require("./people");