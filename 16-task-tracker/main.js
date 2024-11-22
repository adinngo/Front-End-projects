// const todoListItem = JSON.parse(localStorage.getItem("todoListItem")) || [
//   {
//     todo: "New task is created and added to the list",
//     status: {
//       finished: false,
//     },
//   },
//   {
//     todo: "Clicking the checkbox toggles the completeness",
//     status: {
//       finished: false,
//     },
//   },
//   {
//     todo: "Delete button will delete the task from the list",
//     status: {
//       finished: false,
//     },
//   },
//   {
//     todo: "Complete tasks show at the end with strikethrough",
//     status: {
//       finished: false,
//     },
//   },
//   {
//     todo: "Marking in complete will put it back in pending list",
//     status: {
//       finished: false,
//     },
//   },
// ];
const now = new Date();
const fullDateTime = `${now.getDate()}/${
  now.getMonth() + 1
}/${now.getFullYear()} - ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
console.log("Current Date and Time:", fullDateTime); // e.g., "21/11/2024 - 14:45:30"

//data todoLists
const todoLists = JSON.parse(localStorage.getItem("todoLists")) || [
  {
    todoListTitle: "Task Tracker",
    dateTime: fullDateTime,
    content: [
      {
        todo: "New task is created and added to the list",
        status: {
          finished: false,
        },
      },
      {
        todo: "Clicking the checkbox toggles the completeness",
        status: {
          finished: false,
        },
      },
      {
        todo: "Delete button will delete the task from the list",
        status: {
          finished: false,
        },
      },
      {
        todo: "Complete tasks show at the end with strikethrough",
        status: {
          finished: false,
        },
      },
      {
        todo: "Marking in complete will put it back in pending list",
        status: {
          finished: false,
        },
      },
    ],
  },

  {
    todoListTitle: "Do Workout",
    dateTime: fullDateTime,
    content: [
      {
        todo: "New task is created and added to the list",
        status: {
          finished: false,
        },
      },
      {
        todo: "Clicking the checkbox toggles the completeness",
        status: {
          finished: false,
        },
      },
      {
        todo: "Delete button will delete the task from the list",
        status: {
          finished: false,
        },
      },
      {
        todo: "Complete tasks show at the end with strikethrough",
        status: {
          finished: false,
        },
      },
      {
        todo: "Marking in complete will put it back in pending list",
        status: {
          finished: false,
        },
      },
    ],
  },
];

// format date and time

renderTodoLists();

function renderTodoLists() {
  let todoListsHtml = "";
  todoLists.forEach((todoList, index) => {
    todoListsHtml += `
    <div class="todoList-container">
          <button class="close-todoList"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" ">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
          </i></button>

          <!-- title of todoList -->
          <div class="header-todoList">
            <h2 class="title-todoList">${todoList.todoListTitle}</h2>
            <span class="date">${todoList.dateTime}</span>
          </div>

          <!-- input todo of todoList -->
          <div class="todoList-input-wrapper">
            <input type="text" class="todo-input" />
            <button class="add-btn"><i class="bx bx-plus"></i></button>
          </div>

           <!-- content of todoList -->
          <div class="todoList">
            ${renderTodoList(todoList.content, index)}
          </div>
    </div>
  `;
  });

  document.querySelector(".todoLists-container").innerHTML = todoListsHtml;

  document.querySelectorAll(".todoList-container").forEach((item, index) => {
    // create todoList
    item.querySelector(".add-btn").addEventListener("click", () => {
      const todoInput = item.querySelector(".todo-input").value;
      todoLists[index].content.push({ todo: todoInput, status: false });
      saveToLocalStorage();
      renderTodoLists();
    });

    // remove todoList
    item.querySelector(".close-todoList").addEventListener("click", () => {
      todoLists.splice(index, 1);
      saveToLocalStorage();
      renderTodoLists();
    });

    // make btn in each todoList interactive
    item.querySelectorAll(".todoList-item").forEach((todoItem, subIndex) => {
      const finishTask = todoItem.querySelector(".todo-status");
      const editBtn = todoItem.querySelector(".edit-btn");
      const removeBtn = todoItem.querySelector(".remove-btn");
      const saveBtn = todoItem.querySelector(".save-btn");

      finishTask.addEventListener("click", () => {
        // Toggle the finished state
        todoLists[index].content[subIndex].status.finished = !todoLists[index].content[subIndex].status.finished;
        saveToLocalStorage();
        renderTodoLists();
      });

      editBtn.addEventListener("click", () => {
        todoItem.classList.add("is-editing-todo-content");
        todoItem.querySelector(".todo-input-edited").value = todoList[index].todo;
      });

      saveBtn.addEventListener("click", () => {
        todoLists[index].content[subIndex].todo = todoItem.querySelector(".todo-input-edited").value;
        todoItem.classList.remove("is-editing-todo-content");
        saveToLocalStorage();
        renderTodoLists();
      });

      removeBtn.addEventListener("click", () => {
        todoLists[index].content.splice(subIndex, 1); // remove from list
        saveToLocalStorage();
        renderTodoLists();
      });
    });
  });
}

// render sub todoList
function renderTodoList(content, index) {
  let todoListHtml = "";

  content.forEach((item, subIndex) => {
    const isFinished = item.status.finished;
    todoListHtml += `
      <div class="todoList-item">
        <label for="todo-status-${index}-${subIndex}" class="todo-content-container">
          <input type="checkbox" id="todo-status-${index}-${subIndex}" class="todo-status" ${
      isFinished ? "checked" : ""
    }/>
          <span class="todo-content ${isFinished ? "finished" : ""}">${item.todo}</span>
        </label>
        <div class="todo-content-edited-container">
          <input type="text" class="todo-input-edited">
          <button class="save-btn"><i class='bx bxs-save' ></i></button>
        </div>
        <button class="edit-btn"><i class='bx bx-edit'></i></button>
        <button class="remove-btn"><i class="bx bx-trash"></i></button>
      </div>
    
    `;
  });
  return todoListHtml;
}

document.querySelector(".create-todoList-btn").addEventListener("click", () => {
  createTodoList();
});
document.querySelector(".TodoList-input").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    createTodoList();
  }
});

function createTodoList() {
  const todoListTitle = document.querySelector(".TodoList-input");
  const error = document.querySelector(".error");
  if (!todoListTitle.value) {
    error.innerHTML = "Please input your TodoList title before create a new one!";
    return;
  }

  todoLists.push({
    todoListTitle: todoListTitle.value,
    dateTime: fullDateTime,
    content: [],
  });
  todoListTitle.value = "";
  error.innerHTML = "";
  saveToLocalStorage();
  renderTodoLists();
}


function saveToLocalStorage() {
  localStorage.setItem("todoLists", JSON.stringify(todoLists));
}
