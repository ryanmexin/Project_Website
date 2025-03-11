import React from "react";
import "../App.css"; // Assuming you have your CSS here

function TodoItem({ task, onDelete }) {
  return (
    <li className="todo-item">
      <span>{task}</span>
      <button className="delete-btn" onClick={onDelete}>
        &#10005;
      </button>
    </li>
  );
}

export default TodoItem;