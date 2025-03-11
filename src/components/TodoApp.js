import React, { useState } from "react";
import TodoList from "./TodoList"; // Import TodoList component
import "../todoApp.css"

function TodoApp() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTimeout(() => {
        alert( `"${task}" has been added`)
      },2000);
      setTask(""); // Clear the input field after adding
    }
  };

  const handleClearTask = () => {
    setTasks([]); // Clears all tasks
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index)); // Deletes specific task
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <input
          type="text"
          className="todo-input"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button className="todo-submit-btn" onClick={handleAddTask}>
          Add Task
        </button>
        <button className="todo-submit-btn" onClick={handleClearTask}>
          Clear List
        </button>
      </div>

      <TodoList tasks={tasks} onDelete={handleDeleteTask} />
    </div>
  );
}

export default TodoApp;
