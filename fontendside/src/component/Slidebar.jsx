import React, { useState } from 'react';
import Home from './Home'; 
import Tools from './tool';
import Items from './Mtems';
import Project from './project'; // Make sure to adjust the path
import img from "../img/Borcelle.png"
import logo from "../img/GLEE_Logo.jpg"
import {BsTools} from 'react-icons/bs';
import {FaToolbox} from 'react-icons/fa'
import Return from './Return';
import IssueTool from "./IssueTools"
import ViewIssue from "./ViewIssuedTools"
import IssueItems from "./IssueItems"
import {AiFillBug, AiFillProfile ,  AiOutlineHome, AiOutlineLogout} from 'react-icons/ai'
export default function Slidebar({ onLogout }) {
  
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
        className="bg-black h-screen p-5 pt-8 w-72 fixed top-0 left-0 overflow-y-auto "
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
        <button className="w-60" onClick={handleSlideBack}>
          <div className='flex items-center rounded-md bg-yellow-800 mt-2'>
          <div className='flex p-2 text-2xl'><AiOutlineHome className='mr-3 text-2xl'/>Home</div>
          </div>
        </button>
        
        <button className="w-60" onClick={() => handleComponentChange('tools')}>
          <div className='flex items-center rounded-md bg-blue-900 mt-2'>
            <div className="flex p-2 text-2xl"><BsTools className='mr-3 text-2xl'/>Tools</div>
          </div>
        </button>
        <div className='bg-white w-2  ml-9 mt-2 py-10 absolute'></div>
       <button className="w-44 ml-14" onClick={() => handleComponentChange('issuetools')}>
          <div className='flex items-center rounded-md bg-blue-400 mt-2'>
            <div className="flex p-2 text-sm font-extrabold"><BsTools className='mr-3'/>Issue Tools</div>
          </div>
        </button>

        <button className="w-44 ml-14 mb-10" onClick={() => handleComponentChange('viewissuetools')}>
          <div className='flex items-center rounded-md bg-blue-400 mt-2'>
            <div className="flex p-2 text-sm font-extrabold"><BsTools className='mr-3 '/>View Issue Details</div>
          </div>
        </button>

        <button className="w-60" onClick={() => handleComponentChange('mitem')}>
          <div className='flex items-center rounded-md bg-green-800 mt-2'>
            <div className='flex p-2 text-2xl'><FaToolbox className='mr-3 text-2xl'/>Move Items</div>
          </div>
        </button>
        <div className='bg-white w-2  ml-9 mt-2 py-16 absolute'></div>
        <button className="w-44 ml-14" onClick={() => handleComponentChange('issueitems')}>
          <div className='flex items-center rounded-md bg-green-400 mt-2'>
            <div className="flex p-2 text-sm font-extrabold"><FaToolbox className='mr-3'/>Issue Items</div>
          </div>
        </button>

        <button className="w-44 ml-14" onClick={() => handleComponentChange('project')}>
          <div className='flex items-center rounded-md bg-blue-600 mt-2'>
          <div className='flex p-2 text-sm font-extrabold'><AiFillProfile className='mr-3'/>Projects</div>
          </div>
        </button>

        <button className="w-44 ml-14" onClick={() => handleComponentChange('returnItem')}>
          <div className='flex items-center rounded-md bg-pink-600 mt-2'>
          <div className='flex p-2 text-sm font-extrabold'><AiFillBug className='mr-3'/>Return Items</div>
          </div>
        </button>

      
        <button  onClick={onLogout} className='ml-16 mt-16'>
        <div className='flex items-center rounded-md bg-red-500 mt-2'>
          <div className='flex p-2 font-bold text-2xl'><AiOutlineLogout className='mr-3 text-2xl'/>Logout</div>
          </div>
        </button>
      
      </div>

      <div className={` p-9 ml-80 ${activeComponent ? 'block' : 'hidden'}`}>
        {activeComponent === 'tools' && <Tools />}
        {activeComponent === 'issuetools' && <IssueTool />}
        {activeComponent === 'viewissuetools' && <ViewIssue />}
        {activeComponent === 'mitem' && <Items />}
        {activeComponent === 'issueitems' && <IssueItems />}
        {activeComponent === 'project' && <Project />}
        {activeComponent === 'returnItem' && <Return />}
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
