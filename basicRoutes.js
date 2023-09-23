if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const FormData = require("form-data");
const { isLoggedIn, asyncMiddleware } = require("./middleware");
const { randomStringToHash24Bits } = require("./utils/helpers");
const Agent = require("./agent")
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const basicRoutes = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.memoryStorage(); // Use in-memory storage for file handling
const upload = multer({ storage });

//basicRoutes.get("/user", isLoggedInMiddleware, asyncMiddleware(async (req, res) => {
basicRoutes.get("/home", asyncMiddleware(async (req, res) => {
  console.log('we are hit');
  res.json({ blogs: "blogs" });
}));

basicRoutes.post('/upload', async (req, res) => {
    try {
    //   if (!req.files || !req.files.pdf) {
    //     return res.status(400).send('No files were uploaded.');
    //   }

    //   const degreeAuditPDF = req.files.pdf;
    //   console.log(degreeAuditPDF);

      agent = new Agent('');
      agent.ready();
      res.send('File processed. Recommended schedules generated.');
    } catch (error) {
      console.error('Error processing file:', error);
      res.status(500).send('Server error');
    }
  });


basicRoutes.use((err, req, res, next) => {
  console.log(err); // Log the stack trace of the error
  res.status(500).json({ error: `Oops, we had an error ${err.message}` });
});

module.exports = basicRoutes;