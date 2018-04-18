const db = require('./models');

let todos_list = [
  {
    task: "walk dog",
    description: "take dog outside"
  },
  {
    task: "clean room",
    description: "make bed and pick up clothes"
  },
  {
    task: "clean kitchen",
    description: "run dishwasher"
  },
  {
    task: "do homework",
    description: "don't worry it's only every night"
  },
  {
    task: "Go to GA",
    description: "just like every other day"
  }
];


db.Todo.remove({}, function(err, items) {
    if (err) {
      console.log('Error occurred in remove', err);
    } else {
      console.log('removed all list items');
    // create new records based on the array books_list
    db.Todo.create(todos_list, function(err, items){
      if (err) {
        return console.log('err', err);
      }
      console.log("created", todos_list.length, "items");

      process.exit();
    });
  }
});