if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
const express = require("express");
const FormData = require("form-data");
const { isLoggedIn, asyncMiddleware } = require("./middleware");
const { randomStringToHash24Bits } = require("./utils/helpers");
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const basicRoutes = express.Router();

//basicRoutes.get("/user", isLoggedInMiddleware, asyncMiddleware(async (req, res) => {
basicRoutes.get("/home", asyncMiddleware(async (req, res) => {
    console.log('we are hit');
    res.json({blogs: "blogs"});
}));


basicRoutes.use((err, req, res, next) => {
    console.log(err); // Log the stack trace of the error
    res.status(500).json({ error: `Oops, we had an error ${err.message}` });
});

basicRoutes.post("/pdf", asyncMiddleware(async (req, res) => {
    console.log("pdf sent");
    res.json({pdf: "pdf"});
}));

module.exports = basicRoutes;