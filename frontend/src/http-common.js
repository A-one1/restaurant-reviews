import axios from "axios";

export default axios.create({
  //  baseURL: "https://us-east-1.aws.data.mongodb-api.com/app/restaurant-reviews-nbazp/endpoint", //for realm

  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-type": "application/json"
  } 
});