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
  },[]);

    const viewTools = () => {
        axios.get('https://inventorygreenlanka.onrender.com/tools').then((res) => {
            if(res.data.success){
                setTool(res.data.existingTools);
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

    axios.post('http://localhost:8081/tools/save', data).then((res) => {
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
        </div>
        <div className='mt-5'>
            <table className='table-auto w-full'>
                <thead>
                    <tr>
                        <th className='border px-4 py-2'>Index</th>
                        <th className='border px-4 py-2'>Tool Code</th>
                        <th className='border px-4 py-2'>Tool Name</th>
                        <th className='border px-4 py-2'>Quantity</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {tool.map((tool,index)=>(
                        <tr key={index}>
                            <td className='border px-4 py-2' scope="row">{index + 1}</td>
                            <td className='border px-4 py-2 font-bold'>{tool.toolCode}</td>
                            <td className='border px-4 py-2'>{tool.toolName}</td>
                            <td className='border px-4 py-2'>{tool.qty}</td>
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
              type='text'
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
