/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useParams } from "react-router-dom";
import RestaurantDataService from "../services/restaurantDataService";
import { Modal } from "bootstrap";

const Restaurant = (props) => {
  const [restaurant, setRestaurant] = useState({
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: [],
  });
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
  }, [id]);

  function deleteReview(review, index) {
    const reviewId = review._id;

    RestaurantDataService.deleteReview(
      reviewId,
      props.user.id || props.user.googleId
    )
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
              to={"/restaurants/" + id + "/review"}
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
                                className="bi bi-person-circle"
                                viewBox="0 0 16 16"
                              >
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path
                                  fillRule="evenodd"
                                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                                />
                              </svg>
                            </div>
                            <div className="ms-lg-4">
                              {console.log(review)}
                              <h4 className="mb-0">{review.name}</h4>
                              <p className="mb-0 fs-6">
                                <strong>Reviewed: </strong>
                                {formatDate(review.date)}
                              </p>
                              <hr className="mt-2 mb-2" />
                              <p
                                style={{ fontFamily: "cursive", fontSize: 14 }}
                              >
                                {review.text}
                              </p>

                              {props.user &&
                                (props.user.id || props.user.googleId) ==
                                  review.user_id && (
                                  <div className="row">
                                    <button
                                      type="button"
                                      className="btn btn-danger col-lg-3 mx-1 mb-1"
                                      data-bs-toggle="modal"
                                      data-bs-target="#Delete"
                                      data-review-id={review._id}
                                      data-user-id={props.user.googleId}
                                    >
                                      Delete
                                    </button>
                                    {/* delete modal */}
                                    <div
                                      className="modal fade"
                                      id="Delete"
                                      tabIndex="-1"
                                      aria-labelledby="DeleteLabel"
                                      aria-hidden="true"
                                    >
                                      <div className="modal-dialog">
                                        <div className="modal-content">
                                          <div className="modal-header">
                                            <h1
                                              className="modal-title fs-5"
                                              id="DeleteLabel"
                                            >
                                              Delete Confirmation
                                            </h1>
                                            <button
                                              type="button"
                                              className="btn-close"
                                              data-bs-dismiss="modal"
                                              aria-label="Close"
                                            ></button>
                                          </div>
                                          <div className="modal-body">
                                            Are you absolutely sure you want to
                                            delete this review?
                                          </div>
                                          <div className="modal-footer">
                                            <button
                                              type="button"
                                              className="btn btn-secondary"
                                              data-bs-dismiss="modal"
                                            >
                                              Close
                                            </button>
                                            <button
                                              type="button"
                                              className="btn btn-danger"
                                              onClick={() => {
                                                deleteReview(review);
                                              }}
                                              data-bs-dismiss="modal"
                                            >
                                              Delete
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <Link
                                      to={"/restaurants/" + id + "/review"}
                                      state={{ currentReview: review }}
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
