import passport from "passport";
import Strategy from "passport-google-oauth20";
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../database/user-model.js";

dotenv.config();

passport.use(
  new Strategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: "/api/v1/auth/google/redirect",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("passport callback function");
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          console.log("User already exists:", existingUser);
          done(null, existingUser);
        } else {
          // Create a new user in the database
          new User({
            userName: profile.displayName,
            googleId: profile.id,
            email: profile.emails[0].value,
          })
            .save()
            .then((newUser) => {
              console.log("New user created:", newUser);
              done(null, newUser);
            })
            .catch((error) => {
              console.log("Error creating new user:", error);
              done(error, null);
            });
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((error) => {
      done(error, null);
    });
});
export default passport;
