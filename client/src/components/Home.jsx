import React, { useEffect, useState } from "react";
import Todo from "./partials/Todo.jsx";
import { getTodoListApi, createTodoApi, getToken } from "../services/api.js";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [todoDesc, setTodoDesc] = useState("");

  useEffect(() => {
    if (!getToken()) {
      navigate("/login");
    } else {
      fetchTodoList();
    }
  }, []);

  async function fetchTodoList() {
    try {
      const result = await getTodoListApi();
      console.log("todolist", result);

      if (result.status === 200 && result.data.status === 200) {
        setList(result.data.data.todos.reverse());
      }
    } catch (error) {
      console.error("Error fetching todo list", error);
    }
  }

  const addTodo = (newTodo) => {
    setList((prevList) => [newTodo, ...prevList]);
  };

  const removeTodo = (todoId) => {
    setList((prevList) => prevList.filter((todo) => todo._id !== todoId));
  };

  const updateTodo = (updatedTodo) => {
    setList((prevList) =>
      prevList.map((todo) =>
        todo._id === updatedTodo._id ? updatedTodo : todo
      )
    );
  };

  const handleTodoSubmit = async () => {
    if (todoDesc === "") {
      toast.error("Todo is required");
      return;
    }

    try {
      const result = await createTodoApi({ desc: todoDesc });
      console.log(result);

      if (result.status === 200 && result.data.status === 200) {
        const newTodo = result.data.data;
        addTodo(newTodo);
        toast.success("Todo Added");
        setTodoDesc("");
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      console.error("Error creating todo", error);
      toast.error("Failed to add todo");
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="container">
        <div className="row justify-content-md-center mt-4">
          {list.map((todo) => (
            <Todo
              todo={todo}
              key={todo._id}
              removeTodo={removeTodo}
              updateTodo={updateTodo}
            />
          ))}
        </div>
        <div
          style={{
            position: "fixed",
            right: "50px",
            bottom: "50px",
            zIndex: 1030,
          }}
        >
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            style={{
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: "60px",
              height: "60px",
              fontSize: "1.5rem",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            +
          </button>
        </div>

        <div className="modal mt-5" id="exampleModal">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-title">Add new Todo</div>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="close"
                >
                  <span aria-hidden="true"></span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <textarea
                    name=""
                    className="form-control"
                    rows={3}
                    value={todoDesc}
                    onChange={(e) => {
                      setTodoDesc(e.target.value);
                    }}
                    placeholder="Write Todos...."
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={handleTodoSubmit}
                  data-bs-dismiss="modal"
                >
                  Save Todo
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setTodoDesc("");
                  }}
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
