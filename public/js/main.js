console.log("Sanity Check: JS is working!");
var $todosList;
var allTodo = [];
//The $todosList variable is declared in the global scope
//It is then assigned within the 'document.ready' scope
//---which is closed before the render function.
//Q: Is the assignment leaking from the document scope, allowing it to be global? 
//it would kind of half to be because it isn't assigned to anything outside?
$(document).ready(function(){

	$todosList = $('#todoTarget');

  //automatic call of Todo List data base
 	 $.ajax({
    	method: 'GET',
    	url: '/api/todo',
    	success: handleSuccess,
    	error: handleError
    });

   //DELETE ITEM FROM DB and PAGE
  $todosList.on('click', '.deleteBtn', function () {
    console.log('clicked delete');
    $.ajax({
      method: 'DELETE',
      url: 'api/todo/'+$(this).attr('data-id'),
      success: deleteItemSuccess,
      error: deleteItemError
    });
  });

  //CREATE NEW POST
  $('#newItemForm').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/todo',
      data: $(this).serialize(),
      success: newItemSuccess,
      error: newItemError
    });
  });

  //UPDATE BUTTON CALL
  $todosList.on('click', '.updateBtn', function(e) {
    e.preventDefault();
    console.log('clicked update button to', '/api/todo/'+$(this).attr('data-id'));
    let id = $(this).attr('data-id');

    $.ajax({
      method: 'PUT',
      url: '/api/todo/'+ id,
      data: $('#newItemForm').serialize(),
      success: updateItemSuccess,
      error: deleteItemError
    });
  });

});
//---------------------------------------------------------------------------

function getTodoHtml(todo) {
  //interesting way of appending (What is going on here?)
  //theory: using handlebars to make an inline ajax call, there's a CDN <script> tag in html
  return `<hr>
          <p>
            <b>_____${todo.task}</b> 
            <b> ........ ${todo.description}</b>
            <button type="button" name="button" class="deleteBtn btn btn-success pull-right" data-id=${todo._id}>Complete</button>
            <button type="button" name="button" class="updateBtn btn btn-warning pull-left" data-id=${todo._id}>Update</button>
          </p>`;
}

function getAllTodosHtml(todos) {
  return todos.map(getTodoHtml).join("");
}

// helper function to render all posts to view
// note: we empty and re-render the collection each time our post data changes
function render () {
  // empty existing posts from view
  $todosList.empty();
  // pass `allTodo` into the template function
  var todosHtml = getAllTodosHtml(allTodo);
  // append html to the view
  $todosList.append(todosHtml);
};



//Renders all JSON objects from database on the page
function handleSuccess(json) {
  allTodo = json;
  render();
}

function handleError(e) {
  console.log('uh oh');
  //appending a comment to let user know the list failed to appear?
  $('#todoTarget').text('Failed to load list items, is the server working?');
}




function deleteItemSuccess(json) {
  var itemId = json._id;
  console.log('delete book', itemId);
  // find the item with the correct ID and remove it from our allBooks array
  for(var i = 0; i < allTodo.length; i++) {
    if(allTodo[i]._id === itemId) {
      allTodo.splice(i, 1);
      break;  // we found our item - no reason to keep searching (this is why we didn't use forEach?)
    }
  }
  render();
}
function deleteItemError() {
  console.log('deleteItem error!');
}




function newItemSuccess(json) {
  $('#newItemForm input').val('');
  allTodo.push(json);
  render();
}

function newItemError() {
  console.log('newItem error!');
}




function updateItemSuccess(json) {
  // $('#newBookForm input').val('');
  var itemId = json._id;
  
  for(var i = 0; i < allTodo.length; i++) {
    if(allTodo[i]._id === itemId) {
      allTodo[i].task = json.task;
      allTodo[i].description = json.description;
      // ({task: json.task, description: json.description});
      break;  // we found our book - no reason to keep searching (this is why we didn't use forEach)
    }
  }
   render();
}

function updateItemError() {
  console.log('newItem error!');
}
