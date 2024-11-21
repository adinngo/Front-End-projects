const todoList = [
  {
    todo: "New task is created and added to the list",
    status: {
      checked: false,
    },
  },
  {
    todo: "Clicking the checkbox toggles the completeness",
    status: {
      checked: false,
    },
  },
  {
    todo: "Delete button will delete the task from the list",
    status: {
      checked: false,
    },
  },
  {
    todo: "Complete tasks show at the end with strikethrough",
    status: {
      checked: true,
    },
  },
  {
    todo: "Marking in complete will put it back in pending list",
    status: {
      checked: true,
    },
  },
];
let todoListHtml = "";
todoList.forEach((item, index) => {
  todoListHtml += `
    <div class="todoList-item">
      <label for="todo-status-${index}" class="todo-content-container">
        <input type="checkbox" id="todo-status-${index}" class="todo-status" />
        <span class="todo-content">${item.todo}</span>
      </label>
      <div class="todo-content-edited-container">
        <input type="text" class="input-todo-edited">
        <button class="save-btn"><i class='bx bxs-save' ></i></button>
      </div>
      <button class="edit-btn"><i class='bx bx-edit'></i></button>
      <button class="remove-btn"><i class="bx bx-trash"></i></button>
    </div>
  
  `;
});
document.querySelector(".todoList").innerHTML = todoListHtml;