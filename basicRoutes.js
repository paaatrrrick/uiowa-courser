if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const FormData = require("form-data");
const { isLoggedIn, asyncMiddleware } = require("./middleware");
const { randomStringToHash24Bits } = require("./utils/helpers");
const Agent = require("./agent")
const Proompter = require("./proompter")
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

let userApiKey = null;
basicRoutes.post("/updateApiKey", asyncMiddleware(async (req, res) => {
  try {
    userApiKey = req.body.apiKey;
    console.log("Updated API key to: ", userApiKey);
  } catch (error) {
    console.error('Error processing api key', error);
    res.status(500).send('Server error');
  }
}));

basicRoutes.post('/upload', async (req, res) => {
  try {
    //   if (!req.files || !req.files.pdf) {
    //     return res.status(400).send('No files were uploaded.');
    //   }

    // console.log(req.files.file);
    const file = req.files.file;
    // save file to uploads directory
    const fileNameNoDot = file.name.split('.')[0];
    const filePath = path.join(__dirname, 'uploads', fileNameNoDot + file.md5 + '.pdf');
    await file.mv(filePath);

    const agent = new Agent(filePath, '', []);
    const plans = await agent.ready();
    res.json(plans);
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).send('Server error');
  }
});


basicRoutes.post('/updateAgain', async (req, res) => {
  try {
    //   if (!req.files || !req.files.pdf) {
    //     return res.status(400).send('No files were uploaded.');
    //   }

    // console.log(req.files.file);
    const file = req.files.file;
    var { requirements, previous } = req.body;
    requirements = requirements.split(', ');

    // save file to uploads directory
    const fileNameNoDot = file.name.split('.')[0];
    const filePath = path.join(__dirname, 'uploads', fileNameNoDot + file.md5 + '.pdf');
    await file.mv(filePath);

    const agent = new Agent(filePath, requirements, previous, userApiKey);
    const plans = await agent.ready();
    res.json(plans);
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