import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
 
export default function Updatemoveitems() {
 
   
  const [tool, setTool] = useState([])

  useEffect(() => {
     viewTools();
  });

    const viewTools = () => {
        axios.get('https://inventorygreenlanka.onrender.com/items').then((res) => {
            if(res.data.success){
                setTool(res.data.items);
                console.log(tool);
            }
        });
    }

 
  
  //delete function
  const Tooldelete = (id)=>{
    axios.delete(`https://inventorygreenlanka.onrender.com/items/delete/${id}`).then((res)=>{
      alert("Deleted");
      viewTools();
    })
  }
  
  
 

  return (
    <>
   
      <div className='text-5xl font-bold text-center'>Move Items Update Page</div>
  
        <div className='mt-5'>
            <table className='table-auto w-full'>
                <thead>
                    <tr>
                        <th className='border px-4 py-2'>Index</th>
                        <th className='border px-4 py-2'>Move Item Code</th>
                        <th className='border px-4 py-2'>Move Item Name</th>
                        <th className='border px-4 py-2'>Quantity</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {tool.map((tool,index)=>(
                        <tr key={index}>
                            <td className='border px-4 py-2'>{index + 1}</td>
                            <td className='border px-4 py-2 font-bold'>{tool.itemCode}</td>
                            <td className='border px-4 py-2'>{tool.itemName}</td>
                            <td className='border px-4 py-2'>{tool.qty}</td>
                            <td>
                       <a className='bg-yellow-500' href={`/MoveUp/${tool._id}`}>
                         <i className="fas fa-edit"></i>&nbsp;Edit
                       </a>
                       &nbsp; &nbsp; 
                       <button className="bg-red-500"  onClick={()=>Tooldelete(tool._id)}>
                         <i className="fas fa-tash-altt"></i>&nbsp;Delete
                       </button>
                   </td>
                           </tr>

                    ))}
                </tbody>
                
</table>

</div>
      <div className='mt-5 ml-5'>
        <div className='flex gap-3'>    
        <button >
        <Link
              to='/'  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            
            Exit Dashboard</Link>
            </button>
        </div>
        </div>

     
    </>
  );
                    }