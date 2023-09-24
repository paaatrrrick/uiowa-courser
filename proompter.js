// const { ChatOpenAI } = require("langchain/chat_models/openai");
// const { PromptTemplate } = require("langchain/prompts");
// const { HumanChatMessage, SystemChatMessage } = require("langchain/schema");
// const { z } = require("zod");
// const { StructuredOutputParser, CustomListOutputParser } = require("langchain/output_parsers");
const { Configuration, OpenAIApi } = require("openai");
class Proompter {
      constructor() {
            const configuration = new Configuration({
                  apiKey: process.env.OPEN_AI
            });
            this.openai = new OpenAIApi(configuration);
            this.requirements = ["Only pick 1 course from 1 array and never more than 1", "Only pick courses whose times do not overlap and do not pick courses with conflicting times"];
            this.messages =  [
            {"role": "system", 
            "content": `You are a course advisor named Courser. Given an array of constraints and an object of potential courses, your job is to return 1 array of courses that satisfy the constraints. Here is what the potential courses object looks like: {
                  gened: {
                    'GENED': [
                      [courseObject, ...], ...]
                    ]
                  },
                  core: [ [courseObject, ...], ...]
                }. A course object is defined as follows: {title: title, professor: professor, time: time, subject: subject}. Your output must be an array of some of these courses such that the schedule satsifies all the requirements. Do not output anything other than 1 array of courses.`},  

            {"role": "user", 
            "content": `Constraints=[Don't return any classes that start at or before 9am, I only want history geneds, I want to take Networks], potentialCourses={
                                    geneds: [{Art: [{ID: ART:1111, Title: Art Class, Instructor: Missy, Time: 9:00am - 3:00pm}, {ID: ART:1231, Title: Advanced Art Class, Instructor: Missy 2, Time: 9:30pm - 10:30pm}]}, {History: [{ID: ANTH:2100, Title: Anthropology and Contemporary World Problems, Instructor: billy bob, Time: 9:00am - 10:30am}, {ID: ABCD:2150, Title: World Problems, Instructor: billy doe, Time: 10:00am - 11:30am}, {ID: DBCD:3000, Title: Ant History, Instructor: john bob, Time: 9:00pm - 10:30pm}]}],
                                    core: [{ID: CS:2300, Title: Networks, Instructor: Rishab, Time: 10:30am - 12:00pm}, {ID: CS:3330, Title: Algorithms, Instructor: Denise, Time: 11:30am - 12:45pm}, {ID: CS:3620, Title: Computer Architecture, Instructor: Goddard, Time: 4:30pm - 5:20pm}, {ID: CS:1210, Title: Fundamentals, Instructor: HEHEHEHA. Time: 2:00pm - 2:30pm}]}`},

                                    {"role": "assistant", 
            "content": `[{ID: DBCD:3000, Title: Ant History, Instructor: john bob, Time: 9:00pm - 10:30pm}, {ID: CS:2300, Title: Networks, Instructor: Rishab, Time: 10:30am - 12:00pm}, {ID: CS:3620, Title: Computer Architecture, Instructor: Goddard, Time: 4:30pm - 5:20pm}, {ID: CS:1210, Title: Fundamentals, Instructor: HEHEHEHA. Time: 2:00pm - 2:30pm}]`},

            {"role": "user", 
            "content": `Constraints=[I don't want any classes past 5pm, I want to take any class with Professor Goddard], potentialCourses={
                              geneds: [{Art: [{ID: ART:1111, Title: Art Class, Instructor: Missy, Time: 9:00am - 3:00pm}, {ID: ART:1231, Title: Advanced Art Class, Instructor: Missy 2, Time: 10:45pm - 12:15pm}]}, {History: [{ID: ANTH:2100, Title: Anthropology and Contemporary World Problems, Instructor: billy bob, Time: 9:00am - 10:30am}, {ID: ABCD:2150, Title: World Problems, Instructor: billy doe, Time: 10:00am - 11:30am}, {ID: DBCD:3000, Title: Ant History, Instructor: john bob, Time: 9:00pm - 10:30pm}]}],
                              core: [{ID: CS:2300, Title: Networks, Instructor: Goddard, Time: 6:00pm - 12:00pm}, {ID: CS:3330, Title: Algorithms, Instructor: Denise, Time: 11:30am - 12:45pm}, {ID: CS:3620, Title: Computer Architecture, Instructor: Goddard, Time: 4:00pm - 5:00pm}, {ID: CS:1210, Title: Fundamentals, Instructor: HEHEHEHA. Time: 2:00pm - 2:30pm}, {ID: CS:3620, Title: Computer Architecture, Instructor: John Doe, Time: 4:00pm - 5:00pm}, {ID: CS:1100, Title: CS Fundamentals, Instructor: Mayer, Time: 3:00pm - 3:45pm}]}`},

            {"role":"assistant", 
            "content": `[{ID: ANTH:2100, Title: Anthropology and Contemporary World Problems, Instructor: billy bob, Time: 9:00am - 10:30am}, {ID: ART:1231, Title: Advanced Art Class, Instructor: Missy 2, Time: 10:45pm - 12:15pm}, {ID: CS:3620, Title: Computer Architecture, Instructor: Goddard, Time: 4:00pm - 5:00pm}, {ID: CS:1210, Title: Fundamentals, Instructor: HEHEHEHA. Time: 2:00pm - 2:30pm},  {ID: CS:1100, Title: CS Fundamentals, Instructor: Mayer, Time: 3:00pm - 3:45pm}]`}]
      }

    getMissing = async (degreeAuditText) => {
      const completion = await this.openai.createChatCompletion({
            model: 'gpt-3.5-turbo-16k',
            temperature: 0,
            messages: [
                  {"role": "system", "content": `${systemProompt0}`},
                  {"role": "user", "content": `${sampleDegreeAudit0}`},
                  {"role": "assistant", "content": `${sampleResponse}`},
                  {"role": "user", "content": `${degreeAuditText}`}
            ]
      });
      console.log(completion.data.choices); 
      const remaining = completion.data.choices[0].message.content;
      console.log(remaining);
      //   const remaining = '{"geneds": ["INTERNATIONAL AND GLOBAL ISSUES"], "cores": [["CS:3820"], ["CS:3990"], ["CS:3620","CS:5899","RANGE"], ["NATURAL SCIENCE"], ["CS:3620", "CS:5899","RANGE"]] }' 
      const json = JSON.parse(remaining);
      const newJSON0 = []
      for (let row of json[1]){
            const newRow = []
            for (let element of row){
                  const splitElement = element.split(", ");
                  for (let newElement of splitElement){
                        newRow.push(newElement);
                  }
            }
            newJSON0.push(newRow);
      }
      json[1] = newJSON0;
      return json;
        //return completion.data.choices[0].content;     
    }

    buildSchedule = async(potentials, newRequirement) => {
      console.log('potentials', potentials);
      if (newRequirement) {
            this.requirements.push(newRequirement);
      }
      this.messages.push({"role": "user", "content": `Constraints=${this.requirements}, potentialCourses=${JSON.stringify(potentials)}`});
      const completion = await this.openai.createChatCompletion({
            model: 'gpt-4',
            temperature: 0,
            messages: this.messages
      });
      const schedule = completion.data.choices[0].message.content;
      console.log(schedule);
      return {course: JSON.parse(schedule)}
    }
}


