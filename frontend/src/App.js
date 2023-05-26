import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";

import AddReview from "./components/add-review";
import ListRestaurants from "./components/restaurants-list";
import Login from "./components/login";
import Restaurant from "./components/restaurants";

function App() {
  const [user,setUser] = React.useState(null);

  async function login(user = null){
    setUser(user);
  }

  async function logout(){
    setUser(null)
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to="/restaurants" className="navbar-brand">
          Restaurant Reviews
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/restaurants" className="nav-link">
              Restaurants
            </Link>
          </li>
          <li className="nav-item">
            {user ? (
              <a
                onClick={logout}
                className="nav-link"
                style={{ cursor: "pointer" }}
              >
                Logout {user.name}
              </a>
            ) : (
              <Link to="/login" className="nav-link">
                Login
              </Link>
            )}
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route
            exact
            path= "/"  
            element={<ListRestaurants/>}
          />
          <Route
            exact
            path=  "/restaurants"
            element={<ListRestaurants/>}
          />
          <Route
            path="/restaurants/:id/review"
            render={(props) => <AddReview {...props} user={user} />}
          />
          <Route
            path="/restaurants/id/:id"
            element={<Restaurant user={user} />}
          />
          <Route
            path="/login"
            element = {<Login/>}
            render={(props) => <Login {...props} login={login} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
