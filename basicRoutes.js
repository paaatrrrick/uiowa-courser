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

basicRoutes.post('/upload', async (req, res) => {
    try {
      if (!req.files || !req.files.pdf) {
        return res.status(400).send('No files were uploaded.');
      }

      const pdfFile = req.files.pdf;
      console.log(pdfFile);
  
      res.send('File uploaded and processed.');
    } catch (error) {
      console.error('Error processing file:', error);
      res.status(500).send('Server error');
    }
  });


basicRoutes.use((err, req, res, next) => {
    console.log(err); // Log the stack trace of the error
    res.status(500).json({ error: `Oops, we had an error ${err.message}` });
});

basicRoutes.post("/pdf", asyncMiddleware(async (req, res) => {
    console.log("pdf sent");
    res.json({pdf: "pdf"});
}));

module.exports = basicRoutes;