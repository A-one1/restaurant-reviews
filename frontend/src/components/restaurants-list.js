import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import RestaurantDataService from "../services/restaurantDataService";
import { Link } from "react-router-dom";

const ListRestaurants = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [searchCuisine, setSearchCuisine] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]);
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

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

  const retrieveRestaurants = () => {
    RestaurantDataService.getAll()
      .then((response) => {
        console.log(response.data);
        setRestaurants(response.data.restaurants);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveCuisines = () => {
    RestaurantDataService.getCuisines()
      .then((response) => {
        console.log(response.data);
        setCuisines(["All Cuisines"].concat(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveRestaurants();
  };

  const find = (query, by) => {
    RestaurantDataService.find(query, by)
      .then((response) => {
        console.log(response.data);
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
      </div>

      <div className="row">
        {restaurants.map((restaurant, index) => {
          const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
          return (
            <div className="col-lg-4 pb-1">
              <section class="mx-auto my-3" style={{ "max-width": "25rem" }}>
                <div class="card">
                  <div
                    className="bg-image hover-overlay ripple  "
                    data-mdb-ripple-color="light"
                  >
                    {isLoading && (
                      <div className="spinner-border" role="status"></div>
                    )}
                    <iframe
                      title={restaurant.name}
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(
                        address
                      )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                      frameBorder="0"
                      style={{ border: 0, height: "200px", width: "100%" }}
                      allowFullScreen
                      onLoad={handleIframeLoad}
                    ></iframe>
                  </div>
                  <div class="card-body">
                    <h5 class="card-title font-weight-bold">
                      <a>{restaurant.name}</a>
                    </h5>

                    <p class="mb-2">
                      <strong>Address: </strong>
                      {address}
                    </p>
                    <p class="mb-2">
                      <strong>Cuisine: </strong> {restaurant.cuisine}
                    </p>

                    {/* <p class="card-text">
                    don't need anything for now
                    </p> */}
                    <hr class="my-4" />

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

            // <div className="col-lg-4 pb-1">
            //   <div className="card">
            //     <div className="card-body">
            //       <div
            //         id="map-container-google-1"
            //         className="z-depth-1-half map-container"
            //         style={{ height: 230}}
            //       >
            //         <iframe
            //         title={restaurant.name}
            //           src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            //           frameBorder="0"
            //           style={{ border: 0, height: "200px", width: "100%" }}
            //           allowFullScreen
            //         ></iframe>
            //       </div>
            //       <h5 className="card-title">{restaurant.name}</h5>
            //       <p className="card-text">
            //         <strong>Cuisine: </strong>
            //         {restaurant.cuisine}
            //         <br />
            //         <strong>Address: </strong>
            //         {address}
            //       </p>
            //       <div className="row" key={index} value={restaurant}>
            //         <Link
            //           to={"/restaurants/id/" + restaurant._id}
            //           className="btn btn-primary col-lg-5 mx-1 mb-1"
            //         >
            //           View Reviews
            //         </Link>
            //         <a
            //           target=""
            //           href={"https://www.google.com/maps/place/" + address}
            //           className="btn btn-primary col-lg-5 mx-1 mb-1"
            //         >
            //           View Map
            //         </a>
            //       </div>
            //     </div>
            //   </div>
            // </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListRestaurants;
