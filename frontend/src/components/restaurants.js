import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import {Switch, Route, Link} from "react-router-dom";

const Restaurant = props => {
  const initialRestaurantState = {
    id:null,
    name:"",
    address:{},
    cuisine:"",
    reviews:[]
  }
const [restaurant,setRestaurant] = useState(initialRestaurantState);

const getRestaurant = id =>{
  Restaurant.
}

  

  return (
    <div className="App">
      Hello Worldssss
    </div>
  );
}

export default Restaurant;
