'use client'

// pages/client-rendered-page.js
import React, { useState, useEffect } from 'react'
import { Loader } from './Loader';

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




export { constants, getUserAuthToken, deleteAuthToken };


export function Main() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  async function handleFileUpload(e) {
    const file = e.target.files[0];
    console.log(file);
    setFile(file);
    setIsLoading(true);
  
    const data = new FormData();
    data.append('file', file);
    console.log(`${constants.url}/upload`)
    console.log(data);
    const response = await fetch(`${constants.url}/upload`, {
        method: 'POST',
        body: data,
    }); 
    data2 = await response.json();
    console.log(data);
  }

  if (isLoading) return <Loader />;

  return (
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
);
}
