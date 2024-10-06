let todos = [];

function initTodo() {
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");

  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo(todoInput.value);
    todoInput.value = "";
  });

  function addTodo(text) {
    const todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    todos.push(todo);
    renderTodo(todo);
  }

  function renderTodo(todo) {
    const li = document.createElement("li");
    li.setAttribute("data-id", todo.id);
    li.innerHTML = `
      <input type="checkbox" ${todo.completed ? "checked" : ""}>
      <span>${todo.text}</span>
      <button class="delete-btn">Delete</button>
    `;

    li.querySelector("input").addEventListener("change", toggleTodo);
    li.querySelector(".delete-btn").addEventListener("click", deleteTodo);

    todoList.appendChild(li);
  }

  function toggleTodo(e) {
    const id = parseInt(e.target.parentElement.getAttribute("data-id"));
    const todo = todos.find((t) => t.id === id);
    todo.completed = !todo.completed;
  }

  function deleteTodo(e) {
    const li = e.target.parentElement;
    const id = parseInt(li.getAttribute("data-id"));
    todos = todos.filter((t) => t.id !== id);
    li.remove();
  }
}
