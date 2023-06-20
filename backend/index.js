import app from "./server.js";
import mongodb from "mongodb";
import mongoose from "mongoose";
import dotenv from "dotenv";
import RestaurantsDAO from "./dao/restaurantsDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js";

dotenv.config();
const Mongoclient = mongodb.MongoClient;

const port = process.env.port || 8000;
//mongoose
mongoose
.connect(process.env.RESTREVIEWS_DB_URI)
.catch((err)=>{
    console.error("error connecting with mongoose",err.stack)
})
.then(()=>{
    console.log('Connected using Mongoose')
})

//mongodb native driver
Mongoclient.connect(process.env.RESTREVIEWS_DB_URI, {
  maxPoolSize: 50,
  wtimeoutMS: 2500,
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await RestaurantsDAO.injectDB(client);
    await ReviewsDAO.injectDB(client);

    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });

export default Mongoclient;
