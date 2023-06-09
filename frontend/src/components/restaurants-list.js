import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import RestaurantDataService from "../services/restaurantDataService";
import { Link } from "react-router-dom";
import GoogleMaps from "./google-maps";

const ListRestaurants = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [searchCuisine, setSearchCuisine] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    retrieveRestaurants();
    retrieveCuisines();
  }, []);
  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const onChangeSearchZip = (e) => {
    const searchZip = e.target.value;
    setSearchZip(searchZip);
  };

  const onChangeSearchCuisine = (e) => {
    const searchCuisine = e.target.value;
    setSearchCuisine(searchCuisine);
  };

  const retrieveRestaurants = (page = currentPage) => {
    RestaurantDataService.getAll(page)
      .then((response) => {
        // console.log(response.data);
        setRestaurants(response.data.restaurants);
        setTotalPages(response.data.totalPages);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const changePage = (page) => {
    setCurrentPage(page);
    retrieveRestaurants(page);
  };

  const retrieveCuisines = () => {
    RestaurantDataService.getCuisines()
      .then((response) => {
        // console.log(response.data);
        setCuisines(["All Cuisines"].concat(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveRestaurants(currentPage);
  };

  const find = (query, by) => {
    RestaurantDataService.find(query, by)
      .then((response) => {
        // console.log(response.data);
        setRestaurants(response.data.restaurants);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    find(searchName, "name");
  };

  const findByZip = () => {
    find(searchZip, "zipcode");
  };

  const findByCuisine = () => {
    if (searchCuisine === "All Cuisines") {
      refreshList();
    } else {
      find(searchCuisine, "cuisine");
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-3">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name"
                value={searchName}
                onChange={onChangeSearchName}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={findByName}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-4 mb-3">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search by zip"
                value={searchZip}
                onChange={onChangeSearchZip}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={findByZip}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-4 mb-3">
            <div className="input-group">
              <select
                className="custom-select"
                onChange={onChangeSearchCuisine}
              >
                {cuisines.map((cuisine, index) => (
                  <option key={index} value={cuisine}>
                    {cuisine.substr(0, 20)}
                  </option>
                ))}
              </select>
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={findByCuisine}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {restaurants.map((restaurant, index) => {
            const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
            return (
              <div className="col-lg-4 pb-1">
                <section className="mx-auto my-3" style={{ maxWidth: "25rem" }}>
                  <div className="card">
                    <GoogleMaps address={address} />
                    <div className="card-body">
                      <h5 className="card-title font-weight-bold">
                        <p>{restaurant.name}</p>
                      </h5>

                      <p className="mb-2">
                        <strong>Address: </strong>
                        {address}
                      </p>
                      <p className="mb-2">
                        <strong>Cuisine: </strong> {restaurant.cuisine}
                      </p>
                      <hr className="my-4" />
                      <div
                        className="d-flex justify-content-center"
                        key={index}
                        value={restaurant}
                      >
                        <Link
                          to={"/restaurants/id/" + restaurant._id}
                          className="btn btn-primary col-lg-5 mx-1 mb-1"
                        >
                          View Reviews
                        </Link>
                        <a
                          target=""
                          href={"https://www.google.com/maps/place/" + address}
                          className="btn btn-primary col-lg-5 mx-1 mb-1"
                        >
                          View Map
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            );
          })}
        </div>
      </div>
      <div className="row">
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-end">
            <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => changePage(currentPage - 1)}
              >
                previous
              </button>
            </li>
            <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => changePage(currentPage - 1)}
              >
                {currentPage + 1}
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <li
                className={`page-item ${page === currentPage ? "active" : ""}`}
                key={page}
              >
                <button className="page-link" onClick={() => changePage(page)}>
                  {page}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => changePage(currentPage + 1)}
              >
                {currentPage + 2}
              </button>
            </li>
            <li>
              <button
                className="page-link"
                onClick={() => changePage(currentPage + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ListRestaurants;
