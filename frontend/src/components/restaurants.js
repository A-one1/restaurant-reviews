/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useParams } from "react-router-dom";
import RestaurantDataService from "../services/restaurantDataService";

const Restaurant = (props) => {
  const initialRestaurantState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: [],
  };
  const [restaurant, setRestaurant] = useState(initialRestaurantState);

  const { id } = useParams();

  const getRestaurant = (id) => {
    RestaurantDataService.get(id)
      .then((response) => {
        setRestaurant(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getRestaurant(id);
  }, []);

  function deleteReview(reviewId, index) {
    RestaurantDataService.deleteReview(reviewId, props.user.id)
      .then((response) => {
        setRestaurant((prevState) => {
          prevState.reviews.splice(index, 1);
          return {
            ...prevState,
          };
        });
        getRestaurant(id);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
  };

  return (
    <div>
      {restaurant ? (
        <div>
          <div>
            <h5>{restaurant.name}</h5>
            <p>
              <strong> Cuisine:</strong>
              {restaurant.cuisine}
              <br />
              <strong>Address: </strong>
              {restaurant.address.building},{restaurant.address.street},
              {restaurant.address.zipcode}
              <br />
            </p>
            <Link
              to={{
                pathname: "/restaurants/" + id + "/review",
                state: { currentReview: "add" },
              }}
              className="btn btn-success btn-sm"

            >
              Add Review
            </Link>
            <h4>Reviews</h4>
            <div className="row">
              {restaurant.reviews.length > 0 ? (
                restaurant.reviews.map((review, index) => {
                  return (
                    <div className="col-lg-7 pb-1" key={index}>
                      <div className="card  mb-4">
                        <div className="card-body">
                          <div className="d-lg-flex">
                            <div className="position-relative">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="36"
                                height="36"
                                fill="currentColor"
                                class="bi bi-person-circle"
                                viewBox="0 0 16 16"
                              >
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path
                                  fill-rule="evenodd"
                                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                                />
                              </svg>
                            </div>
                            <div className="ms-lg-4">
                              <h4 className="mb-0">{review.name}</h4>
                              <p className="mb-0 fs-6">
                                <strong>Reviewed: </strong>
                                {formatDate(review.date)}
                              </p>
                              <hr class="mt-2 mb-2" />
                              <p style={{fontFamily: "cursive",fontSize:14}}>{review.text}</p>

                              {props.user && props.user.id == review.user_id && (
                                <div className="row">
                                  <button
                                    onClick={() =>
                                      deleteReview(review._id, props.user.id)
                                    }
                                    className="btn btn-danger col-lg-3 mx-1 mb-1"
                                  >
                                    Delete
                                  </button>
                                  <Link
                                    to={{
                                      pathname:
                                        "/restaurants/" + id + "/review",
                                      state: { currentReview: review },
                                    }}
                                    className="btn btn-primary col-lg-3 mx-1 mb-1"
                                  >
                                    Edit
                                  </Link>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-sm-4">
                  <p>Be the First to Review!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>No Restaurants Selected</p>
        </div>
      )}
    </div>
  );
};

export default Restaurant;
