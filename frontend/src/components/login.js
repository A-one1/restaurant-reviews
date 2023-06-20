import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import restaurantDataService from "../services/restaurantDataService";
import GoogleButton from "react-google-button";

const Login = (props) => {
  const [user, setUser] = useState({
    userName: "",
    id: "",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (!user.userName.trim()) {
      errors.name = "Username is required";
      isValid = false;
    }

    if (!user.id.trim()) {
      errors.id = "Password is required";
      isValid = false;
    }
    setErrors(errors);
    return isValid;
  };

  const login = () => {
    if (validateForm()) {
      props.login(user);
      navigate("/");
    }
  };

  const google = () => {
    restaurantDataService.loginGoogle().catch((error) => {
      console.error("Error logging in with Google:", error);
    });
  };

  return (
    <div className="form-group">
      <div className="alert alert-success ">
        <center>
          <strong>
            This site is in test phase. Use sign in with Google.
          </strong>
        </center>
      </div>
      <div
        className="container justify-content-center vh-10"
        style={{ width: "400px" }}
      >
        <div className="card shadow">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Login</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="loginName" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  id="loginName"
                  name="userName"
                  value={user.name}
                  onChange={handleInputChange}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="loginPassword" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="********"
                  className={`form-control ${errors.id ? "is-invalid" : ""}`}
                  id="loginPassword"
                  name="id"
                  value={user.id}
                  onChange={handleInputChange}
                />
                {errors.id && (
                  <div className="invalid-feedback">{errors.id}</div>
                )}
              </div>

              <center>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={login}
                >
                  Sign in
                </button>
                <br />
                <hr></hr>
                
                <GoogleButton size="small" onClick={google} />
              </center>
              <br />
            </form>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Login;
