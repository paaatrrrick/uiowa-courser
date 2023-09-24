const { ECDH } = require("crypto");
const { randomStringToHash24Bits } = require("./utils/helpers");

const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs').promises;

// Connection URL
const url = 'mongodb+srv://user:2Sz4X5YoPNTsy75r@cluster0.jb62ody.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    deprecationErrors: true,
  }
});

class scheduleBuilder {
  constructor() {
    this.dbStuff = null;
  }

  getRecommendations = async (remainingCourses) => {
    console.log('schedule');
    // resolve with grouping
    // pick 5, 2 gen ed, 3 cores
    const groups = { gened: {}, core: [] };
    const remainingGeneds = remainingCourses["geneds"];
    for (let requirement of remainingGeneds) {
      const group = await this.getGenEdCoursesByRequirement(requirement); // mongo
      groups.gened[requirement] = group;
    }

    const remainingCores = remainingCourses["cores"];
    for (let element of remainingCores) {
      if (typeof element === "string") {
        groups.core.push = [element];
      }
      else {
        if (element[element.length - 1] === "RANGE") {
          const subject = element[0].slice(0, element.indexOf(":"));
          const group = await this.coursesWithinRange(element[0], element[1], subject); // mongo
          groups.core.push(group);
        }
        else {
          groups.core.push(element);
        }
      }
      console.log("G: ", groups)
    }
    const recs = []
    let i = 0;
    for (let group in groups["geneds"]) {
      if (i >= 2) {
        break;
      }
      recs.push(group[0]);
      i++;
    }
    let j = 0;
    for (let group in groups["cores"]) {
      if (i >= 3) {
        break;
      }
      recs.push(group[0]);
      i++;
    }
    let finalrecs = []
    for (let i = 0; i < recs.length; i++) {
      const thingtopush = await this.getCourseInfo(recs[i])
      finalrecs.push(thingtopush);
    }
    return finalrecs;
  }
  getGenEdCoursesByRequirement = async (requirement, session = "Spring 2023") => {
    try {
      await client.connect();
      console.log("Connected to MongoDB!");

      const db = await client.db('data');
      const collection = await db.collection('GenEdClasses');

      const document = await collection.findOne();

      // // If a document is found, print its field names
      // const doc = await collection.find().toArray();


      // if (doc.length > 0) {
      //   console.log('Values under "International and Global Issues" category:');
      //   doc.forEach((document) => {
      //     if (document.term && document.term.includes(session)) {
      //       // Extract and print values under the category
      //       console.log(document.term);
      //     }
      //   });
      // }

      const documents = await collection.find({
        "requirementFilled": { "$regex": requirement, "$options": "i" },
        "term": session
      }).toArray();

      return documents

    } catch (error) {
      console.error('Error:', error);
    } finally {
      await client.close();
    }
  }

  // Retrieves a course from the database based on a specified course number + subject
  getCourseInfo = async (rec) => {
    const subject = rec.slice(0, rec.indexOf(":"));
    const courseNumber = rec.slice(rec.indexOf(":") + 1, rec.length);
    const session = "Spring 2023";
    try {
      await client.connect();
      console.log("Connected to MongoDB!");

      const db = await client.db('data');
      const collection = await db.collection('CoreClasses');

      // Case insensitive search
      const courses = await collection.find({
        course: Number(courseNumber),
        session: session,
        subject: subject
      }).toArray();

      console.log("Core: ", courses);
      return courses;

    } catch (error) {
      console.error('Error:', error);
    } finally {
      await client.close();
    }
  }

  // Retrieves a list of courses within a specified range from the database.
  coursesWithinRange = async (min, max, session = "Spring 2023", subject) => {
    try {
      await client.connect();
      console.log("Connected to MongoDB!");

      const db = await client.db('data');
      const collection = await db.collection('CoreClasses');

      // Case insensitive search
      const coursesInRange = await collection.find({
        course: {
          $gte: min,
          $lte: max
        },
        session: session,
        subject: subject
      }).toArray();

      console.log(coursesInRange);
      return coursesInRange

    } catch (error) {
      console.error('Error:', error);
    } finally {
      await client.close();
    }
  }
}

module.exports = scheduleBuilder;