const sampleDegreeAudit0 =
      ` Sharda, Gautam                                             Program: A22C1BS 
01421135                                                Catalog Year: FA2021 
                                                    Prepared: 04/20/23 - 02:28 PM
                       The University of Iowa - Iowa City, Iowa
                     COMPUTER SCIENCE (BS) REQUIREMENTS
Advisor name: Pemmaraju, Sriram V
      addr: 101G MLH
     email: sriram-pemmaraju@uiowa.edu
GENERAL EDUCATION - COMMUNICATION AND LITERACY
OK
   +     3 S.H. OF DIVERSITY AND INCLUSION HAVE BEEN COMPLETED
         TermCourse       Credits GradeCrse Title
         FA22 POLI:1950       3.0 A    Intro Politics of Religion
GENERAL EDUCATION - COMMUNICATION AND LITERACY
OK
   +     THE RHETORIC REQUIREMENT HAS BEEN FULFILLED
         TermCourse       Credits GradeCrse Title
         FA21 RHET:1030       4.0 A-   Rhetoric
   +     INTERPRETATION OF LITERATURE HAS BEEN COMPLETED
         TermCourse       Credits GradeCrse Title
         SP22 ENGL:1200       3.0 A    The Interpretation of Lit
         WORLD LANGUAGES REQUIREMENT HAS BEEN FULFILLED
                 Note: Satisfied by exam: Hindi
GENERAL EDUCATION - NATURAL, QUANTITATIVE, AND SOCIAL SCIENCES
OK
         NATURAL SCIENCES
   +     7 S.H. OF NATURAL SCIENCE COURSES HAVE BEEN COMPLETED
         TermCourse       Credits GradeCrse Title
         FA21 PHYS:1611       4.0 R    AP Physics C Mechanics
                                       AP EXAM: AP 80
         FA22 PHYS:1612       4.0 B-   Introductory Physics II
   +     A NATURAL SCIENCES LAB COURSE HAS BEEN COMPLETED
         TermCourse       Credits GradeCrse Title
         FA21 PHYS:1611       4.0 R    AP Physics C Mechanics
                                       AP EXAM: AP 80
   +     3 S.H. OF QUANTITATIVE OR FORMAL REASONING
         HAVE BEEN COMPLETED
         TermCourse       Credits GradeCrse Title
         FA21 CS :1210        4.0 A    Computer Sci I: Fundamentals
   +     3 S.H. OF SOCIAL SCIENCES HAVE BEEN COMPLETED
         TermCourse       Credits GradeCrse Title
         FA21 ECON:1200       3.0 R    AP Macroeconomics
                                       AP EXAM: AP 35
GENERAL EDUCATION - CULTURE, SOCIETY, AND THE ARTS
3/8 (ver. 4.5.4.2)             01421135 - Sharda, Gautam          04/20/23 - 02:28 PM
NO
    +         3 S.H. OF HISTORICAL PERSPECTIVES HAVE BEEN COMPLETED
             Term  Course           Credits Grade     Crse Title
             SP23 ARTH:1070              3.0 *    IP Asian Art and Culture
    ---      INTERNATIONAL AND GLOBAL ISSUES
             3 S.H. MUST BE COMPLETED
             CLICK TO SEARCH: Approved General Education Courses
    +         3 S.H. OF LITERARY, VISUAL AND PERFORMING ARTS
              HAVE BEEN COMPLETED
             Term  Course           Credits Grade     Crse Title
             FA22 CW :1800               3.0 A        Creative Wrtng Studio Wrkshp
    +         3 S.H. OF VALUES AND CULTURE HAVE BEEN COMPLETED
             Term  Course           Credits Grade     Crse Title
             SP22 PHIL:1861              3.0 A        Introduction to Philosophy
THESE COURSES HAVE BEEN APPROVED IN MORE THAN ONE OF 
THE FOLLOWING GENERAL EDUCATION PROGRAM AREAS:
- SOCIAL SCIENCES
- HISTORICAL PERSPECTIVES
- INTERNATIONAL & GLOBAL ISSUES
- LITERARY, VISUAL & PERFORMING ARTS
- VALUES AND CULTURE
    *        HIST PERSPECTIVES or LIT, VISUAL & PERFORMING ARTS
             Term  Course           Credits Grade     Crse Title
             SP23 ARTH:1070              3.0 *    IP Asian Art and Culture
             IF YOU HAVE QUESTIONS ABOUT WHY A COURSE APPEARS IN A 
             SPECIFIC GEP AREA ON THE AUDIT, CONTACT YOUR ADVISOR.
MAJOR REQUIREMENTS FOR THE BA DEGREE DIFFER FROM 
THOSE BELOW. CONSULT ADVISOR FOR FURTHER INFORMATION.
             NO MORE THAN 56 S.H. FROM ANY SINGLE DEPARTMENT 
             WILL COUNT TOWARD THE 120 S.H. REQUIRED FOR A
4/8 (ver. 4.5.4.2)                       01421135 - Sharda, Gautam                      04/20/23 - 02:28 PM
         BA OR BS DEGREE.
COMPUTER SCIENCE (BS) REQUIREMENTS
NO
     NOTE TO COMPUTER SCIENCE MAJORS: MAY NOT EARN A SECOND 
     MAJOR OR MINOR IN BUSINESS ANALYTICS AND INFORMATION 
     SYSTEMS, COMPUTER SCIENCE AND ENGINEERING, DATA SCIENCE, 
     OR INFORMATICS.
     CS:4980 IS A REPEATABLE, VARIABLE TOPIC COURSE. STUDENTS
     MAY NOT ENROLL IN THE SAME SUBTITLE MORE THAN ONE TIME FOR 
     CREDIT. CONTACT YOUR ADVISOR FOR MORE INFORMATION.
  ---   1)1ST SEMESTER CALCULUS MUST BE COMPLETED
         SELECT FROM:   MATH:1850,1550
  +     2)2ND SEMESTER CALCULUS HAS BEEN COMPLETED
         TermCourse       Credits GradeCrse Title
         FA21 MATH:1860      4.0 A-    Calculus II
  ---   3) THE 8 REQUIRED COURSES BELOW MUST BE COMPLETED
         TermCourse       Credits GradeCrse Title
         FA20 CS :2210       3.0 B+    Discrete Structures
         FA21 CS :1210       4.0 A     Computer Sci I: Fundamentals
         SP22 CS :2230       4.0 B     Computer Sci II: Data Struct
         FA22 CS :3330       3.0 C     Algorithms
         SP23 CS :2630       4.0 *  IP Computer Organization
         SP23 CS :2820       4.0 *  IP Intro Software Development
         NEEDS:                  2 courses
         SELECT FROM:    CS :3820
                         CS :3620 or 3640
  +     4) THE REQUIRED COURSE BELOW HAS BEEN COMPLETED
         TermCourse       Credits GradeCrse Title
         SP23 CS :4330       3.0 *  IP Theory of Computation

  +     5)2 MATH ELECTIVES HAVE BEEN COMPLETED
         TermCourse       Credits GradeCrse Title
         FA20 MATH:2700      4.0 A+    Intro to Linear Algebra
         SP22 STAT:2020      3.0 B     Probab & Stats Engr & Phy Sci
  ---   6)4 ADVANCED TECHNICAL COURSES MUST BE COMPLETED, AT
         LEAST 2 OF WHICH MUST BE FROM THE COURSES LISTED 
         BELOW. OTHER COURSES MAY ALSO APPLY; SEE ADVISOR FOR 
         MORE INFORMATION.
         (A COURSE CHOSEN TO FULFILL ONE REQUIREMENT CANNOT BE
         USED TO FULFILL A SECOND; NO MORE THAN 3 S.H. OF
         CS:3990)
         NEEDS:   12.00 hours    4 courses
         NOT FROM:      CS :3910,3980,4310
         SELECT FROM:   CS :3700 or MATH:3800 CS :3990
5/8 (ver. 4.5.4.2)             01421135 - Sharda, Gautam         04/20/23 - 02:28 PM

                             CS :3620 TO 5899
    +     7)2 OR MORE COURSES IN A REQUIRED SEQUENCE IN THE NATURAL
           SCIENCES HAVE BEEN COMPLETED
           Term Course         Credits Grade Crse Title
           FA21 PHYS:1611         4.0 R      AP Physics C Mechanics
                                             AP EXAM: AP  80
           FA22 PHYS:1612         4.0 B-     Introductory Physics II
    ---   8)AT LEAST 7 COURSES (MINIMUM OF 21 S.H.)
           OF THE REQUIRED COMPUTER SCIENCE COURSE WORK BELOW
           MUST BE COMPLETED AT THE UNIVERSITY OF IOWA
           Term Course         CreditsGrade  Crse Title
           FA22 CS :3330          3.0 C      Algorithms
           SP23 CS :2630          4.0 *   IP Computer Organization
           SP23 CS :2820          4.0 *   IP Intro Software Development
           SP23 CS :4330          3.0 *   IP Theory of Computation
           NEEDS:     7.00 hours      3 courses
           NOT FROM:        CS :3910,3980,4310
           SELECT FROM:      CS :3620 TO 5899
    +     9)A MINIMUM MAJOR GPA OF 2.00 MUST BE MAINTAINED
           CURRENT MAJOR GPA IS:
              36.00 semester hours 
              25.00 GPA hours         84.99 points   3.40 GPA
           Term Course         CreditsGrade  Crse Title
           FA20 CS :2210          3.0 B+     Discrete Structures
           FA20 MATH:2700         4.0 A+     Intro to Linear Algebra
           FA21 CS :1210          4.0 A      Computer Sci I: Fundamentals
           FA21 MATH:1860         4.0 A-     Calculus II
           SP22 CS :2230          4.0 B      Computer Sci II: Data Struct
           SP22 STAT:2020         3.0 B      Probab & Stats Engr & Phy Sci
           FA22 CS :3330          3.0 C      Algorithms
           SP23 CS :2630          4.0 *   IP Computer Organization
           SP23 CS :2820          4.0 *   IP Intro Software Development
           SP23 CS :4330          3.0 *   IP Theory of Computation
    +    10)A MINIMUM UI MAJOR GPA OF 2.00 MUST BE MAINTAINED
           CURRENT UI MAJOR GPA IS:
              36.00 semester hours 
              25.00 GPA hours         84.99 points   3.40 GPA
           Term Course         CreditsGrade  Crse Title
           FA20 CS :2210          3.0 B+     Discrete Structures
           FA20 MATH:2700         4.0 A+     Intro to Linear Algebra
           FA21 CS :1210          4.0 A      Computer Sci I: Fundamentals
           FA21 MATH:1860         4.0 A-     Calculus II
           SP22 CS :2230          4.0 B      Computer Sci II: Data Struct
           SP22 STAT:2020         3.0 B      Probab & Stats Engr & Phy Sci
           FA22 CS :3330          3.0 C      Algorithms
6/8 (ver. 4.5.4.2)                 01421135 - Sharda, Gautam               04/20/23 - 02:28 PM
           SP23 CS :2630          4.0 *   IP Computer Organization
           SP23 CS :2820          4.0 *   IP Intro Software Development
           SP23 CS :4330          3.0 *   IP Theory of Computation
COURSE POOL
           THE FOLLOWING UI COURSES COUNT AS ELECTIVES
           Term Course         Credits Grade Crse Title
           FA21 CSI :1600         2.0 S      Success at Iowa
           FA21 HONR:1100         1.0 S      Honors Primetime
           FA21 HONR:1310         1.0 A      Honors Research FY Seminar
           THE FOLLOWING TRANSFER COURSES COUNT AS ELECTIVES
           Term Course         Credits Grade Crse Title
           FA19 CTCX:T045         3.0 R      Career & Tech Cred
                                             KIRKWOOD: ZCT 016
This degree audit has been prepared to assist you in determining your academic progress
at The University of Iowa. While efforts have been made to ensure its accuracy, final
responsibility for meeting graduation requirements resides with you.
The Office of the Registrar along with your major department will certify your
successful completion of degree requirements.
All 'in progress' (IP) courses must be completed satisfactorily to fulfill requirements.
Courses taken to remove high school unit deficiencies do not count toward completion of
the General Education Program, with the exception of Rhetoric and World Languages.
If you have questions, please contact your advisor immediately.
Advisor name: Pemmaraju, Sriram V
        addr: 101G MLH
       email: sriram-pemmaraju@uiowa.edu
                              ** Placement Tests **
The results of your placement tests are below. Consult with your academic advisor to
discuss the most appropriate courses for you.
TEST NAME                              SCORE TEST DATE RECOMMENDED PLACEMENT
MPT Level 3                            20     03/31/2020 MATH:1860
Spanish Webcape                        609    06/03/2021 SPAN:2000 or higher
                              ** AP and CLEP **
For specific information on these tests, see Credit by Exam Options.
TEST NAME                      SCORE  TEST DATE CREDIT  EVALUATION
AP Biology                     2      05/2021   0.0     Score too low
AP Calculus BC                 2      05/2020   0.0     Score too low
AP Computer Science A          3      05/2021   0.0     Score too low
AP Computer Science A          3      05/2019   0.0     Score too low
AP Computer Science Principles 4      05/2020   0.0     Score too low
AP English Literature          3      05/2021   0.0     Score too low
AP Govt & Politic:US           5      05/2021   3.0     POLI:1100
AP Human Geography             5      05/2018   3.0     Elective Credit
AP Macroeconomics              5      05/2020   3.0     ECON:1200
AP Microeconomics              3      05/2020   0.0     Score too low
AP Physics C Mechanics         4      05/2020   4.0     PHYS:1611
AP Statistics                  4      05/2020   4.0     STAT:1020
7/8 (ver. 4.5.4.2)                 01421135 - Sharda, Gautam               04/20/23 - 02:28 PM
   ***** Transfer Course Work,Placement Test Scores and/or UI Additional Credit *****
Year-Term  Institution Course         Taken      Grade    Course Title
FA2019     KIRKWOOD    ZCT   016        3          R      CAREER & TECH CREDIT
SP2020     PLACEMNT    PLAC  08         20                MPT Level 3
SU2021     PLACEMNT    PLAC  17         609               Spanish Webcape
FA2021     AP EXAM     AP    20         0          2      Biology
           AP EXAM     AP    31         0          3      Computer Science A
           AP EXAM     AP    31         0          3      Computer Science A
           AP EXAM     AP    32         0          4      Computer Science Principles
           AP EXAM     AP    34         0          3      Microeconomics
           AP EXAM     AP    35         0          5      Macroeconomics
           AP EXAM     AP    37         0          3      English Literature
           AP EXAM     AP    53         0          5      Human Geography
           AP EXAM     AP    57         0          5      Govt & Politics:US
           AP EXAM     AP    68         0          2      Calculus BC
           AP EXAM     AP    80         0          4      Physics C Mechanics
           AP EXAM     AP    90         0          4      Statistics
***** End of Transfer Course Work, Placement Test Scores and/or UI Additional Credit *****
                                   L E G E N D
NO = Requirement not complete                >D = Duplicative or regressive course
OK = Requirement completed                   >S = Hours applied to two req.
IP = Current registration                    >X = Second grade only course
PL = MyPlan Course                           >R = Repeatable course
 R = Mandatory sub-req.                      TRN or TRNX equivalencies are considered
 + = Sub-req. completed or in progress        elective credit but could possibly
 - = Sub-req. not complete                    satisfy a General Education Requirement.
******* Approved general education courses can be found on MyUI on the Courses tab
                 ************************ END OF ANALYSIS ************************
8/8 (ver. 4.5.4.2)                 01421135 - Sharda, Gautam               04/20/23 - 02:28 PM`;

