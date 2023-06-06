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
        getRestaurant(id)
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const formatDate = (dateString)=>{
    const date = new Date(dateString)
    return date.toLocaleString('en-US',{
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
  }

  return (
    <div>
      {restaurant ? (
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
            className="btn btn-primary"
          >
            Add Review
          </Link>
          <h4>Reviews</h4>
          <div className="row">
            {restaurant.reviews.length > 0 ? (
              restaurant.reviews.map((review, index) => {
                return (
                  <div className="col-lg-4 pb-1" key={index}>
                    <div className="card">
                      <div className="card-body">
                        <p className="card-text">
                          {review.text}
                          <br />
                          <strong>User: </strong>
                          {review.name}
                          <br />
                          <strong>Date: </strong>
                          {formatDate(review.date)}
                          <br />
                        </p>

                        {props.user && props.user.id == review.user_id && (
                          <div className="row">
                            <button
                              onClick={() =>
                                deleteReview(review._id, props.user.id)
                              }
                              className="btn btn-primary col-lg-5 mx-1 mb-1"
                            >
                              Delete
                            </button>
                            <Link
                              to={{
                                pathname: "/restaurants/" + id + "/review",
                                state: { currentReview: review },
                              }}
                              className="btn btn-primary col-lg-5 mx-1 mb-1"
                            >
                              Edit
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-sm-4">
                <p>No reviews yet</p>
              </div>
            )}
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
