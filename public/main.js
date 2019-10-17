(function(app) {
  app("#snake-app")
    .setTemplate(
      '<h1 s-click="updateTask">Todolist</h1>',
      '<input type="text" placeholder="New task" /><button s-click="addTask">Add</button>',
      "<p><em>No tasks for the moment.</em></p>"
    )
    .on("addTask", e => {
      console.log("addTask 1 : ", e);
    });
})(snake);