const sampleDegreeAudit =
      ` Sharda, Gautam                                             Program: A22C1BS 
01421135                                                Catalog Year: FA2021 
                                                    Prepared: 04/20/23 - 02:28 PM
                       The University of Iowa - Iowa City, Iowa
                     COMPUTER SCIENCE (BS) REQUIREMENTS
Advisor name: Pemmaraju, Sriram V
      addr: 101G MLH
     email: sriram-pemmaraju@uiowa.edu
          -> AT LEAST 1 REQUIREMENT IN YOUR AUDIT BELOW IS NOT SATISFIED <-
LIBERAL ARTS & SCI SEMESTER HOUR, GPA, AND RESIDENCE REQUIREMENTS
NO
        TOTAL S.H. COMPLETED ARE LISTED BELOW. 
        HOURS DO NOT INCLUDE CURRENT REGISTRATION.
           69.00 semester hours
  --- R 1)120 S.H. TOWARD DEGREE ARE REQUIRED FOR GRADUATION. 
        TOTAL S.H. TOWARD DEGREE ARE LISTED BELOW.
        HOURS DO NOT INCLUDE CURRENT REGISTRATION.
           69.00 semester hours
        NEEDS:  51.00 hours
  + R 2) A MINIMUM OVERALL GPA OF 2.00 IS REQUIRED FOR DEGREE
        CURRENT OVERALL GPA IS:
                                          3.53 GPA
  + R 3) A MINIMUM UI GPA OF 2.00 IS REQUIRED FOR DEGREE
        CURRENT UI GPA IS:
                                          3.53 GPA
        THE CLAS RESIDENCE REQUIREMENT BELOW MUST BE COMPLETED
  + R 4)30 SH OF COURSES OFFERED BY THE COLLEGE OF LIBERAL ARTS
        AND SCIENCES HAVE BEEN COMPLETED.
        ONE OF THE UI RESIDENCE OPTIONS BELOW MUST BE COMPLETED
  ---  5) RESIDENCE OPTION 1: AT LEAST 90 S.H. MUST BE COMPLETED
        AFTER ADMISSION TO THE UNIVERSITY OF IOWA.
  --- OR) RESIDENCE OPTION 2: 45 OF THE FINAL 60 S.H. FOR DEGREE
        MUST BE COMPLETED AFTER ADMISSION TO THE UNIVERSITY 
        OF IOWA.
1/8 (ver. 4.5.4.2)          01421135 - Sharda, Gautam       04/20/23 - 02:28 PM
   ---  OR) RESIDENCE OPTION 3: FINAL CONSECUTIVE 30 S.H. FOR
           DEGREE MUST BE COMPLETED AFTER ADMISSION TO THE 
           UNIVERSITY OF IOWA.
           NO MORE THAN 60 S.H. OF COMMUNITY/2-YEAR 
           COLLEGE CREDIT CAN BE APPLIED TOWARD
           THE 120 S.H. MINIMUM REQUIRED FOR GRADUATION
COLLEGE OF LIBERAL ARTS AND SCIENCES REGULATIONS
      THE FOLLOWING ARE COLLEGE OF LIBERAL ARTS AND SCIENCES 
      RULES AND OTHER INFORMATION CONCERNING PROGRESS AT THE 
      UNIVERSITY OF IOWA
         2)S COURSES ARE BELOW. A MAX OF 15 S.H. OF S COURSES 
           WILL APPLY TOWARD THE 120 S.H. DEGREE REQUIREMENT
               3.00 semester hours
           Term Course         Credits Grade Crse Title
           FA21 CSI :1600         2.0 S      Success at Iowa
           FA21 HONR:1100         1.0 S      Honors Primetime
         5) EXAM CREDIT IS BELOW. A MAX OF 30 S.H. OF EXAM CREDIT 
           WILL APPLY TO THE 120 S.H. DEGREE REQUIREMENT.
           Term Course         CreditsGrade  Crse Title
           FA21 APPX:0053         3.0 R      AP Human Geography
                                             AP EXAM: AP  53
           FA21 ECON:1200         3.0 R      AP Macroeconomics
                                             AP EXAM: AP  35
           FA21 PHYS:1611         4.0 R      AP Physics C Mechanics
                                             AP EXAM: AP  80
           FA21 POLI:1100         3.0 R      AP Govt & Politics:US
                                             AP EXAM: AP  57
           FA21 STAT:1020         4.0 R      AP Statistics
                                             AP EXAM: AP  90
         6) ALL TRANSFER COURSES ARE LISTED BELOW
               3.00 semester hours
           Term Course         Credits Grade Crse Title
           FA19 CTCX:T045         3.0 R      Career & Tech Cred
                                             KIRKWOOD: ZCT 016
           ALL TRANSFER WORK FROM 4-YEAR INSTITUTIONS, AND UP 
           TO 60 S.H. FROM 2-YEAR COLLEGES, MAY COUNT AS HOURS
           EARNED TOWARD DEGREE. HOURS EARNED TOWARD DEGREE ARE 
           LISTED BELOW.
               3.00 semester hours
         11) CURRENT REGISTRATION IS BELOW 
           ** IN PROGRESS COURSES ONLY **
              14.00 semester hours
           Term Course         Credits Grade Crse Title
           SP23 ARTH:1070         3.0 *   IP Asian Art and Culture
           SP23 CS :2630          4.0 *   IP Computer Organization
2/8 (ver. 4.5.4.2)                 01421135 - Sharda, Gautam               04/20/23 - 02:28 PM
         SP23 CS :2820        4.0 *  IP Intro Software Development
         SP23 CS :4330        3.0 *  IP Theory of Computation
GENERAL EDUCATION - COMMUNICATION AND LITERACY
OK
   +     3 S.H. OF DIVERSITY AND INCLUSION HAVE BEEN COMPLETED
         TermCourse       Credits GradeCrse Title
         FA22 POLI:1950       3.0 A    Intro Politics of Religion
GENERAL EDUCATION - COMMUNICATION AND LITERACY
OK
   +     THE RHETORIC REQUIREMENT HAS BEEN FULFILLED
         TermCourse       Credits GradeCrse Title
         FA21 RHET:1030       4.0 A-   Rhetoric
   +     INTERPRETATION OF LITERATURE HAS BEEN COMPLETED
         TermCourse       Credits GradeCrse Title
         SP22 ENGL:1200       3.0 A    The Interpretation of Lit
         WORLD LANGUAGES REQUIREMENT HAS BEEN FULFILLED
                 Note: Satisfied by exam: Hindi
GENERAL EDUCATION - NATURAL, QUANTITATIVE, AND SOCIAL SCIENCES
OK
         NATURAL SCIENCES
   +     7 S.H. OF NATURAL SCIENCE COURSES HAVE BEEN COMPLETED
         TermCourse       Credits GradeCrse Title
         FA21 PHYS:1611       4.0 R    AP Physics C Mechanics
                                       AP EXAM: AP 80
         FA22 PHYS:1612       4.0 B-   Introductory Physics II
   +     A NATURAL SCIENCES LAB COURSE HAS BEEN COMPLETED
         TermCourse       Credits GradeCrse Title
         FA21 PHYS:1611       4.0 R    AP Physics C Mechanics
                                       AP EXAM: AP 80
   +     3 S.H. OF QUANTITATIVE OR FORMAL REASONING
         HAVE BEEN COMPLETED
         TermCourse       Credits GradeCrse Title
         FA21 CS :1210        4.0 A    Computer Sci I: Fundamentals
   +     3 S.H. OF SOCIAL SCIENCES HAVE BEEN COMPLETED
         TermCourse       Credits GradeCrse Title
         FA21 ECON:1200       3.0 R    AP Macroeconomics
                                       AP EXAM: AP 35
GENERAL EDUCATION - CULTURE, SOCIETY, AND THE ARTS
3/8 (ver. 4.5.4.2)             01421135 - Sharda, Gautam          04/20/23 - 02:28 PM
NO
    +         3 S.H. OF HISTORICAL PERSPECTIVES HAVE BEEN COMPLETED
             Term  Course           Credits Grade     Crse Title
             SP23 ARTH:1070              3.0 *    IP Asian Art and Culture
    ---      INTERNATIONAL AND GLOBAL ISSUES
             3 S.H. MUST BE COMPLETED
             CLICK TO SEARCH: Approved General Education Courses
    +         3 S.H. OF LITERARY, VISUAL AND PERFORMING ARTS
              HAVE BEEN COMPLETED
             Term  Course           Credits Grade     Crse Title
             FA22 CW :1800               3.0 A        Creative Wrtng Studio Wrkshp
    +         3 S.H. OF VALUES AND CULTURE HAVE BEEN COMPLETED
             Term  Course           Credits Grade     Crse Title
             SP22 PHIL:1861              3.0 A        Introduction to Philosophy
THESE COURSES HAVE BEEN APPROVED IN MORE THAN ONE OF 
THE FOLLOWING GENERAL EDUCATION PROGRAM AREAS:
- SOCIAL SCIENCES
- HISTORICAL PERSPECTIVES
- INTERNATIONAL & GLOBAL ISSUES
- LITERARY, VISUAL & PERFORMING ARTS
- VALUES AND CULTURE
    *        HIST PERSPECTIVES or LIT, VISUAL & PERFORMING ARTS
             Term  Course           Credits Grade     Crse Title
             SP23 ARTH:1070              3.0 *    IP Asian Art and Culture
             IF YOU HAVE QUESTIONS ABOUT WHY A COURSE APPEARS IN A 
             SPECIFIC GEP AREA ON THE AUDIT, CONTACT YOUR ADVISOR.
MAJOR REQUIREMENTS FOR THE BA DEGREE DIFFER FROM 
THOSE BELOW. CONSULT ADVISOR FOR FURTHER INFORMATION.
             NO MORE THAN 56 S.H. FROM ANY SINGLE DEPARTMENT 
             WILL COUNT TOWARD THE 120 S.H. REQUIRED FOR A
4/8 (ver. 4.5.4.2)                       01421135 - Sharda, Gautam                      04/20/23 - 02:28 PM
         BA OR BS DEGREE.
COMPUTER SCIENCE (BS) REQUIREMENTS
NO
     NOTE TO COMPUTER SCIENCE MAJORS: MAY NOT EARN A SECOND 
     MAJOR OR MINOR IN BUSINESS ANALYTICS AND INFORMATION 
     SYSTEMS, COMPUTER SCIENCE AND ENGINEERING, DATA SCIENCE, 
     OR INFORMATICS.
     CS:4980 IS A REPEATABLE, VARIABLE TOPIC COURSE. STUDENTS
     MAY NOT ENROLL IN THE SAME SUBTITLE MORE THAN ONE TIME FOR 
     CREDIT. CONTACT YOUR ADVISOR FOR MORE INFORMATION.
  ---   1)1ST SEMESTER CALCULUS MUST BE COMPLETED
         SELECT FROM:   MATH:1850,1550
  +     2)2ND SEMESTER CALCULUS HAS BEEN COMPLETED
         TermCourse       Credits GradeCrse Title
         FA21 MATH:1860      4.0 A-    Calculus II
  ---   3) THE 8 REQUIRED COURSES BELOW MUST BE COMPLETED
         TermCourse       Credits GradeCrse Title
         FA20 CS :2210       3.0 B+    Discrete Structures
         FA21 CS :1210       4.0 A     Computer Sci I: Fundamentals
         SP22 CS :2230       4.0 B     Computer Sci II: Data Struct
         FA22 CS :3330       3.0 C     Algorithms
         SP23 CS :2630       4.0 *  IP Computer Organization
         SP23 CS :2820       4.0 *  IP Intro Software Development
         NEEDS:                  2 courses
         SELECT FROM:    CS :3820
                         CS :3620 or 3640
  +     4) THE REQUIRED COURSE BELOW HAS BEEN COMPLETED
         TermCourse       Credits GradeCrse Title
         SP23 CS :4330       3.0 *  IP Theory of Computation

  +     5)2 MATH ELECTIVES HAVE BEEN COMPLETED
         TermCourse       Credits GradeCrse Title
         FA20 MATH:2700      4.0 A+    Intro to Linear Algebra
         SP22 STAT:2020      3.0 B     Probab & Stats Engr & Phy Sci
  ---   6)4 ADVANCED TECHNICAL COURSES MUST BE COMPLETED, AT
         LEAST 2 OF WHICH MUST BE FROM THE COURSES LISTED 
         BELOW. OTHER COURSES MAY ALSO APPLY; SEE ADVISOR FOR 
         MORE INFORMATION.
         (A COURSE CHOSEN TO FULFILL ONE REQUIREMENT CANNOT BE
         USED TO FULFILL A SECOND; NO MORE THAN 3 S.H. OF
         CS:3990)
         NEEDS:   12.00 hours    4 courses
         NOT FROM:      CS :3910,3980,4310
         SELECT FROM:   CS :3700 or MATH:3800 CS :3990
5/8 (ver. 4.5.4.2)             01421135 - Sharda, Gautam         04/20/23 - 02:28 PM

                             CS :3620 TO 5899
    +     7)2 OR MORE COURSES IN A REQUIRED SEQUENCE IN THE NATURAL
           SCIENCES HAVE BEEN COMPLETED
           Term Course         Credits Grade Crse Title
           FA21 PHYS:1611         4.0 R      AP Physics C Mechanics
                                             AP EXAM: AP  80
           FA22 PHYS:1612         4.0 B-     Introductory Physics II
    ---   8)AT LEAST 7 COURSES (MINIMUM OF 21 S.H.)
           OF THE REQUIRED COMPUTER SCIENCE COURSE WORK BELOW
           MUST BE COMPLETED AT THE UNIVERSITY OF IOWA
           Term Course         CreditsGrade  Crse Title
           FA22 CS :3330          3.0 C      Algorithms
           SP23 CS :2630          4.0 *   IP Computer Organization
           SP23 CS :2820          4.0 *   IP Intro Software Development
           SP23 CS :4330          3.0 *   IP Theory of Computation
           NEEDS:     7.00 hours      3 courses
           NOT FROM:        CS :3910,3980,4310
           SELECT FROM:      CS :3620 TO 5899
    +     9)A MINIMUM MAJOR GPA OF 2.00 MUST BE MAINTAINED
           CURRENT MAJOR GPA IS:
              36.00 semester hours 
              25.00 GPA hours         84.99 points   3.40 GPA
           Term Course         CreditsGrade  Crse Title
           FA20 CS :2210          3.0 B+     Discrete Structures
           FA20 MATH:2700         4.0 A+     Intro to Linear Algebra
           FA21 CS :1210          4.0 A      Computer Sci I: Fundamentals
           FA21 MATH:1860         4.0 A-     Calculus II
           SP22 CS :2230          4.0 B      Computer Sci II: Data Struct
           SP22 STAT:2020         3.0 B      Probab & Stats Engr & Phy Sci
           FA22 CS :3330          3.0 C      Algorithms
           SP23 CS :2630          4.0 *   IP Computer Organization
           SP23 CS :2820          4.0 *   IP Intro Software Development
           SP23 CS :4330          3.0 *   IP Theory of Computation
    +    10)A MINIMUM UI MAJOR GPA OF 2.00 MUST BE MAINTAINED
           CURRENT UI MAJOR GPA IS:
              36.00 semester hours 
              25.00 GPA hours         84.99 points   3.40 GPA
           Term Course         CreditsGrade  Crse Title
           FA20 CS :2210          3.0 B+     Discrete Structures
           FA20 MATH:2700         4.0 A+     Intro to Linear Algebra
           FA21 CS :1210          4.0 A      Computer Sci I: Fundamentals
           FA21 MATH:1860         4.0 A-     Calculus II
           SP22 CS :2230          4.0 B      Computer Sci II: Data Struct
           SP22 STAT:2020         3.0 B      Probab & Stats Engr & Phy Sci
           FA22 CS :3330          3.0 C      Algorithms
6/8 (ver. 4.5.4.2)                 01421135 - Sharda, Gautam               04/20/23 - 02:28 PM
           SP23 CS :2630          4.0 *   IP Computer Organization
           SP23 CS :2820          4.0 *   IP Intro Software Development
           SP23 CS :4330          3.0 *   IP Theory of Computation
COURSE POOL
           THE FOLLOWING UI COURSES COUNT AS ELECTIVES
           Term Course         Credits Grade Crse Title
           FA21 CSI :1600         2.0 S      Success at Iowa
           FA21 HONR:1100         1.0 S      Honors Primetime
           FA21 HONR:1310         1.0 A      Honors Research FY Seminar
           THE FOLLOWING TRANSFER COURSES COUNT AS ELECTIVES
           Term Course         Credits Grade Crse Title
           FA19 CTCX:T045         3.0 R      Career & Tech Cred
                                             KIRKWOOD: ZCT 016
This degree audit has been prepared to assist you in determining your academic progress
at The University of Iowa. While efforts have been made to ensure its accuracy, final
responsibility for meeting graduation requirements resides with you.
The Office of the Registrar along with your major department will certify your
successful completion of degree requirements.
All 'in progress' (IP) courses must be completed satisfactorily to fulfill requirements.
Courses taken to remove high school unit deficiencies do not count toward completion of
the General Education Program, with the exception of Rhetoric and World Languages.
If you have questions, please contact your advisor immediately.
Advisor name: Pemmaraju, Sriram V
        addr: 101G MLH
       email: sriram-pemmaraju@uiowa.edu
                              ** Placement Tests **
The results of your placement tests are below. Consult with your academic advisor to
discuss the most appropriate courses for you.
TEST NAME                              SCORE TEST DATE RECOMMENDED PLACEMENT
MPT Level 3                            20     03/31/2020 MATH:1860
Spanish Webcape                        609    06/03/2021 SPAN:2000 or higher
                              ** AP and CLEP **
For specific information on these tests, see Credit by Exam Options.
TEST NAME                      SCORE  TEST DATE CREDIT  EVALUATION
AP Biology                     2      05/2021   0.0     Score too low
AP Calculus BC                 2      05/2020   0.0     Score too low
AP Computer Science A          3      05/2021   0.0     Score too low
AP Computer Science A          3      05/2019   0.0     Score too low
AP Computer Science Principles 4      05/2020   0.0     Score too low
AP English Literature          3      05/2021   0.0     Score too low
AP Govt & Politic:US           5      05/2021   3.0     POLI:1100
AP Human Geography             5      05/2018   3.0     Elective Credit
AP Macroeconomics              5      05/2020   3.0     ECON:1200
AP Microeconomics              3      05/2020   0.0     Score too low
AP Physics C Mechanics         4      05/2020   4.0     PHYS:1611
AP Statistics                  4      05/2020   4.0     STAT:1020
7/8 (ver. 4.5.4.2)                 01421135 - Sharda, Gautam               04/20/23 - 02:28 PM
   ***** Transfer Course Work,Placement Test Scores and/or UI Additional Credit *****
Year-Term  Institution Course         Taken      Grade    Course Title
FA2019     KIRKWOOD    ZCT   016        3          R      CAREER & TECH CREDIT
SP2020     PLACEMNT    PLAC  08         20                MPT Level 3
SU2021     PLACEMNT    PLAC  17         609               Spanish Webcape
FA2021     AP EXAM     AP    20         0          2      Biology
           AP EXAM     AP    31         0          3      Computer Science A
           AP EXAM     AP    31         0          3      Computer Science A
           AP EXAM     AP    32         0          4      Computer Science Principles
           AP EXAM     AP    34         0          3      Microeconomics
           AP EXAM     AP    35         0          5      Macroeconomics
           AP EXAM     AP    37         0          3      English Literature
           AP EXAM     AP    53         0          5      Human Geography
           AP EXAM     AP    57         0          5      Govt & Politics:US
           AP EXAM     AP    68         0          2      Calculus BC
           AP EXAM     AP    80         0          4      Physics C Mechanics
           AP EXAM     AP    90         0          4      Statistics
***** End of Transfer Course Work, Placement Test Scores and/or UI Additional Credit *****
                                   L E G E N D
NO = Requirement not complete                >D = Duplicative or regressive course
OK = Requirement completed                   >S = Hours applied to two req.
IP = Current registration                    >X = Second grade only course
PL = MyPlan Course                           >R = Repeatable course
 R = Mandatory sub-req.                      TRN or TRNX equivalencies are considered
 + = Sub-req. completed or in progress        elective credit but could possibly
 - = Sub-req. not complete                    satisfy a General Education Requirement.
******* Approved general education courses can be found on MyUI on the Courses tab
                 ************************ END OF ANALYSIS ************************
8/8 (ver. 4.5.4.2)                 01421135 - Sharda, Gautam               04/20/23 - 02:28 PM`;

