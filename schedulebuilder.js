const { ECDH } = require("crypto");
const { randomStringToHash24Bits } = require("./utils/helpers");

const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs').promises;

// Connection URL
const url = process.env.MONGO_URI;

const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    deprecationErrors: true,
  }
});

class scheduleBuilder {
  constructor() {
    this.client = new MongoClient(url, {
      serverApi: {
        version: ServerApiVersion.v1,
        deprecationErrors: true,
      },
    });
    this.db = null;
    this.dbStuff = null;
  }

  connect = async () => {
    try {
      await this.client.connect();
      console.log("Connected to MongoDB!");
      this.db = this.client.db('data');
    } catch (error) {
      console.error('Error:', error);
    }
  }

  disconnect = async () => {
    try {
      await this.client.close();
      console.log("Disconnected from MongoDB!");
    } catch (error) {
      console.error('Error:', error);
    }
  }

  getRecommendations = async (remainingCourses) => {
    console.log('schedule');
    const groups = { gened: {}, core: [] };
    const remainingGeneds = remainingCourses[0];
    for (let requirement of remainingGeneds) {
      const temp = []
      const mygroups = await this.getGenEdCoursesByRequirement(requirement); // mongo
      for (let group of mygroups) {
        const courseID = group.courseNumbers[0];
        const fixed = await this.getCourseInfo(courseID)
        if (fixed) {
          temp.push(fixed);
        }
      }
      groups.gened[requirement] = temp;
    }

    const remainingCores = remainingCourses[1];
    for (let element of remainingCores) {
      if (element.length === 1) {
        const fixed = await this.getCourseInfo(element[0])
        groups.core.push([fixed]);

      } else {
        if (element[element.length - 1] === "RANGE") {
          const subject = element[0].slice(0, element.indexOf(":"));
          const group = await this.coursesWithinRange(element[0], element[1], subject); // mongo
          groups.core.push(group);
        }
        else {
          const nxt = [];
          for (let a of element) {
            const fixed = await this.getCourseInfo(a)
            nxt.push(fixed);
          }
          groups.core.push(nxt);
        }
      }
      console.log("G: ", groups)
    }
  
    return groups;
    // const recs = []
    // let i = 0;
    // for (let group in groups.gened) {
    //   if (i >= 2) {
    //     break;
    //   }
    //   recs.push(group[0]);
    //   i++;
    // }
    // let j = 0;
    // for (let group in groups["cores"]) {
    //   if (i >= 3) {
    //     break;
    //   }
    //   recs.push(group[0]);
    //   i++;
    // }
    // let finalrecs = []
    // for (let i = 0; i < recs.length; i++) {
    //   const thingtopush = await this.getCourseInfo(recs[i])
    //   finalrecs.push(thingtopush);
    // }
  }


  reducer = (object) => {
    var time = object.timeAndLocations.length > 0 ? (object.timeAndLocations[0].startTime + ' ' + object.timeAndLocations[0].days) : "tbd";
    const subject = object.subject + ":" + String(object.course);
    return {instructor: "tbd", title: object.title, time:time, ID:subject}
  }


  getGenEdCoursesByRequirement = async (requirement, session = "Spring 2023") => {
    try {
      // await client.connect();
      // console.log("Connected to MongoDB!");

      // const db = await client.db('data');
      // const collection = await db.collection('GenEdClasses');
      const collection = this.db.collection('GenEdClasses');
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
    const session = "Spring 2024";
    try {
      // await client.connect();
      // console.log("Connected to MongoDB!");

      // const db = await client.db('data');
      // const collection = await db.collection('CoreClasses');
      const collection = this.db.collection('CoreClasses');

      // Case insensitive search
      const courses = await collection.find({
        course: Number(courseNumber),
        session: session,
        subject: subject
      }).toArray();

      return this.reducer(courses[0]);

    } catch (error) {
      console.error('Error:', error);
    } finally {
      await client.close();
    }
  }

  // Retrieves a list of courses within a specified range from the database.
  coursesWithinRange = async (min, max, session = "Spring 2023", subject) => {
    try {
      // await client.connect();
      // console.log("Connected to MongoDB!");

      // const db = await client.db('data');
      // const collection = await db.collection('CoreClasses');
      const collection = this.db.collection('CoreClasses');


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