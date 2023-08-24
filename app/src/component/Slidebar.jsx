import React, { useState } from 'react';
import { BsArrowLeftShort } from 'react-icons/bs';
import Tools from './tool';
import Items from './Mtems';
import Project from './project'; // Make sure to adjust the path

export default function App() {
  const [show, setShow] = useState(true);
  const [activeComponent, setActiveComponent] = useState(null);

  const handleComponentChange = (componentName) => {
    setActiveComponent(componentName);
  };

  return (
    <div className='flex'>
      <div
        className={`bg-black h-screen p-5 pt-8  ${show ? 'w-72' : 'w-20'} relative`}
      >
        <BsArrowLeftShort
          className={`text-green-500 bg-white text-3xl rounded-full absolute -right-3 top-9
            border border-amber-900 cursor-pointer ${
              !show && 'rotate-180'
            }`}
          onClick={() => setShow(!show)}
        />

        <div className='inline-flex'>
          <img
            src='https://i.ibb.co/0s3pdnc/Logo.png'
            alt='Logo'
            border='0'
            className={`w-10 h-10 rounded-full cursor-pointer float-left mr-3 duration-500 ${
              show && 'rotate-[360deg]'
            }`}
          />
          <h1
            className={`text-white text-2xl font-semibold ${
              !show && 'scale-0'
            }`}
          >
            GLEE Admin
          </h1>
        </div>
        <button className={` ${show ?  "w-60" : "w-10" }`} onClick={() => handleComponentChange('tools')}>
          <div className='flex items-center rounded-md bg-lime-100 mt-2'>
            <div className='p-2'>Tools</div>
          </div>
        </button>

        <button className={` ${show ?  "w-60" : "w-10" }`} onClick={() => handleComponentChange('mitem')}>
          <div className='flex items-center rounded-md bg-lime-100 mt-2'>
            <div className='p-2'>Move Items</div>
          </div>
        </button>

        <button className={` ${show ?  "w-60" : "w-10" }`} onClick={() => handleComponentChange('project')}>
          <div className='flex items-center rounded-md bg-lime-100 mt-2'>
            <div className='p-2'>Projects</div>
          </div>
        </button>

      
      </div>

      <div className={`p-7 ${activeComponent === 'tools' ? 'block' : 'hidden'}`}>
        <Tools />
      </div>

      <div className={`p-7 ${activeComponent === 'mitem' ? 'block' : 'hidden'}`}>
        <Items/>
      </div>

      <div className={`p-7 ${activeComponent === 'project' ? 'block' : 'hidden'}`}>
        <Project/>
      </div>
    </div>
  );
}
