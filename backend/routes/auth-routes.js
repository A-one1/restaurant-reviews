import express from "express";
import passport from "passport";
import User from "../database/user-model.js";

const router = express.Router();

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

//auth login

router.get("/login", (req, res) => {
  res.render("login");
});

//auth logout

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  //  res.redirect("http://localhost:3000/restaurants");
  });
});

router.get("/user", function (req, res, next) {
  // Successful authentication, redirect secrets.
  res.status = 200;
  User.findOne({ _id: ObjectId(req.user.id) }).exec((err, result) => {
    res.send(result);
  });
});

//auth with google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  const userData = JSON.stringify(req.user);
  // res.redirect(`http://localhost:3000/restaurants?user=${encodeURIComponent(userData)}`);
  res.redirect("http://localhost:3000/restaurants");
});

export default router;
