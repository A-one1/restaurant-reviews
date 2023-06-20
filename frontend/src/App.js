import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";
import AddReview from "./components/add-review";
import ListRestaurants from "./components/restaurants-list";
import Login from "./components/login";
import Restaurant from "./components/restaurants";
import axios from "axios";
import restaurantDataService from "./services/restaurantDataService";

function App() {
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const getUser = async () => {
    try {
      const url = `http://localhost:5000/api/v1/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user);
      // console.log("User received from API:", data.user);
    } catch (err) {
      console.log("NO USER", err);
    }
  };

  async function login(user = null) {
    setUser(user);
    console.log("User Data:", user);
    localStorage.setItem("user", JSON.stringify(user));
  }

  async function logout() {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      setUser(null);
      localStorage.removeItem("user");
      if (user.googleId) {
        restaurantDataService.logoutGoogle();
      }
    }
  }

  useEffect(() => {
    getUser();
  }, []);

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
                  Logout {user.userName.split(" ")[0]}
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
      <br />

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