const sampleDegreeAudit2 =
      `Degree audit:

Zhu, Liao                                                  Program: A22C1BS 
 01451797                                                Catalog Year: FA2021 
                                                     Prepared: 08/30/23 - 09:59 AM
                        The University of Iowa - Iowa City, Iowa
                      COMPUTER SCIENCE (BS) REQUIREMENTS
Advisor name: Oliveira, Suely
       addr: 101H MLH
      email: suely-oliveira@uiowa.edu
           -> AT LEAST 1 REQUIREMENT IN YOUR AUDIT BELOW IS NOT SATISFIED <-
LIBERAL ARTS & SCI SEMESTER HOUR, GPA, AND RESIDENCE REQUIREMENTS
NO
         TOTAL S.H. COMPLETED ARE LISTED BELOW. 
         HOURS DO NOT INCLUDE CURRENT REGISTRATION.
            73.00 semester hours
   --- R 1)120 S.H. TOWARD DEGREE ARE REQUIRED FOR GRADUATION. 
         TOTAL S.H. TOWARD DEGREE ARE LISTED BELOW.
         HOURS DO NOT INCLUDE CURRENT REGISTRATION.
            73.00 semester hours
         NEEDS:  47.00 hours
   + R 2) A MINIMUM OVERALL GPA OF 2.00 IS REQUIRED FOR DEGREE
         CURRENT OVERALL GPA IS:
                                           3.80 GPA
   + R 3) A MINIMUM UI GPA OF 2.00 IS REQUIRED FOR DEGREE
         CURRENT UI GPA IS:
                                           3.80 GPA
         THE CLAS RESIDENCE REQUIREMENT BELOW MUST BE COMPLETED
   + R 4)30 SH OF COURSES OFFERED BY THE COLLEGE OF LIBERAL ARTS
         AND SCIENCES HAVE BEEN COMPLETED.
         ONE OF THE UI RESIDENCE OPTIONS BELOW MUST BE COMPLETED
   ---  5) RESIDENCE OPTION 1: AT LEAST 90 S.H. MUST BE COMPLETED
         AFTER ADMISSION TO THE UNIVERSITY OF IOWA.
   --- OR) RESIDENCE OPTION 2: 45 OF THE FINAL 60 S.H. FOR DEGREE
         MUST BE COMPLETED AFTER ADMISSION TO THE UNIVERSITY 
         OF IOWA.
1/8 (ver. 4.5.4.2)            01451797 - Zhu, Liao          08/30/23 - 09:59 AM
    ---  OR) RESIDENCE OPTION 3: FINAL CONSECUTIVE 30 S.H. FOR
            DEGREE MUST BE COMPLETED AFTER ADMISSION TO THE 
            UNIVERSITY OF IOWA.
            NO MORE THAN 60 S.H. OF COMMUNITY/2-YEAR 
            COLLEGE CREDIT CAN BE APPLIED TOWARD
            THE 120 S.H. MINIMUM REQUIRED FOR GRADUATION
 COLLEGE OF LIBERAL ARTS AND SCIENCES REGULATIONS
       THE FOLLOWING ARE COLLEGE OF LIBERAL ARTS AND SCIENCES 
       RULES AND OTHER INFORMATION CONCERNING PROGRESS AT THE 
       UNIVERSITY OF IOWA
          5) EXAM CREDIT IS BELOW. A MAX OF 30 S.H. OF EXAM CREDIT 
            WILL APPLY TO THE 120 S.H. DEGREE REQUIREMENT.
            Term Course         Credits Grade Crse Title
            FA21 CHEM:1070         3.0 R      AP Chemistry
                                              AP EXAM: AP  25
            FA21 STAT:1020         4.0 R      AP Statistics
                                              AP EXAM: AP  90
          6) ALL TRANSFER COURSES ARE LISTED BELOW
                3.00 semester hours
            Term Course         Credits Grade Crse Title
            FA17 CTCX:T062         3.0 R      Career & Tech Cred
                                              KIRKWOOD: ZCT 016
            ALL TRANSFER WORK FROM 4-YEAR INSTITUTIONS, AND UP 
            TO 60 S.H. FROM 2-YEAR COLLEGES, MAY COUNT AS HOURS
            EARNED TOWARD DEGREE. HOURS EARNED TOWARD DEGREE ARE 
            LISTED BELOW.
                3.00 semester hours
          11) CURRENT REGISTRATION IS BELOW 
            ** IN PROGRESS COURSES ONLY **
               16.00 semester hours
            Term Course         CreditsGrade  Crse Title
            FA23 ARTH:1070         3.0 *   IP Asian Art and Culture
            FA23 CS :2820          4.0 *   IP Intro Software Development
            FA23 CS :3640          3.0 *   IP Intro Networks & Applications
            FA23 CS :4330          3.0 *   IP Theory of Computation
            FA23 JPNS:1506         3.0 *   IP Ghostly Japan
 GENERAL EDUCATION - COMMUNICATION AND LITERACY
 OK
    +       3 S.H. OF DIVERSITY AND INCLUSION HAVE BEEN COMPLETED
            Term Course         Credits Grade Crse Title
            SP23 RELS:1015         3.0 A+     Global Rel Conflict/Diversity
2/8 (ver. 4.5.4.2)                   01451797 - Zhu, Liao                  08/30/23 - 09:59 AM
 GENERAL EDUCATION - COMMUNICATION AND LITERACY
 OK
    +     THE RHETORIC REQUIREMENT HAS BEEN FULFILLED
          TermCourse       Credits GradeCrse Title
          SP22 RHET:1030       4.0 A    Rhetoric
    +     INTERPRETATION OF LITERATURE HAS BEEN COMPLETED
          TermCourse       Credits GradeCrse Title
          FA22 ENGL:1200       3.0 A-   The Interpretation of Lit
          WORLD LANGUAGE REQMT FULFILLED FOR ALL UNDERGRADUATE 
          DEGREES
 GENERAL EDUCATION - NATURAL, QUANTITATIVE, AND SOCIAL SCIENCES
 OK
          NATURAL SCIENCES
    +     7 S.H. OF NATURAL SCIENCE COURSES HAVE BEEN COMPLETED
          TermCourse       Credits GradeCrse Title
          FA21 CHEM:1070       3.0 R    AP Chemistry
                                        AP EXAM: AP 25
          FA21 EES :1030       4.0 A    Introduction to Earth Science
    +     A NATURAL SCIENCES LAB COURSE HAS BEEN COMPLETED
          TermCourse       Credits GradeCrse Title
          FA21 EES :1030       4.0 A    Introduction to Earth Science
    +     3 S.H. OF QUANTITATIVE OR FORMAL REASONING
          HAVE BEEN COMPLETED
          TermCourse       Credits GradeCrse Title
          FA21 CS :1210        4.0 B+   Computer Sci I: Fundamentals
    +     3 S.H. OF SOCIAL SCIENCES HAVE BEEN COMPLETED
          TermCourse       Credits GradeCrse Title
          FA22 ECON:1100       4.0 A    Principles of Microeconomics
 GENERAL EDUCATION - CULTURE, SOCIETY, AND THE ARTS
 NO
    +     3 S.H. OF HISTORICAL PERSPECTIVES HAVE BEEN COMPLETED
          TermCourse       Credits GradeCrse Title
          SP23 MUS :1303       3.0 A    History of Popular Music
    ---   INTERNATIONAL AND GLOBAL ISSUES
          3 S.H. MUST BE COMPLETED
          CLICK TO SEARCH: Approved General Education Courses
    +     3 S.H. OF LITERARY, VISUAL AND PERFORMING ARTS
          HAVE BEEN COMPLETED
3/8 (ver. 4.5.4.2)               01451797 - Zhu, Liao             08/30/23 - 09:59 AM
              Term  Course           Credits Grade     Crse Title
              FA23 ARTH:1070              3.0 *    IP Asian Art and Culture
     +         3 S.H. OF VALUES AND CULTURE HAVE BEEN COMPLETED
              Term  Course           Credits Grade     Crse Title
              FA23 JPNS:1506              3.0 *    IP Ghostly Japan
 THESE COURSES HAVE BEEN APPROVED IN MORE THAN ONE OF 
 THE FOLLOWING GENERAL EDUCATION PROGRAM AREAS:
 - SOCIAL SCIENCES
 - HISTORICAL PERSPECTIVES
 - INTERNATIONAL & GLOBAL ISSUES
 - LITERARY, VISUAL & PERFORMING ARTS
 - VALUES AND CULTURE
     *        HIST PERSPECTIVES or LIT, VISUAL & PERFORMING ARTS
              Term  Course           Credits Grade     Crse Title
              FA23 ARTH:1070              3.0 *    IP Asian Art and Culture
              IF YOU HAVE QUESTIONS ABOUT WHY A COURSE APPEARS IN A 
              SPECIFIC GEP AREA ON THE AUDIT, CONTACT YOUR ADVISOR.
 MAJOR REQUIREMENTS FOR THE BA DEGREE DIFFER FROM 
 THOSE BELOW. CONSULT ADVISOR FOR FURTHER INFORMATION.
              NO MORE THAN 56 S.H. FROM ANY SINGLE DEPARTMENT 
              WILL COUNT TOWARD THE 120 S.H. REQUIRED FOR A
              BA OR BS DEGREE.
 COMPUTER SCIENCE (BS) REQUIREMENTS
 NO
        NOTE TO COMPUTER SCIENCE MAJORS: MAY NOT EARN A SECOND 
        MAJOR OR MINOR IN BUSINESS ANALYTICS AND INFORMATION 
        SYSTEMS, COMPUTER SCIENCE AND ENGINEERING, DATA SCIENCE, 
        OR INFORMATICS.
        CS:4980 IS A REPEATABLE, VARIABLE TOPIC COURSE. STUDENTS
        MAY NOT ENROLL IN THE SAME SUBTITLE MORE THAN ONE TIME FOR 
        CREDIT. CONTACT YOUR ADVISOR FOR MORE INFORMATION.
4/8 (ver. 4.5.4.2)                          01451797 - Zhu, Liao                        08/30/23 - 09:59 AM
     +     1)1ST SEMESTER CALCULUS HAS BEEN COMPLETED
            Term Course         Credits Grade Crse Title
            FA21 MATH:1850         4.0 B+     Calculus I
     +     2)2ND SEMESTER CALCULUS HAS BEEN COMPLETED
            Term Course         Credits Grade Crse Title
            SP22 MATH:1560         4.0 A-     Eng Math II: Multivarbl Calc
     ---   3) THE 8 REQUIRED COURSES BELOW MUST BE COMPLETED
            Term Course         CreditsGrade  Crse Title
            FA21 CS :1210          4.0 B+     Computer Sci I: Fundamentals
            SP22 CS :2210          3.0 A-     Discrete Structures
            SP22 CS :2230          4.0 B+     Computer Sci II: Data Struct
            FA22 CS :2630          4.0 A      Computer Organization
            SP23 CS :3330          3.0 B+     Algorithms
            FA23 CS :2820          4.0 *   IP Intro Software Development
            FA23 CS :3640          3.0 *   IP Intro Networks & Applications
            NEEDS:                     1 course
            SELECT FROM:      CS :3820
     +     4) THE REQUIRED COURSE BELOW HAS BEEN COMPLETED
            Term Course         Credits Grade Crse Title
            FA23 CS :4330          3.0 *   IP Theory of Computation
     +     5)2 MATH ELECTIVES HAVE BEEN COMPLETED
            Term Course         Credits Grade Crse Title
            FA22 MATH:2700         4.0 A+     Intro to Linear Algebra
            SP23 STAT:2020         3.0 A+     Probab & Stats Engr & Phy Sci
     ---   6)4 ADVANCED TECHNICAL COURSES MUST BE COMPLETED, AT
            LEAST 2 OF WHICH MUST BE FROM THE COURSES LISTED 
            BELOW. OTHER COURSES MAY ALSO APPLY; SEE ADVISOR FOR 
            MORE INFORMATION.
            (A COURSE CHOSEN TO FULFILL ONE REQUIREMENT CANNOT BE
            USED TO FULFILL A SECOND; NO MORE THAN 3 S.H. OF
            CS:3990)
            Term Course         Credits Grade Crse Title
            SP23 MATH:3800         3.0 A-     Intro Numerical Methods
            NEEDS:     9.00 hours      3 courses
            NOT FROM:        CS :3910,3980,4310
            SELECT FROM:     CS :3990
                              CS :3620 TO 5899
     ---   7)2 OR MORE COURSES IN A SEQUENCE REQUIRED OF MAJORS IN A
            CHOSEN AREA OF NATURAL SCIENCE MUST BE COMPLETED. CHECK 
            WITH COMPUTER SCIENCE ADVISOR OR UNDERGRADUATE HANDBOOK 
            FOR ACCEPTABLE COURSES.
            Term Course         Credits Grade Crse Title
            FA21 EES :1030         4.0 A      Introduction to Earth Science
5/8 (ver. 4.5.4.2)                   01451797 - Zhu, Liao                  08/30/23 - 09:59 AM
       ---     8)AT LEAST 7 COURSES (MINIMUM OF 21 S.H.)
                OF THE REQUIRED COMPUTER SCIENCE COURSE WORK BELOW
                MUST BE COMPLETED AT THE UNIVERSITY OF IOWA
                Term   Course             Credits  Grade     Crse Title
                FA22   CS  :2630               4.0 A         Computer Organization
                SP23   CS  :3330               3.0 B+        Algorithms
                FA23   CS  :2820               4.0 *      IP Intro Software Development
                FA23   CS  :3640               3.0 *      IP Intro Networks & Applications
                FA23   CS  :4330               3.0 *      IP Theory of Computation
                NEEDS:         4.00 hours           2 courses
                NOT FROM:              CS :3910,3980,4310
                SELECT FROM:            CS :3620 TO 5899
       +       9)A MINIMUM MAJOR GPA OF 2.00 MUST BE MAINTAINED
                 CURRENT MAJOR GPA IS:
                     46.00 semester hours 
                     36.00 GPA hours               132.96points         3.69 GPA
                Term   Course             Credits  Grade     Crse Title
                FA21   CS  :1210               4.0 B+        Computer Sci I: Fundamentals
                FA21   MATH:1850               4.0 B+        Calculus I
                SP22   CS  :2210               3.0 A-        Discrete Structures
                SP22   CS  :2230               4.0 B+        Computer Sci II: Data Struct
                SP22   MATH:1560               4.0 A-        Eng Math II: Multivarbl Calc
                FA22   CS  :2630               4.0 A         Computer Organization
                FA22   MATH:2700               4.0 A+        Intro to Linear Algebra
                SP23   CS  :3330               3.0 B+        Algorithms
                SP23   MATH:3800               3.0 A-        Intro Numerical Methods
                SP23   STAT:2020               3.0 A+        Probab & Stats Engr & Phy Sci
                FA23   CS  :2820               4.0 *      IP Intro Software Development
                FA23   CS  :3640               3.0 *      IP Intro Networks & Applications
                FA23   CS  :4330               3.0 *      IP Theory of Computation
       +      10)A MINIMUM UI MAJOR GPA OF 2.00 MUST BE MAINTAINED
                 CURRENT UI MAJOR GPA IS:
                     46.00 semester hours 
                     36.00 GPA hours               132.96points         3.69 GPA
                Term   Course             Credits  Grade     Crse Title
                FA21   CS  :1210               4.0 B+        Computer   Sci I: Fundamentals
                FA21   MATH:1850               4.0 B+        Calculus   I
                SP22   CS  :2210               3.0 A-        Discrete   Structures
                SP22   CS  :2230               4.0 B+        Computer   Sci II:  Data Struct
                SP22   MATH:1560               4.0 A-        Eng Math   II: Multivarbl Calc
                FA22   CS  :2630               4.0 A         Computer   Organization
                FA22   MATH:2700               4.0 A+        Intro to   Linear Algebra
                SP23   CS  :3330               3.0 B+        Algorithms
                SP23   MATH:3800               3.0 A-        Intro Numerical Methods
                SP23   STAT:2020               3.0 A+        Probab & Stats Engr & Phy Sci
6/8 (ver. 4.5.4.2)                               01451797 - Zhu, Liao                             08/30/23 - 09:59 AM
            FA23 CS  :2820          4.0 *    IPIntro SoftwareDevelopment
            FA23 CS  :3640          3.0 *    IPIntro Networks& Applications
            FA23 CS  :4330          3.0 *    IPTheory of Computation
 COURSE POOL
            THE FOLLOWING UI COURSES COUNT AS ELECTIVES
            Term Course          Credits Grade Crse Title
            FA21 CHIN:1111          5.0 A-     First-Year Chinese: First Sem
            FA21 CSI :1600          0.0 AUS    Success at Iowa
            FA21 HONR:1310          1.0 A      Honors Research FY Seminar
            THE FOLLOWING TRANSFER COURSES COUNT AS ELECTIVES
            Term Course          Credits Grade Crse Title
            FA17 CTCX:T062          3.0 R      Career & Tech Cred
                                               KIRKWOOD: ZCT  016
 This degree audit has been prepared to assist you in determining your academic progress
 at The University of Iowa. While efforts have been made to ensure its accuracy, final
 responsibility for meeting graduation requirements resides with you.
 The Office of the Registrar along with your major department will certify your
 successful completion of degree requirements.
 All 'in progress' (IP) courses must be completed satisfactorily to fulfill requirements.
 Courses taken to remove high school unit deficiencies do not count toward completion of
 the General Education Program, with the exception of Rhetoric and World Languages.
 If you have questions, please contact your advisor immediately.
 Advisor name: Oliveira, Suely
         addr: 101H MLH
        email: suely-oliveira@uiowa.edu
                                ** Placement Tests **
 The results of your placement tests are below. Consult with your academic advisor to
 discuss the most appropriate courses for you.
 TEST NAME                               SCORE TEST DATE RECOMMENDED PLACEMENT
 ALEKS                                   91     05/21/2021 MATH:1350,1380,1460,1550,1850
 Chem Diagnostic Test                    23     05/22/2021 Consult with Advisor
 Chinese Webcape                         0      08/19/2021 CHIN:1111/First-Year Chinese
 MPT Level 3                             19     05/21/2021 MATH:1860
                                ** AP and CLEP **
 For specific information on these tests, see Credit by Exam Options.
 TEST NAME                       SCORE  TEST DATE  CREDIT  EVALUATION
 AP Biology                      3      05/2019    0.0     Score too low
 AP Calculus BC                  3      05/2020    0.0     Score too low
 AP Chemistry                    4      05/2020    3.0     CHEM:1070
 AP Computer Science A           2      05/2019    0.0     Score too low
 AP English Literature           3      05/2021    0.0     Score too low
 AP Human Geography              3      05/2019    0.0     Score too low
 AP Statistics                   4      05/2021    4.0     STAT:1020
     ***** Transfer Course Work, Placement Test Scores and/or UI Additional Credit *****
7/8 (ver. 4.5.4.2)                    01451797 - Zhu, Liao                   08/30/23 - 09:59 AM
 Year-TermInstitution Course       Taken      Grade   Course Title
 FA2017   KIRKWOOD    ZCT  016       3         R      CAREER & TECH CREDIT
 SU2021   PLACEMNT    PLAC 08        19               MPT Level 3
          PLACEMNT    PLAC 14        23               Chem Diagnostic Test
          PLACEMNT    PLAC 19        91               ALEKS
          PLACEMNT    PLAC 20        0                Chinese Webcape
 FA2021   AP EXAM     AP   20        0         3      Biology
          AP EXAM     AP   25        0         4      Chemistry
          AP EXAM     AP   31        0         2      Computer Science A
          AP EXAM     AP   37        0         3      English Literature
          AP EXAM     AP   53        0         3      AP Human Geography
          AP EXAM     AP   68        0         3      Calculus BC
          AP EXAM     AP   90        0         4      Statistics
 ***** End of Transfer Course Work, Placement Test Scores and/or UI Additional Credit *****
                                L E G E N D
 NO = Requirement not complete           >D = Duplicative or regressive course
 OK = Requirement completed              >S = Hours applied to two req.
 IP = Current registration               >X = Second grade only course
 PL = MyPlan Course                      >R = Repeatable course
  R = Mandatory sub-req.                 TRN or TRNX equivalencies are considered
  + = Sub-req. completed or in progress    elective credit but could possibly
  - = Sub-req. not complete                satisfy a General Education Requirement.
 ******* Approved general education courses can be found on MyUI on the Courses tab
                ************************ END OF ANALYSIS ************************
8/8 (ver. 4.5.4.2)                01451797 - Zhu, Liao              08/30/23 - 09:59 AM`;
const sampleResponse = '[ ["INTERNATIONAL AND GLOBAL ISSUES"], [["MATH:1850, MATH:1550"], ["CS:3820"], ["CS:3620", "CS:3640"], ["CS:3700, MATH:3800", ["CS:3990"], ["CS:3620", "CS:5899", "RANGE"]], ["CS:3620", "CS:5899", "RANGE"]] ]';

