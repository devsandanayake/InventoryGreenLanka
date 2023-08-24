import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
export default function Mtems() {
  const [formData, setFormData] = useState({
    itemCode: '',
    itemName: '',
    qty: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
   
  const [items, setTool] = useState([])

  useEffect(() => {
     viewTools();
  },[]);

    const viewTools = () => {
        axios.get('http://localhost:8081/items').then((res) => {
            if(res.data.success){
                setTool(res.data.items);
                console.log(items);
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

    const { itemCode, itemName, qty } = formData;

    const data = {
      itemCode: itemCode,
      itemName: itemName,
      qty: qty,
    };

    axios.post('http://localhost:8081/items/save', data).then((res) => {
      if (res.data.success) {
        setFormData({
          itemCode: '',
          itemName: '',
          qty: '',
        });

        viewTools();
      }
    });

  
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='text-5xl font-bold'>Move Items</div>
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
          <button>
              <Link
              to='/IssueItems' // Navigate to the StockUpdate component
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            >
            Issue Items</Link>
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
                    {items.map((item,index)=>(
                        <tr key={index}>
                            <td className='border px-4 py-2' scope="row">{index + 1}</td>
                            <td className='border px-4 py-2 font-bold'>{item.itemCode}</td>
                            <td className='border px-4 py-2'>{item.itemName}</td>
                            <td className='border px-4 py-2'>{item.qty}</td>
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
              value={formData.itemCode}
              onChange={handleInputChange}
              name='itemCode'
            />
            <input
              type='text'
              placeholder='Tool Name'
              value={formData.itemName}
              onChange={handleInputChange}
              className='border-2 border-gray-300 p-2 w-full mt-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200'
              name='itemName'
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
