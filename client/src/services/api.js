import axios from "axios";
import {
  CREATE_TODO,
  TODO_LIST,
  LOGIN,
  REGISTER,
  DELETE_TODO,
  MARK_TODO,
} from "./apiConstant.js";

export const login = async (data) => {
  return axios.post(LOGIN, data);
};

export const register = async (data) => {
  return axios.post(REGISTER, data);
};

export const createTodoApi = async (data) => {
  let token = getToken();
  console.log(token, "token");

  return axios.post(CREATE_TODO, data, {
    headers: {
      auth: token,
    },
  });
};

export const getTodoListApi = async (data) => {
  let token = getToken();
  console.log(token, "token");

  return axios.get(TODO_LIST, {
    headers: {
      auth: token,
    },
  });
};

export function getToken() {
  let user = localStorage.getItem("user");
  if (!user) return;
  const userObj = JSON.parse(user);
  return userObj.token;
}

export const deleteTodoApi = async (data) => {
  let token = getToken();
  console.log(token, "token");

  return axios.post(DELETE_TODO, data, {
    headers: {
      auth: token,
    },
  });
};

export const markTodoApi = async (data) => {
  let token = getToken();

  return axios.post(MARK_TODO, data, {
    headers: {
      auth: token,
    },
  });
};
