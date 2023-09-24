'use client'

// pages/client-rendered-page.js
import React, { useState, useEffect, useRef } from 'react'
import { Loader } from './Loader';
import { Plan } from './Plan';

const TESTING = true;

function deleteAuthToken() {
    window.localStorage.removeItem("courser-auth");
  }
  
const getUserAuthToken = () => {
    return window.localStorage.getItem('courser-auth') || '';
}

const constants = {
  url: TESTING ? "http://localhost:8000" : "https://uiowa-courser-production.up.railway.app",
};




const dummyData = {
  plans: [
    {courses: [ 
      {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
      {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
      {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
      {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
    ]},
    {courses: [ 
      {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
      {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
      {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
      {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
      {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
    ]},
    {courses: [ 
      {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
      {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
      {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
      {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
    ]},
  ],
}
const dummyDataq = {
  plans: [
    {courses: [ 
      {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
      {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
      {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
      {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
    ]},
    {courses: [ 
      {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
      {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
      {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
      {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
      {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
    ]},
    {courses: [ 
      {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
      {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
      {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
      {ID: "CS:2450", title: "Discrete Math", instructor: "elizabeth kleiman", time: "9 AM MWF"},
    ]},
  ],
}

const dummy = {"type": "AI", "plans": dummyData.plans, "text": "", "startText": "We thought theses courses would fit well for you next semester", "endText": "Do you have any suggestions to this list" }




const messagesHook = () => {
  const [messages, setMessages] = useState([]);

  const addMessage = async (messagesArr, scrollToBottom) => {
    var state = [ ...messages];
    for (let first of messagesArr) {
        if (first.type !== "AI") {
          setMessages([...state, first]);
          state = [...state, first]
        } else {
          const order = ["startText", "text", "plans", "endText"];
          const nxt = {"type": "AI", "plans": [], "text": "", "startText": "", "endText": ""}
          while (order.length > 0) {
            const key = order.shift();
            if (key === "plans") {
              const plans = first[key];
              const totalPlans = [];
              while (plans.length > 0) {
                const nextPlan = plans.shift();
                const newPlans = [];
                while (nextPlan.courses.length > 0) {
                  const nextCourse = nextPlan.courses.shift();
                  newPlans.push(nextCourse);
                  setMessages([...state, {...nxt, "plans": [...totalPlans, {"courses": [...newPlans]}]}]);
                  await sleep(200);
                }
                totalPlans.push({"courses": [...newPlans]});
                nxt["plans"] = [...totalPlans];
              }
            } else {
              while (first[key].length > 0) {
                const nextCharacter = first[key][0];
                first[key] = first[key].slice(1);
                nxt[key] += nextCharacter;
                setMessages([...state, {...nxt}]);
                await sleep(20);
              }
            }
          }
      }
    }
    scrollToBottom();
  }
  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  return [messages, addMessage];
}

export function Main() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, addMessage] = messagesHook();
  const myRef = useRef(null);


  const scrollToBottom = () => {
    if (myRef.current) {
      myRef.current.scrollTo({
        top: myRef.current.scrollHeight,
        behavior: 'smooth', // Add smooth scrolling behavior
      });
    }
  };

  const sendNextQuestion = async (nextQuestion) => {
    scrollToBottom();
    var previous = '';
    try {
      previous = JSON.stringify(messages[messages.length - 1].plans);
    } catch (e) {
      console.log(e);
    }
    console.log(previous)
    const nxtValue = {"type": "human", "text": nextQuestion}
    var requirerments = nextQuestion
    for (let message of messages) {
      if (message.type !== "AI") {
        requirerments = requirerments + ', ' + message.text;
      }
    } 
    console.log('a');
    console.log(requirerments);
    const scrollToBottomAfterTimeout = async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
      scrollToBottom();
    }
    addMessage([{...nxtValue}], scrollToBottomAfterTimeout);
    const data = new FormData();
    data.append('file', file);
    data.append('requirerments', requirerments);
    data.append('previous', previous);
    const response = await fetch(`${constants.url}/updateAgain`, {
        method: 'POST',
        body: data,
    }); 
    const res = await response.json();
    await new Promise(resolve => setTimeout(resolve, 100));
    scrollToBottomAfterTimeout();
    addMessage([{...nxtValue}, {"type": "AI", "plans": res.plans, "text": "", "startText": "Here is a revised set of courses", "endText": "Does this meet your expectations better?" }], scrollToBottom);
  }

  async function handleFileUpload(e) {
    const file = e.target.files[0];
    setFile(file);
    setIsLoading(true);
    const data = new FormData();
    data.append('file', file);
    const response = await fetch(`${constants.url}/upload`, {
        method: 'POST',
        body: data,
    }); 
    const res = await response.json();
    console.log(res);
    setIsLoading(false);
    addMessage([{"type": "AI", "plans": res.plans, "text": "", "startText": "We thought theses courses would fit well for you next semester", "endText": "Do you have any suggestions to this list" }], scrollToBottom);
  }

  if (isLoading) return <Loader />;
  
  if (messages.length > 0) {
   return (
    <div className="py-8 h-[90%]">
      <div  className="mx-auto max-w-7xl h-full flex flex-col items-center justify-between">
        <div style={{
          alignItems: 'center',
          flexDirection: 'column',
          display: 'flex',
          justifyContent: 'flex-start',
        }} 
        ref={myRef}
        className='w-full flex-col items-center justify-center h-[80%] overflow-auto'>
        {messages.map((plan, i) => {
          return (<Plan plan={plan} key={i}/>)
          })}
        </div>
        <CommentForm sendNextQuestion={sendNextQuestion}/>
      </div>
    </div>
   )}
  return (

    <div className="py-10 h-[90%]">
    <header>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Get Started With Courser</h1>  
      </div>
    </header>
    <main className='h-full'>
      <div className="mx-auto max-w-7xl h-full">
      <div className="w-full h-[70%] flex flex-col items-center justify-center">
        <input type="file" id="fileInput" hidden onChange={handleFileUpload}  />
      <label 
        type="button" 
        htmlFor="fileInput"
        className="relative block w-[600px] rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 hover:cursor-pointer"
      >
        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6" />
        </svg>
        <span className="mt-2 block text-sm font-semibold text-gray-900">
          Upload your Degree Audit
        </span>
      </label>
        </div>
      </div>
    </main>
  </div>

);
}


function CommentForm({sendNextQuestion}) {
  const [nextQuestion, setNextQuestion] = useState('');
  const send = () => {
    sendNextQuestion(nextQuestion);
    setNextQuestion('');
  }
  return (
    <div className="flex items-start space-x-4 w-[600px]">
      <div className="min-w-0 flex-1">
        <div>
          <div className="border-b border-gray-200 focus-within:border-iowaYellow-600">
            <textarea 
              rows={1}
              value={nextQuestion}
              onChange={(e) => setNextQuestion(e.target.value)}
              className="block w-full resize-none border-0 border-b border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-iowaYellow-600 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="What are your thoughts..."
            ></textarea>
          </div>
          
          <div className="flex justify-end pt-2">            
            <button
              className="inline-flex items-center rounded-md bg-iowaYellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-iowaYellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-iowaYellow-600"
              onClick={send}
            >
              Follow-up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
