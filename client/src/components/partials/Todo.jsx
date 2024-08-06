import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteTodoApi, markTodoApi } from "../../services/api";
import moment from "moment/moment";

function Todo({ todo, removeTodo, updateTodo }) {
  // Handle deletion of a todo
  const handleDelete = async () => {
    try {
      const result = await deleteTodoApi({
        todo_id: todo._id,
      });
      console.log("delete todo", result);

      if (result.data.status === 200) {
        removeTodo(todo._id); // Remove the todo from the list
        toast.success("Deleted");
      } else {
        toast.error("Failed to delete, Please try again");
      }
    } catch (error) {
      console.error("Error deleting todo", error);
      toast.error("Failed to delete todo");
    }
  };

  // Handle marking/unmarking a todo
  const handleMarkTodo = async () => {
    try {
      const updatedStatus = !todo.isCompleted; // Toggle the completion status
      const result = await markTodoApi({
        todo_id: todo._id,
        isCompleted: updatedStatus,
      });
      console.log("mark todo response", result);

      if (result.data.status === 200) {
        // Update the todo in the parent component
        updateTodo({
          ...todo,
          isCompleted: updatedStatus,
        });
        toast.success(result.data.message);
      } else {
        toast.error("Failed to update, Please try again");
      }
    } catch (error) {
      console.error("Error updating todo", error);
      toast.error("Failed to update todo");
    }
  };

  return (
    <div
      className="col-sm-3 mx-3 my-2 alert bg-light"
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        cursor: "pointer",
        maxWidth: "300px",
      }}
    >
      <div
        className="card-header"
        style={{
          backgroundColor: "#f8f9fa",
          padding: "10px 15px",
          fontWeight: "bold",
          fontSize: "1.2rem",
          borderBottom: "1px solid #ddd",
          textAlign: "center",
        }}
      >
        {todo.isCompleted ? "Completed" : "Not Completed"}
      </div>
      <div
        className="card-body"
        style={{
          padding: "15px",
        }}
      >
        <h4
          className="card-title"
          style={{
            fontSize: "1.5rem",
            margin: "0 0 10px 0",
            color: "#333",
            textDecoration: todo.isCompleted ? "line-through" : "none",
          }}
        >
          {todo.desc}
        </h4>
        <p
          className="card-text"
          style={{
            fontSize: "1rem",
            color: "#666",
            lineHeight: "1.4",
            margin: "0",
          }}
        >
          {moment(todo.date).fromNow()}
        </p>
      </div>
      <div
        className="actionButtons"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="deleteButton">
          <button style={{ background: "#dad7cd" }} onClick={handleDelete}>
            Delete
          </button>
        </div>
        <div className="markTodo">
          <button onClick={handleMarkTodo} style={{ background: "#a3b18a" }}>
            {todo.isCompleted ? "Mark Uncomplete" : "Mark Complete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Todo;
