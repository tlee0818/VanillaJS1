const todoForm = document.querySelector(".js-todoForm"),
    todoInput = todoForm.querySelector("input"),
    todoList = document.querySelector(".js-todoList");

const TODO_LS = 'todos'
let todos = [];

function filterFn(todo){
    return todo.id === 1;
}

function deleteTodo(event){
    const btn = event.target;
    const li = btn.parentNode;
    todoList.removeChild(li);
    
    const cleanTodos = todos.filter(function(todo){

        return todo.id !== parseInt(li.id);
    })

    console.log(cleanTodos);

    todos = cleanTodos;
    saveTodos();
}

function saveTodos(){
    localStorage.setItem(TODO_LS, JSON.stringify(todos));
}

function loadTodos(){
    const loadedTodos = localStorage.getItem(TODO_LS);
    if(loadedTodos !== null){
        const parsedTodos = JSON.parse(loadedTodos);
        parsedTodos.forEach(function(todo){
            paintTodo(todo.text);
        })
    }
}

function paintTodo(text){
    const todoObj = {
        id: todos.length + 1,
        text: text
    }

    todos.push(todoObj);

    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "DEL";
    delBtn.addEventListener("click", deleteTodo);
    const span = document.createElement("span");
    span.innerText = todoObj.text;

    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = todoObj.id;

    todoList.appendChild(li);

    saveTodos()
}

function handleSubmit(event){
    event.preventDefault();
    if(todoInput.value.length !== 0){
        console.log(todoInput.value);
        const currVal = todoInput.value;
        paintTodo(currVal);
        todoInput.value = "";
    }
    else{
        alert("Can't be empty!");
    }
}

function init(){
    loadTodos();
    todoForm.addEventListener('submit', handleSubmit);
}

init()