const express = require("express");
const registrationRoutes = express.Router();
const bcrypt = require("bcryptjs");
let Registration = require("./schema");

// Registration route
registrationRoutes.route("/register").post(function(req, res) {
  let register = new Registration(req.body);
  register
    .save()
    .then(reg => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.status(400).send("Failed to store to database");
    });
});

// Login Router
registrationRoutes.route("/login").post(function(req, res) {
  Registration.findOne({ user_name: req.body.user_name }).then(user => {
    console.log("User from login", user);
    if (!user) res.sendStatus(204);
    else {
      bcrypt
        .compare(req.body.password, user.password)
        .then(passwordMatch =>
          passwordMatch ? res.sendStatus(200) : res.sendStatus(204)
        );
    }
  });
});

// Username validation Router
registrationRoutes.route("/validateUsername").post(function(req, res) {
  Registration.findOne({ user_name: req.body.user_name }).then(user =>
    user ? res.sendStatus(204) : res.sendStatus(200)
  );
});

// Username validation Router
// registrationRoutes.route('/GetUserByUserName').post(function (req, res) {
// 	Registration.findOne({user_name: req.body.user_name})
// 	.then(user => user ? JSON.stringify(user) : null)
// });

registrationRoutes.route("/updateUser").post(function(req, res) {
  Registration.findByIdAndUpdate(
    req.body.id,
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber
    },
    function(err) {
      if (err) {
        res.send(err);
        return;
      }
      res.send({ data: "Record has been Updated..!!" });
    }
  );
});

registrationRoutes.route("/updatedonationamount").post(function(req, res) {
  Registration.findByIdAndUpdate(
    req.body.id,
    {
      donationAmount: req.body.donationAmount
    },
    function(err) {
      if (err) {
        res.send(err);
        return;
      }
      res.send({ data: "Record has been Updated..!!" });
    }
  );
});

// Username validation Router
registrationRoutes
  .route("/getUserByUserName/:username")
  .get(function(req, res) {
    Registration.findOne({ user_name: req.params.username }, (err, user) =>
      err ? res.status(400).send("Error occured") : res.json(user)
    );
  });

// Get allData
registrationRoutes.route("/allData").get(function(req, res) {
  Registration.find((err, data) =>
    err ? res.status(400).send("Error occured") : res.json(data)
  );
});

module.exports = registrationRoutes;