const sampleDegreeAudit3 =
      `Degree audit:

Zhu, Liao                                                  Program: A22C1BS 
 01451797                                                Catalog Year: FA2021 
                                                     Prepared: 08/30/23 - 09:59 AM
                        The University of Iowa - Iowa City, Iowa
                      COMPUTER SCIENCE (BS) REQUIREMENTS
Advisor name: Oliveira, Suely
       addr: 101H MLH
      email: suely-oliveira@uiowa.edu

 GENERAL EDUCATION - COMMUNICATION AND LITERACY
 OK
    +       3 S.H. OF DIVERSITY AND INCLUSION HAVE BEEN COMPLETED
            Term Course         Credits Grade Crse Title
            SP23 RELS:1015         3.0 A+     Global Rel Conflict/Diversity
2/8 (ver. 4.5.4.2)                   01451797 - Zhu, Liao                  08/30/23 - 09:59 AM
 GENERAL EDUCATION - COMMUNICATION AND LITERACY
 OK
    +     THE RHETORIC REQUIREMENT HAS BEEN FULFILLED
          TermCourse       Credits GradeCrse Title
          SP22 RHET:1030       4.0 A    Rhetoric
    +     INTERPRETATION OF LITERATURE HAS BEEN COMPLETED
          TermCourse       Credits GradeCrse Title
          FA22 ENGL:1200       3.0 A-   The Interpretation of Lit
          WORLD LANGUAGE REQMT FULFILLED FOR ALL UNDERGRADUATE 
          DEGREES
 GENERAL EDUCATION - NATURAL, QUANTITATIVE, AND SOCIAL SCIENCES
 OK
          NATURAL SCIENCES
    +     7 S.H. OF NATURAL SCIENCE COURSES HAVE BEEN COMPLETED
          TermCourse       Credits GradeCrse Title
          FA21 CHEM:1070       3.0 R    AP Chemistry
                                        AP EXAM: AP 25
          FA21 EES :1030       4.0 A    Introduction to Earth Science
    +     A NATURAL SCIENCES LAB COURSE HAS BEEN COMPLETED
          TermCourse       Credits GradeCrse Title
          FA21 EES :1030       4.0 A    Introduction to Earth Science
    +     3 S.H. OF QUANTITATIVE OR FORMAL REASONING
          HAVE BEEN COMPLETED
          TermCourse       Credits GradeCrse Title
          FA21 CS :1210        4.0 B+   Computer Sci I: Fundamentals
    +     3 S.H. OF SOCIAL SCIENCES HAVE BEEN COMPLETED
          TermCourse       Credits GradeCrse Title
          FA22 ECON:1100       4.0 A    Principles of Microeconomics
 GENERAL EDUCATION - CULTURE, SOCIETY, AND THE ARTS
 NO
    +     3 S.H. OF HISTORICAL PERSPECTIVES HAVE BEEN COMPLETED
          TermCourse       Credits GradeCrse Title
          SP23 MUS :1303       3.0 A    History of Popular Music
    ---   INTERNATIONAL AND GLOBAL ISSUES
          3 S.H. MUST BE COMPLETED
          CLICK TO SEARCH: Approved General Education Courses
    +     3 S.H. OF LITERARY, VISUAL AND PERFORMING ARTS
          HAVE BEEN COMPLETED
3/8 (ver. 4.5.4.2)               01451797 - Zhu, Liao             08/30/23 - 09:59 AM
              Term  Course           Credits Grade     Crse Title
              FA23 ARTH:1070              3.0 *    IP Asian Art and Culture
     +         3 S.H. OF VALUES AND CULTURE HAVE BEEN COMPLETED
              Term  Course           Credits Grade     Crse Title
              FA23 JPNS:1506              3.0 *    IP Ghostly Japan
 THESE COURSES HAVE BEEN APPROVED IN MORE THAN ONE OF 
 THE FOLLOWING GENERAL EDUCATION PROGRAM AREAS:
 - SOCIAL SCIENCES
 - HISTORICAL PERSPECTIVES
 - INTERNATIONAL & GLOBAL ISSUES
 - LITERARY, VISUAL & PERFORMING ARTS
 - VALUES AND CULTURE
     *        HIST PERSPECTIVES or LIT, VISUAL & PERFORMING ARTS
              Term  Course           Credits Grade     Crse Title
              FA23 ARTH:1070              3.0 *    IP Asian Art and Culture
              IF YOU HAVE QUESTIONS ABOUT WHY A COURSE APPEARS IN A 
              SPECIFIC GEP AREA ON THE AUDIT, CONTACT YOUR ADVISOR.
 MAJOR REQUIREMENTS FOR THE BA DEGREE DIFFER FROM 
 THOSE BELOW. CONSULT ADVISOR FOR FURTHER INFORMATION.
              NO MORE THAN 56 S.H. FROM ANY SINGLE DEPARTMENT 
              WILL COUNT TOWARD THE 120 S.H. REQUIRED FOR A
              BA OR BS DEGREE.
 COMPUTER SCIENCE (BS) REQUIREMENTS
 NO
        NOTE TO COMPUTER SCIENCE MAJORS: MAY NOT EARN A SECOND 
        MAJOR OR MINOR IN BUSINESS ANALYTICS AND INFORMATION 
        SYSTEMS, COMPUTER SCIENCE AND ENGINEERING, DATA SCIENCE, 
        OR INFORMATICS.
        CS:4980 IS A REPEATABLE, VARIABLE TOPIC COURSE. STUDENTS
        MAY NOT ENROLL IN THE SAME SUBTITLE MORE THAN ONE TIME FOR 
        CREDIT. CONTACT YOUR ADVISOR FOR MORE INFORMATION.
4/8 (ver. 4.5.4.2)                          01451797 - Zhu, Liao                        08/30/23 - 09:59 AM
     +     1)1ST SEMESTER CALCULUS HAS BEEN COMPLETED
            Term Course         Credits Grade Crse Title
            FA21 MATH:1850         4.0 B+     Calculus I
     +     2)2ND SEMESTER CALCULUS HAS BEEN COMPLETED
            Term Course         Credits Grade Crse Title
            SP22 MATH:1560         4.0 A-     Eng Math II: Multivarbl Calc
     ---   3) THE 8 REQUIRED COURSES BELOW MUST BE COMPLETED
            Term Course         CreditsGrade  Crse Title
            FA21 CS :1210          4.0 B+     Computer Sci I: Fundamentals
            SP22 CS :2210          3.0 A-     Discrete Structures
            SP22 CS :2230          4.0 B+     Computer Sci II: Data Struct
            FA22 CS :2630          4.0 A      Computer Organization
            SP23 CS :3330          3.0 B+     Algorithms
            FA23 CS :2820          4.0 *   IP Intro Software Development
            FA23 CS :3640          3.0 *   IP Intro Networks & Applications
            NEEDS:                     1 course
            SELECT FROM:      CS :3820
     +     4) THE REQUIRED COURSE BELOW HAS BEEN COMPLETED
            Term Course         Credits Grade Crse Title
            FA23 CS :4330          3.0 *   IP Theory of Computation
     +     5)2 MATH ELECTIVES HAVE BEEN COMPLETED
            Term Course         Credits Grade Crse Title
            FA22 MATH:2700         4.0 A+     Intro to Linear Algebra
            SP23 STAT:2020         3.0 A+     Probab & Stats Engr & Phy Sci
     ---   6)4 ADVANCED TECHNICAL COURSES MUST BE COMPLETED, AT
            LEAST 2 OF WHICH MUST BE FROM THE COURSES LISTED 
            BELOW. OTHER COURSES MAY ALSO APPLY; SEE ADVISOR FOR 
            MORE INFORMATION.
            (A COURSE CHOSEN TO FULFILL ONE REQUIREMENT CANNOT BE
            USED TO FULFILL A SECOND; NO MORE THAN 3 S.H. OF
            CS:3990)
            Term Course         Credits Grade Crse Title
            SP23 MATH:3800         3.0 A-     Intro Numerical Methods
            NEEDS:     9.00 hours      3 courses
            NOT FROM:        CS :3910,3980,4310
            SELECT FROM:     CS :3990
                              CS :3620 TO 5899
     ---   7)2 OR MORE COURSES IN A SEQUENCE REQUIRED OF MAJORS IN A
            CHOSEN AREA OF NATURAL SCIENCE MUST BE COMPLETED. CHECK 
            WITH COMPUTER SCIENCE ADVISOR OR UNDERGRADUATE HANDBOOK 
            FOR ACCEPTABLE COURSES.
            Term Course         Credits Grade Crse Title
            FA21 EES :1030         4.0 A      Introduction to Earth Science
5/8 (ver. 4.5.4.2)                   01451797 - Zhu, Liao                  08/30/23 - 09:59 AM
       ---     8)AT LEAST 7 COURSES (MINIMUM OF 21 S.H.)
                OF THE REQUIRED COMPUTER SCIENCE COURSE WORK BELOW
                MUST BE COMPLETED AT THE UNIVERSITY OF IOWA
                Term   Course             Credits  Grade     Crse Title
                FA22   CS  :2630               4.0 A         Computer Organization
                SP23   CS  :3330               3.0 B+        Algorithms
                FA23   CS  :2820               4.0 *      IP Intro Software Development
                FA23   CS  :3640               3.0 *      IP Intro Networks & Applications
                FA23   CS  :4330               3.0 *      IP Theory of Computation
                NEEDS:         4.00 hours           2 courses
                NOT FROM:              CS :3910,3980,4310
                SELECT FROM:            CS :3620 TO 5899
       +       9)A MINIMUM MAJOR GPA OF 2.00 MUST BE MAINTAINED
                 CURRENT MAJOR GPA IS:
                     46.00 semester hours 
                     36.00 GPA hours               132.96points         3.69 GPA
                Term   Course             Credits  Grade     Crse Title
                FA21   CS  :1210               4.0 B+        Computer Sci I: Fundamentals
                FA21   MATH:1850               4.0 B+        Calculus I
                SP22   CS  :2210               3.0 A-        Discrete Structures
                SP22   CS  :2230               4.0 B+        Computer Sci II: Data Struct
                SP22   MATH:1560               4.0 A-        Eng Math II: Multivarbl Calc
                FA22   CS  :2630               4.0 A         Computer Organization
                FA22   MATH:2700               4.0 A+        Intro to Linear Algebra
                SP23   CS  :3330               3.0 B+        Algorithms
                SP23   MATH:3800               3.0 A-        Intro Numerical Methods
                SP23   STAT:2020               3.0 A+        Probab & Stats Engr & Phy Sci
                FA23   CS  :2820               4.0 *      IP Intro Software Development
                FA23   CS  :3640               3.0 *      IP Intro Networks & Applications
                FA23   CS  :4330               3.0 *      IP Theory of Computation
       +      10)A MINIMUM UI MAJOR GPA OF 2.00 MUST BE MAINTAINED
                 CURRENT UI MAJOR GPA IS:
                     46.00 semester hours 
                     36.00 GPA hours               132.96points         3.69 GPA
                Term   Course             Credits  Grade     Crse Title
                FA21   CS  :1210               4.0 B+        Computer   Sci I: Fundamentals
                FA21   MATH:1850               4.0 B+        Calculus   I
                SP22   CS  :2210               3.0 A-        Discrete   Structures
                SP22   CS  :2230               4.0 B+        Computer   Sci II:  Data Struct
                SP22   MATH:1560               4.0 A-        Eng Math   II: Multivarbl Calc
                FA22   CS  :2630               4.0 A         Computer   Organization
                FA22   MATH:2700               4.0 A+        Intro to   Linear Algebra
                SP23   CS  :3330               3.0 B+        Algorithms
                SP23   MATH:3800               3.0 A-        Intro Numerical Methods
                SP23   STAT:2020               3.0 A+        Probab & Stats Engr & Phy Sci
`;

