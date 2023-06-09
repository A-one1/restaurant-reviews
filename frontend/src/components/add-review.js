import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import RestaurantDataService from "../services/restaurantDataService";

const AddReview = (props) => {
  const { id } = useParams();
  const location = useLocation();
  let initialReviewState = "";
  let editing = false;

  if (location.state && location.state.currentReview) {
    editing = true;
    initialReviewState = location.state.currentReview.text;
  }

  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (review.length==0) {
      errors.name = "Review cannot be empty";
      isValid = false;
    }
    if(review.length > 0 && review.length < 10){
      errors.name = "Your review is too short. Please provide more details."
      isValid = false;
    }
    setErrors(errors);
    return isValid;
  };


  const handleInputChange = (event) => {
    setReview(event.target.value);
  };

  const saveReview = () => {
    if(validateForm()){
      var data = {
        review_id: "",
        user_id: props.user.id || props.user.googleId,
        text: review,
        restaurant_id: id,
        name: props.user.name || props.user.userName,
      };

      if (editing) {
        data.review_id = location.state.currentReview._id;
        RestaurantDataService.updateReview(data)
          .then((response) => {
            setSubmitted(true);
            console.log(response.data);
          })
          .catch((e) => {
            console.log("edit error", e);
          });
      } else {
        RestaurantDataService.createReview(data)
          .then((response) => {
            setSubmitted(true);
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
    
  };

  return (
    <div>
      {props.user ? (
        <div className="submit-form">
          {submitted ? (
            <div>
              <h4> You submitted successfully</h4>
              <Link to={"/restaurants/id/" + id} className="btn btn-success">
                Back to Reviews
              </Link>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="description">
                  {editing ? "Edit" : "Create"} Review
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  id="text"
                  required
                  value={review}
                  onChange={handleInputChange}
                  name="text"
                />
                 {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
              <br />
              <button onClick={saveReview} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>Please Log in.</div>
      )}
    </div>
  );
};
export default AddReview;
