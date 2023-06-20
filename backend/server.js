import express from "express";
import cors from "cors";
import restaurants from "./api/restaurants.route.js";
import router from "./routes/auth-routes.js";
import session from "express-session";
import passport from "./config/passport.js";
import mongoDbStore from "connect-mongo";

const app = express();

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);app.use(express.json());

app.use(
  session({
    secret: process.env.App_Secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
      expires: new Date(Date.now() + 60 * 60 * 1000), // Expires in 1 hour
    },
    store: mongoDbStore.create({ mongoUrl: process.env.RESTREVIEWS_DB_URI }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate("session"));

app.use("/api/v1/restaurants", restaurants);
app.use("/api/v1/auth", router);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;