const systemProompt1 = `You are a course advisor named Courser. You will be given a student's degree audit and your job is to parse the audit to 
identify all the unfulfilled degree requirements. The unfulfilled degree requirements follow after three dashes (---). 
For any degree audit, there are 3 kinds of unfullfilled requirements: 
(1)  SEMESTER HOUR, GPA, AND RESIDENCE (2) GENERAL EDUCATION (3) MAJOR. 
Your job is to return only the unfulfilled GENERAL EDUCATION and MAJOR requirements in an array of 2 arrays: 
[ [GENERAL EDUCATION REQUIREMENTS], [MAJOR REQUIREMENTS] ]. 
The GENERAL EDUCATION REQUIREMENTS array should just be the missing requirement that follows after the 3 dashes. 
The MAJOR REQUIREMENTS array should contain arrays of courses in the degree audit that follow after "SELECT FROM:" under the unfufilled 
MAJOR REQUIREMENT. If there are multiple choices to fulfill the MAJOR requirement, you should include all of them in the array. If there is a range of choices, 
then you should include only the start and end courses from the range in the array, but the last element of the array should be the string "RANGE".
Therefore, the GENERAL EDUCATION REQUIREMENTS array should only be a 1D array, however the MAJOR requirements array 
could be at most a 3D array if there is a requirement where there are multiple choices and one of the choices is a range. 
So in totality, your output MUST ONLY be an array of 2 arrays. Do not include anything else at all in your output except the array.`

