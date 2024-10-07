let todos = [];

let firebaseService;

firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
        if (!firebaseService) {
            firebaseService = new User();
        }
        initTodo();
    } else {
        // Clear todos if user logs out
        todos = [];
        const todoList = document.getElementById("todo-list");
        if (todoList) todoList.innerHTML = '';
    }
});


async function initTodo() {
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");

    // Load existing todos
    await loadTodos();

    todoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addTodo(todoInput.value);
        todoInput.value = "";
    });

    async function loadTodos() {
        try {
            const userData = await firebaseService.getData();
            if (userData && userData.todos) {
                todos = Object.values(userData.todos);
                todos.forEach(todo => renderTodo(todo));
            }
        } catch (error) {
            console.error("Error loading todos:", error);
        }
    }

    async function addTodo(text) {
        const todo = {
            id: Date.now().toString(), // Using string ID for Firestore compatibility
            date: Date.now(),
            text,
            completed: false,
        };

        try {
            await firebaseService.setTodo(todo);
            todos.push(todo);
            renderTodo(todo);
        } catch (error) {
            console.error("Error adding todo:", error);
        }
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

    async function toggleTodo(e) {
        const li = e.target.parentElement;
        const id = li.getAttribute("data-id");
        const todo = todos.find(t => t.id === id);

        if (todo) {
            todo.completed = !todo.completed;
            try {
                await firebaseService.setTodo(todo);
            } catch (error) {
                console.error("Error toggling todo:", error);
                // Revert the checkbox if the update fails
                e.target.checked = !e.target.checked;
                todo.completed = !todo.completed;
            }
        }
    }

    async function deleteTodo(e) {
        const li = e.target.parentElement;
        const id = li.getAttribute("data-id");

        try {
            await firebaseService.deleteTodo(id);
            todos = todos.filter(t => t.id !== id);
            li.remove();
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    }
}

// // Initialize todos when Firebase Auth is ready
// firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//         initTodo();
//     } else {
//         // Clear todos if user logs out
//         todos = [];
//         const todoList = document.getElementById("todo-list");
//         if (todoList) todoList.innerHTML = '';
//     }
// });
