import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
export default function Tool() {
  const [formData, setFormData] = useState({
    toolCode: '',
    toolName: '',
    qty: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
   
  const [tool, setTool] = useState([])

  useEffect(() => {
     viewTools();
  });

    const viewTools = () => {
        axios.get('https://inventorygreenlanka.onrender.com/tools').then((res) => {
            if(res.data.success){
                setTool(res.data.tools);
                console.log(tool);
            }
        });
    }

  const functionopenpopup = () => {
    setOpen(true);
  };

  const closepopup = () => {
    setOpen(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { toolCode, toolName, qty } = formData;

    const data = {
      toolCode: toolCode,
      toolName: toolName,
      qty: qty,
    };

    axios.post('https://inventorygreenlanka.onrender.com/tools/save', data).then((res) => {
      if (res.data.success) {
        setFormData({
          toolCode: '',
          toolName: '',
          qty: '',
        });

        viewTools();
      }
    });

  
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='text-5xl font-bold'>Tool</div>
      <div className='mt-5'>
        <div className='flex gap-3'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={functionopenpopup}
          >
            Add Tool
          </button>
          <button>
              <Link
              to='/Updatetool' // Navigate to the StockUpdate component
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            >
            Stock Update</Link>
          </button>

          {/* <button>
              <Link
              to='/M' // Navigate to the StockUpdate component
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            >
            Issue Tools</Link>
          </button>
          <button>
              <Link
              to='/View' // Navigate to the StockUpdate component
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            >
            View Issue Tools details</Link>
          </button> */}
        </div>
        <div className='mt-5'>
        <table className="table-auto w-full border border-gray-300">
  <thead>
    <tr className="bg-blue-200">
      <th className="border px-4 py-2 text-2xl">Index</th>
      <th className="border px-4 py-2 text-2xl">Tool Code</th>
      <th className="border px-4 py-2 text-2xl">Tool Name</th>
      <th className="border px-4 py-2 text-2xl">Quantity</th>
    </tr>
  </thead>
  <tbody>
    {tool.map((tool, index) => (
      <tr
        key={index}
        className={index % 2 === 0 ? 'bg-white' : 'bg-blue-200'}
      >
        <td className="border px-4 py-2">{index + 1}</td>
        <td className="border px-4 py-2 font-bold text-2xl">{tool.toolCode}</td>
        <td className="border px-4 py-2 text-2xl">{tool.toolName}</td>
        <td className="border px-4 py-2 text-2xl">{tool.qty}</td>
      </tr>
    ))}
  </tbody>
</table>

</div>
      </div>

      {/*Dialog Box */}
      <Dialog open={open} onClose={closepopup} aria-labelledby='form-dialog-title'>
        <DialogTitle
          style={{
            backgroundColor: '#2ecc71',
            color: '#ffffff',
            textAlign: 'center',
            fontSize: '26px',
            fontWeight: 'bold',
          }}
        >
          Add Tool
          <IconButton onClick={closepopup} style={{ position: 'absolute', top: 10, right: 10 }}>
            <CloseIcon style={{ color: '#ffffff' }} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form>
            <input
              type='text'
              placeholder='Tool Code'
              className='border-2 border-gray-300 p-2 w-full mt-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200'
              value={formData.toolCode}
              onChange={handleInputChange}
              name='toolCode'
            />
            <input
              type='text'
              placeholder='Tool Name'
              value={formData.toolName}
              onChange={handleInputChange}
              className='border-2 border-gray-300 p-2 w-full mt-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200'
              name='toolName'
            />
            <input
              type='Number'
              placeholder='Tool Quantity'
              value={formData.qty}
              onChange={handleInputChange}
              className='border-2 border-gray-300 p-2 w-full mt-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200'
              name='qty'
            />
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3'
              onClick={onSubmit}
            >
              Add Tool
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