const systemProompt =
      `You are a course advisor named Courser. You will be given a student's degree audit and your job is to parse the audit to 
identify all the unfulfilled degree requirements. The unfulfilled degree requirements follow after three dashes (---). 
Here is a sample degree audit: *START OF SAMPLE DEGREE AUDIT* ${sampleDegreeAudit} *END OF SAMPLE DEGREE AUDIT*. 
For any degree audit, there are 3 kinds of unfullfilled requirements: 
(1)  SEMESTER HOUR, GPA, AND RESIDENCE (2) GENERAL EDUCATION (3) MAJOR. 
Your job is to return only the unfulfilled GENERAL EDUCATION and MAJOR requirements in an array of 2 arrays: 
[ [GENERAL EDUCATION REQUIREMENTS], [MAJOR REQUIREMENTS] ]. 
The GENERAL EDUCATION REQUIREMENTS array should just be the missing requirement that follows after the 3 dashes. 
The MAJOR REQUIREMENTS array should contain arrays of courses in the degree audit that follow after "SELECT FROM:" under the unfufilled 
MAJOR REQUIREMENT. If there are multiple choices to fulfill the MAJOR requirement, you should include all of them in the array. If there is a range of choices, 
then you should include only the start and end courses from the range in the array, but the last element of the array should be the string "RANGE".
Therefore, the GENERAL EDUCATION REQUIREMENTS array should only be a 1D array, however the MAJOR requirements array 
could be at most a 3D array if there is a requirement where there are multiple choices and one of the choices is a range. 
So in totality, your output MUST ONLY be an array of 2 arrays. Do not include anything else at all in your output except the array.
For the sample degree audit, you should return:
${sampleResponse}
`;
const systemProompt0 =
      `You are a course advisor named Courser. You will be given a student's degree audit and your job is to parse the audit to 
identify all the unfulfilled degree requirements. The unfulfilled degree requirements follow after three dashes (---). 
Your job is to return the unfulfilled GENERAL EDUCATION and MAJOR requirements in an array of 2 arrays: 
[ [GENERAL EDUCATION REQUIREMENTS], [MAJOR REQUIREMENTS] ]. 
The GENERAL EDUCATION REQUIREMENTS array should just be the missing requirement that follows after the 3 dashes. 
The MAJOR REQUIREMENTS array should contain arrays of courses in the degree audit that follow after "SELECT FROM:" under the unfufilled 
MAJOR REQUIREMENT. If there are multiple choices to fulfill the MAJOR requirement, you should include all of them in the array. If there is a range of choices, 
then you should include only the start and end courses from the range in the array, but the last element of the array should be the string "RANGE".
Therefore, the GENERAL EDUCATION REQUIREMENTS array should only be a 1D array, however the MAJOR requirements array 
could be at most a 3D array if there is a requirement where there are multiple choices and one of the choices is a range. 
So in totality, your output MUST ONLY be an array of 2 arrays. Do not include anything else at all in your output except the array.
`;


const preProompt = "";

module.exports = Proompter;