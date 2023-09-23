'use client'

// pages/client-rendered-page.js

import React from 'react';
import logo from '@/images/logo192.png'
import Image from 'next/image';
import Link from 'next/link'
import { Main } from '@/components/Main'
import { NavLink } from '@/components/NavLink'
import { Button } from '@/components/Button'
import { useClient } from 'next/navigation'

function Home() {
  return (
    <div className="min-h-full">
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
              <Link href="/">
                <Image 
                  className="block h-8 w-auto lg:hidden"
                  src={logo}
                  alt="Your Company" 
                />
                <Image
                  className="hidden h-8 w-auto lg:block"
                  src={logo}
                  alt="Your Company"
                />
                </Link>
              </div>
              <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                <a href="#" className="border-iowaYellow-500 text-gray-900 inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium" aria-current="page">Dashboard</a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium">Team</a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium">Projects</a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium">Calendar</a>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
            </div>
          </div>
        </div>
      </nav>

      <div className="py-10 h-full">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Get Started With Courser</h1>  
          </div>
        </header>
        <main className='h-full'>
          <div className="mx-auto max-w-7xl h-full">
            <Main/>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;