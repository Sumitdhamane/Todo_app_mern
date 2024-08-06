import React, { useEffect, useState } from "react";
import "./css/Login.css"; // Import custom CSS
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigation = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      return navigation("/");
    }
  }, []);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form);
    console.log("form", result);
    setErrors({}); // Reset errors before submitting

    if (result.status === 200) {
      if (result.data.status === 200) {
        localStorage.setItem("user", JSON.stringify(result.data.data));
        navigation("/");
        return;
      }
      if (result.data.status === 201) {
        // Handle errors returned from the API
        setErrors(result.data.data);
        return;
      }
      if (result.data.status === 202) {
        toast(result.data.message); // Use toast.error instead of toast
        return;
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      {/* Remove duplicate ToastContainer */}
      <ToastContainer />
      <div className="col-lg-4 col-md-6 col-sm-8 card border-0 shadow p-4">
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Welcome Back</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="inputEmail" className="form-label">
                Email or Username
              </label>
              <input
                type="text"
                onChange={handleChange}
                name="username"
                className="form-control"
                id="inputEmail"
                aria-describedby="emailHelp"
                placeholder="Enter email or username"
              />
              {errors?.username && (
                <small
                  id="emailHelp"
                  className="form-text text-muted text-danger"
                >
                  {errors.username.msg}
                </small>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="inputPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                onChange={handleChange}
                name="password"
                className="form-control"
                id="inputPassword"
                placeholder="Enter password"
              />
              {errors?.password && (
                <small className="form-text text-muted text-danger">
                  {errors.password.msg}
                </small>
              )}
            </div>
            <button type="submit" className="btn btn-dark w-100 mt-3 ">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
