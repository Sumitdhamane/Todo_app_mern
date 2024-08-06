import express from "express";
import Register from "../controllers/Register.controller.js";
import { RegisterSchema } from "../validationSchema/RegisterSchema.js";
import Login from "../controllers/Login.controller.js";
import { LoginSchema } from "../validationSchema/LoginSchema.js";
import { createTodo } from "../controllers/Todo.controller.js";
import { check } from "express-validator";
import { GetTodos } from "../controllers/TodoList.js";
import { MarkTodo } from "../controllers/MarkTodo.controller.js";
import { RemoveTodo } from "../controllers/RemoveTodo.controller.js";

const apiRoute = express.Router();
export const apiProtected = express.Router();

apiRoute.post("/register", RegisterSchema, Register);
apiRoute.post("/login", LoginSchema, Login);

//protected routes
apiProtected.post(
  "/createTodo",
  [check("desc", "Todo desc is required").exists()],
  createTodo
);
apiProtected.get("/todolist", GetTodos);

apiProtected.post(
  "/markTodo",
  [check("todo_id", "Todo id is required").exists()],
  MarkTodo
);

apiProtected.post(
  "/deleteTodo",
  [check("todo_id", "Todo id is required").exists()],
  RemoveTodo
);

export default apiRoute;
