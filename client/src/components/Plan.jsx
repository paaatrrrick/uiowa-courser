import React from 'react';

// const dummyData = {
//     plans: [
//       {courses: [ 
//         {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
//         {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
//         {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
//         {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
//       ]},
//       {courses: [ 
//         {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
//         {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
//         {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
//         {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
//         {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
//       ]},
//       {courses: [ 
//         {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
//         {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
//         {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
//         {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
//       ]},
//     ],
//   }
  
//   const plan = {"type": "AI", "plans": dummyData.plans, "text": "", "startText": "We thought theses courses would fit well for you next semester", "endText": "Do you have any suggestions to this list" }
//setPlans([{"type": "AI", "plans": res.courses, "text": "", "startText": "We thought theses courses would fit well for you next semester", "endText": "Do you have any suggestions to this list" }]);

export function Plan({ plan }) {
  const {plans, startText, endText, text, type} = plan;
  if (type == "AI") {
    return (
      <div className='planContainer'>
          {startText && <p className='pt-4'>{startText}</p>}
          {text && <p className='pt-4'>{text}</p>}
          {plans.map((courses, i) => (
          <div key={i} className='PeopleListParent'>
            <h4 className='pt-12 font-semibold text-lg'>Course option #{i + 1}</h4>
            <PeopleList people={courses.courses} key={i}/>
          </div>
          ))}
          {endText && <p className='pt-8'>{endText}</p>}
      </div>
      )
  }
  return (
    <div className="humanAnswer">
      <p>{text}</p>
    </div>
  )
}



const PeopleList = ({ people }) => {
  return (
    <div className="w-[100%] min-w-15">
      <div className="mt-8 flow-root">
        <div className="-my-2 overflow-x-auto">
          <div className="inline-block min-w-full pb-2 align-middle">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">Course Title</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Instructor</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Times</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">CourseID</th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {people.map((person, i) => (
                  <tr className="even:bg-gray-50" key={i}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                      {person.title}
                    </td>

                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.instructor}  
                    </td>

                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.time}
                    </td>

                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.ID}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PeopleList;