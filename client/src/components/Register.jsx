import React, { useEffect, useState } from "react";
import { register } from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      return navigation("/login");
    }
  }, []);

  const [errors, setErrors] = useState(null);
  const navigation = useNavigate();
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Log form data
    console.log("Form Data:", form);

    try {
      const result = await register(form);

      // Log API response
      console.log("API Response:", result);

      if (result.status === 200) {
        if (result.data.status === 201) {
          setErrors(result.data.data);
          toast.success(result.data.message);
        } else {
          toast.error(result.data.message);
        }
        if (result.data.status === 200) {
          localStorage.setItem("user", JSON.stringify(result.data.data));
          navigation("/login");
          return;
        }
        if (result.data.status === 202) {
          toast(result.data.message);
        }
      } else {
        toast.error("Something went wrong, please try again!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred during registration!");
    }
  };

  return (
    <>
      <div className="container">
        <ToastContainer />
        <div className="row justify-content-md-center mt-4">
          <div className="col-lg-5 card border-dark mb-3">
            <div className="card-header h4 text-center">Register Now</div>
            <div className="card-body">
              <div className="form-group">
                <label className="col-form-label mt-4">Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Enter Name"
                />
                {errors?.name && (
                  <small id="emailHelp" className="form-text  text-danger">
                    {errors.name.msg}
                  </small>
                )}
              </div>

              <div className="form-group">
                <label className="col-form-label mt-4">Username</label>
                <input
                  type="text"
                  name="username"
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Enter Username"
                />
                {errors?.username && (
                  <small id="emailHelp" className="form-text   text-danger">
                    {errors.username.msg}
                  </small>
                )}
              </div>

              <div className="form-group">
                <label className="col-form-label mt-4">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Enter Email"
                />
                {errors?.email && (
                  <small id="emailHelp" className="form-text   text-danger">
                    {errors.email.msg}
                  </small>
                )}
              </div>

              <div className="form-group">
                <label className="col-form-label mt-4">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Enter Password"
                />
                {errors?.password && (
                  <small id="emailHelp" className="form-text   text-danger">
                    {errors.password.msg}
                  </small>
                )}
              </div>

              <div className="row justify-content-md-center form-group mt-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="col-sm-6 btn btn-dark btn-outline-secondary center"
                >
                  Register now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
