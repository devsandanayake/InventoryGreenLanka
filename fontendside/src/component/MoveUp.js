import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function MoveUp() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [updatedPost, setUpdatedPost] = useState({
    itemCode: "",
    itemName: "",
    qty: "",
  });

  useEffect(() => {
    axios.get(`https://inventorygreenlanka.onrender.com/item/view/${id}`).then((res) => {
      if (res.data.success) {
        setPost(res.data.post);
        setUpdatedPost({
          itemCode: res.data.post.itemCode,
          itemName: res.data.post.itemName,
          qty: res.data.post.qty,
        });
      }
    });
  }, [id]);

  const { itemCode, itemName, qty } = updatedPost;

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
      itemCode: updatedPost.itemCode,
      itemName: updatedPost.itemName,
      qty: updatedPost.qty,
    };

    axios.put(`https://inventorygreenlanka.onrender.com/items/${id}`, data).then((res) => {
      console.log(res.data);
      alert('Post updated successfully!');
      setUpdatedPost({
        itemCode: "",
        itemName: "",
        qty: "",
      });
      navigate('/Updatemoveitems');
    });
  };

  return (
    <div className='mt-5'>
      <h2 className='text-xl font-semibold mb-2'>Edit Move Item</h2>
      <form onSubmit={handleFormSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>item Code</label>
          <input
            type='text'
            className='border rounded w-full py-2 px-3'
            name='itemCode'
            value={itemCode}
            onChange={handleInputChange}
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>item Name</label>
          <input
            type='text'
            className='border rounded w-full py-2 px-3'
            name='itemName'
            value={itemName}
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
