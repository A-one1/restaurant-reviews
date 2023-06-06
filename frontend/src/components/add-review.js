import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import RestaurantDataService from "../services/restaurantDataService";

const AddReview = (props) => {
  //let initialReviewState = "";
  let editing = false;

  const { id } = useParams();
  const location = useLocation();

  const currentReview = location.state;

  console.log("Props", props);

  console.log("state", currentReview);

  //  // if (props.location.state && props.location.state.currentReview) {
  //     editing = true;
  //     let initialReviewState = props.location.state.currentReview.text;
  //   }

  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);
  // const [data, setData] = useState({
  //   text: review,
  //   name: "",
  //   user_id: "",
  //   restaurant_id: id,
  //   review_id: editing ? props.location.state.currentReview.user_id : null,
  // });

  const handleInputChange = (event) => {
    setReview(event.target.value);
  };

  const saveReview = () => {
    var data = {
      text: review,
      name: props.user.name,
      user_id: props.user.id,
      restaurant_id: id,
    };

    if (editing) {
      data.review_id = props.location.state.currentReview.user_id;
      RestaurantDataService.updateReview(data)
        .then((response) => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
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
                  {editing ? "Edit" : "Create"}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="text"
                  required
                  value={review}
                  onChange={handleInputChange}
                  name="text"
                />
              </div>
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
