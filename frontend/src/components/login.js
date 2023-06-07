import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const initialUserState = {
    name: "",
    id: "",
  };
  const [user, setUser] = useState(initialUserState);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const login = () => {
    props.login(user);
    navigate("/");
  };
  return (
    <div className="form-group">
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
                  Email or username
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="loginName"
                  name="name"
                  value={user.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="loginPassword" className="form-label">
                  ID
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="loginPassword"
                  name="id"
                  value={user.id}
                  onChange={handleInputChange}
                />
              </div>

              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={login}
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
   
  );
};

export default Login;
