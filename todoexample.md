### Todo App Implementation Guide

### Implementation

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Todo App</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="container">
      <h1>Todo List</h1>
      <form id="todo-form">
        <input
          type="text"
          id="todo-input"
          placeholder="Add a new todo"
          required
        />
        <button type="submit">Add</button>
      </form>
      <ul id="todo-list"></ul>
    </div>
    <script src="app.js"></script>
  </body>
</html>
```

### CSS Styling

```css
/* style.css */
.container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

#todo-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

#todo-input {
  flex: 1;
  padding: 8px;
}

#todo-list {
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-bottom: 1px solid #eee;
}

.todo-item.completed span {
  text-decoration: line-through;
  color: #888;
}

.delete-btn {
  background: #ff4444;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
```

### Javascript Logic

```js
// app.js
document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");

  // Load todos from localStorage
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  // Render existing todos
  function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach((todo) => {
      const li = createTodoElement(todo);
      todoList.appendChild(li);
    });
    saveTodos();
  }

  // Create todo element
  function createTodoElement(todo) {
    const li = document.createElement("li");
    li.className = `todo-item ${todo.completed ? "completed" : ""}`;
    li.innerHTML = `
            <input type="checkbox" ${todo.completed ? "checked" : ""}>
            <span>${todo.text}</span>
            <button class="delete-btn">Delete</button>
        `;

    // Toggle completion
    const checkbox = li.querySelector("input");
    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      li.classList.toggle("completed");
      saveTodos();
    });

    // Delete todo
    const deleteBtn = li.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
      todos = todos.filter((t) => t.id !== todo.id);
      renderTodos();
    });

    return li;
  }

  // Save todos to localStorage
  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  // Add new todo
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text) {
      const todo = {
        id: Date.now(),
        text,
        completed: false,
      };
      todos.push(todo);
      renderTodos();
      todoInput.value = "";
    }
  });

  // Initial render
  renderTodos();
});
```
