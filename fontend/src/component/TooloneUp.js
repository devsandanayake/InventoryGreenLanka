import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function RepairEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [updatedPost, setUpdatedPost] = useState({
    toolCode: "",
    toolName: "",
    qty: "",
  });

  useEffect(() => {
    axios.get(`https://inventorygreenlanka.onrender.com/tools/${id}`).then((res) => {
      if (res.data.success) {
        setPost(res.data.post);
        setUpdatedPost({
          toolCode: res.data.post.toolCode,
          toolName: res.data.post.toolName,
          qty: res.data.post.qty,
        });
      }
    });
  }, [id]);

  const { toolCode, toolName, qty } = updatedPost;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPost({
      ...updatedPost,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const data = {
      toolCode: updatedPost.toolCode,
      toolName: updatedPost.toolName,
      qty: updatedPost.qty,
    };

    axios.put(`https://inventorygreenlanka.onrender.com/tool/update/${id}`, data).then((res) => {
      console.log(res.data);
      alert('Post updated successfully!');
      setUpdatedPost({
        toolCode: "",
        toolName: "",
        qty: "",
      });
      navigate('/');
    });
  };

  return (
    <div className='mt-5'>
      <h2 className='text-xl font-semibold mb-2'>Edit Tool</h2>
      <form onSubmit={handleFormSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Tool Code</label>
          <input
            type='text'
            className='border rounded w-full py-2 px-3'
            name='toolCode'
            value={toolCode}
            onChange={handleInputChange}
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Tool Name</label>
          <input
            type='text'
            className='border rounded w-full py-2 px-3'
            name='toolName'
            value={toolName}
            onChange={handleInputChange}
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Quantity</label>
          <input
            type='number'
            className='border rounded w-full py-2 px-3'
            name='qty'
            value={qty}
            onChange={handleInputChange}
          />
        </div>

        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          <i className='far fa-check-square'></i>&nbsp;Update
        </button>
      </form>
    </div>
  );
}
