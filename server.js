const express    = require('express')
const bodyParser = require('body-parser');
const app        = express();
const morgan     = require('morgan');
const db         = require('./models');
const path       = require('path');

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3001);



// app.get('/', function (req, res) {
//   res.sendFile('public/index.html' , { root : __dirname});
// });
app.get('/', function (req, res) {
  res.render('index');
}); 


// get all todo list items
app.get('/api/todo', function (req, res) {
	//send all todos as a JSON response
	db.Todo.find(function (err, todos) {
		if (err) {
			console.log("index error: " + err);
			res.sendStatus(500);
		}
		res.json(todos);
	});
});


// get one todo list item
app.get('/api/todo/:id', function (req, res) {
	//find one list item by it's _id
	db.Todo.findOne({_id: req.params.id}, function (err, todoItem) {
		if (err) {
			console.log("index error: " + err);
			res.sendStatus(500);
		}
		res.json(todoItem);
	})
});


// delete todo list item
app.delete('/api/todo/:id', function (req, res) {
	//deleting one list item by its _id
	db.Todo.findOneAndRemove({_id: req.params.id}, function (err, todoDelete) {
		if (err) {
			console.log("index error: " + err);
			res.sendStatus(500);
		} else {
			res.json(todoDelete);
		}
	})
});


// create new todo list item
app.post('/api/todo', function (req, res) {
	//grabbing the input values from the form (body)
	var newItem = db.Todo(req.body);
  	console.log('item created ', req.body);
		db.Todo.create(newItem, function (err, newItemCreated) {
			if (err) {
				console.log("newItem error")
				res.sendStatus(500);
			} else {
			res.json(newItemCreated);
			}
		});
  
});


// update todo list item
app.put('/api/todo/:id', function(req,res){
	let task = req.body.task;
	let description = req.body.description;

	db.Todo.findOneAndUpdate(
		{_id: req.params.id}, 
		{$set:{task: task, description: description}}, 
		{new: true}, //<--probably not necessary
		function (err, doc) {
	  		if (err) {
	    		console.log("Something wrong when updating data!");
			} else {
				//doc is the json object that is being sent (refer to 'json' callback in JS functions)
				res.json(doc);
		}
	})

});


app.listen(app.get('port'), () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`)
  })
