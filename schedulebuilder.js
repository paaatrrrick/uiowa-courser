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
    constructor(){
        this.dbStuff = null;
    }

    getRecommendations = async (remainingCourses) => {
        console.log('schedule');
        // resolve with grouping
        // pick 5, 2 gen ed, 3 cores
        const groups = {gened: {}, core:[]};
        const remainingGeneds = remainingCourses[0];
        for (let requirement in remainingGeneds){
            const group = await this.getGenEdCoursesByRequirement(requirement, null); // mongo
            groups.gened[requirement] = group;
        }
        const remainingCores = remainingCourses[1];
        for (let element of remainingCores){
            if (element.length === 1) {
                groups.core.push = element;
            }
            else {
                if (element[element.length-1] === "RANGE"){
                    const subject = element[0].slice(0, rec.indexOf(":"));
                    const group = await this.courseswithinrange(element[0], element[1], subject); // mongo
                    groups.core.push(group);
                } else{
                    groups.core.push(element);
                }
            }
        }
        const recs = []
        let i = 0;
        for (let group in groups.gened){
            if (i >= 2){
                break;
            }
            recs.push(group[0]);
            i++;
        }
        let j = 0;
        for (let group in groups.core){
            if (i >= 3){
                break;
            }
            recs.push(group[0]);
            i++;
        }
        let finalrecs = []
        for (let i = 0; i < recs.length; i++){
            const thingtopush = await this.getCourseInfo(recs[i])
            finalrecs.push(thingtopush);
        }
        return finalrecs;
    }
    getGenEdCoursesByRequirement = async (requirement, session=20235) => {
        try {
          await client.connect();
          console.log("Connected to MongoDB!");
      
          const db = await client.db('data');
          const collection = await db.collection('GenEdClasses');
          
          const documents = await collection.find({ 
            "requirementFilled": { "$regex": requirement, "$options": "i" } ,
            "term": session
          }).toArray();
      
          console.log(documents);
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
        const courseNumber = rec.slice(rec.indexOf(":")+1, rec.length);
        const session = 20235;
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
      
          console.log(courses);
          return courses;
          
        } catch (error) {
          console.error('Error:', error);
        } finally {
          await client.close();
        }
      }

    // Retrieves a list of courses within a specified range from the database.
    coursesWithinRange = async (min, max, session=20235, subject) => {
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