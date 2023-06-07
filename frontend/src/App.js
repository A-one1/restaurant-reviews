import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";

import AddReview from "./components/add-review";
import ListRestaurants from "./components/restaurants-list";
import Login from "./components/login";
import Restaurant from "./components/restaurants";

function App() {
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );

  async function login(user = null) {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }

  async function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link
          to="/restaurants"
          className="navbar-brand"
          style={{
            marginLeft: 40,
            fontFamily: "Montserrat",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            letterSpacing: "1px",
          }}
        >
          <span style={{ fontWeight: "bold" }}>Restaurant</span> Advisor
        </Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/restaurants" className="nav-link">
              Restaurants
            </Link>
          </li>
        </ul>
        <div
          className="navbar-collapse justify-content-end "
          style={{ marginRight: 40 }}
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              {user ? (
                <button
                  onClick={logout}
                  className="btn btn-link nav-link "
                  style={{ cursor: "pointer" }}
                >
                  Logout {user.name}
                </button>
              ) : (
                <Link to="/login" className="nav-link ">
                  Login
                </Link>
              )}
            </li>
          </ul>
        
        </div>
        
      </nav>
      <br/>

      <div className="container mr-3">
        <Routes>
          <Route exact path="/" element={<ListRestaurants />} />
          <Route exact path="/restaurants" element={<ListRestaurants />} />
          <Route
            path="/restaurants/:id/review"
            element={<AddReview user={user} />}
          />
          <Route
            path="/restaurants/id/:id"
            element={<Restaurant user={user} />}
          />
          <Route path="/login" element={<Login login={login} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
