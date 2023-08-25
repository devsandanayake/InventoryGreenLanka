import React, { useState } from 'react';
import Home from './Home'; 
import Tools from './tool';
import Items from './Mtems';
import Project from './project'; // Make sure to adjust the path
import img from "../img/Borcelle.png"
import logo from "../img/GLEE_Logo.jpg"
import {BsTools} from 'react-icons/bs';
import {FaToolbox} from 'react-icons/fa'
import {AiFillProfile , AiOutlineHome} from 'react-icons/ai'
export default function App() {
  
  const [activeComponent, setActiveComponent] = useState(null);

  const handleComponentChange = (componentName) => {
    setActiveComponent(componentName);
  };

  const handleSlideBack = () => {
    setActiveComponent(null); // Reset active component to null
  };

  return (
    <div className='flex'>
      <div
        className="bg-black h-screen p-5 pt-8 w-72 fixed"
      >
        

        <div className='inline-flex'>
          <img
            src= {logo}
            alt='Logo'
            border='0'
            className="w-10 h-10 rounded-full cursor-pointer float-left mr-3 duration-500 "  />
          <h1
            className="text-white text-2xl font-semibold ">
            GLEE Admin
          </h1>
        </div>
        <button className="w-60" onClick={() => handleComponentChange('tools')}>
          <div className='flex items-center rounded-md bg-blue-900 mt-2'>
            <div className="flex p-2"><BsTools className='mr-3 text-xl'/>Tools</div>
          </div>
        </button>

        <button className="w-60" onClick={() => handleComponentChange('mitem')}>
          <div className='flex items-center rounded-md bg-green-800 mt-2'>
            <div className='flex p-2'><FaToolbox className='mr-3 text-xl'/>Move Items</div>
          </div>
        </button>

        <button className="w-60" onClick={() => handleComponentChange('project')}>
          <div className='flex items-center rounded-md bg-red-600 mt-2'>
          <div className='flex p-2'><AiFillProfile className='mr-3 text-xl'/>Projects</div>
          </div>
        </button>

        <button className="w-60" onClick={handleSlideBack}>
          <div className='flex items-center rounded-md bg-yellow-800 mt-2'>
          <div className='flex p-2'><AiOutlineHome className='mr-3 text-xl'/>Home</div>
          </div>
        </button>

      
      </div>

      <div className={` p-9 ml-80 ${activeComponent ? 'block' : 'hidden'}`}>
        {activeComponent === 'tools' && <Tools />}
        {activeComponent === 'mitem' && <Items />}
        {activeComponent === 'project' && <Project />}
      </div>

      <div className={`p-7 ml-80 ${!activeComponent ? 'block' : 'hidden'}`}> <Home/>
        {/* This is the content of the home page with the background text */}
        <div className="text-black text-center">
        <img  className="h-screen" alt='hone' src={img}></img>
         
        </div>
      </div>
      
    </div>
  );
}
