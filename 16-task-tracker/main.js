const todoList = [
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
];
renderTodoList();
function renderTodoList() {
  let todoListHtml = "";

  todoList.forEach((item, index) => {
    const isFinished = item.status.finished;
    todoListHtml += `
      <div class="todoList-item">
        <label for="todo-status-${index}" class="todo-content-container">
          <input type="checkbox" id="todo-status-${index}" class="todo-status" ${isFinished ? "checked" : ""}/>
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
  document.querySelector(".todoList").innerHTML = todoListHtml;

  document.querySelector(".add-btn").addEventListener("click", () => {
    const todoInput = document.querySelector(".todo-input");
    todoList.push({
      todo: todoInput.value,
      status: true,
    });

    renderTodoList();
  });

  document.querySelectorAll(".todoList-item").forEach((todoItem, index) => {
    const finishTask = todoItem.querySelector(".todo-status");
    const editBtn = todoItem.querySelector(".edit-btn");
    const removeBtn = todoItem.querySelector(".remove-btn");
    const saveBtn = todoItem.querySelector(".save-btn");
    finishTask.addEventListener("click", () => {
      // Toggle the finished state
      todoList[index].status.finished = !todoList[index].status.finished;
      renderTodoList();
    });


    removeBtn.addEventListener("click", () => {
      todoList.splice(index, 1); // remove from list
      renderTodoList();
    });

    editBtn.addEventListener("click", () => {
      todoItem.classList.add("is-editing-todo-content");
      todoItem.querySelector(".todo-input-edited").value = todoList[index].todo;
    });

    saveBtn.addEventListener("click", () => {
      todoList[index].todo = todoItem.querySelector(".todo-input-edited").value;
        todoItem.classList.remove("is-editing-todo-content");
      renderTodoList();
    });

  });
}
