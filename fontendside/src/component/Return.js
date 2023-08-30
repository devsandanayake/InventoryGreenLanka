import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Return() {
  const [returnItem, setReturnItem] = useState('');
  const [returnQty, setReturnQty] = useState('');
  const [returnReason, setReturnReason] = useState('');
  const [returnStatus, setReturnStatus] = useState('');
  const [returnApprovedBy, setReturnApprovedBy] = useState('');
  const [issuedDetails, setIssuedDetails] = useState([]);
  const [selectedIssuedDetail, setSelectedIssuedDetail] = useState('');
  const [returnItems, setReturnItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchingIssuedDetails();
    fetchReturnItems();
  }, []);

  const fetchingIssuedDetails = async () => {
    try {
      const IssuedData = await axios.get('http://localhost:8081/issue/show');
      if (IssuedData.data.success) {
        setIssuedDetails(IssuedData.data.issuedItems);
      }
    } catch (error) {
      console.error('Error fetching issued details:', error);
    }
  };

  const fetchReturnItems = async () => {
    try {
      const returnData = await axios.get('http://localhost:8081/return/show');
      if (returnData.data.success) {
        setReturnItems(returnData.data.returnItems);
      }
    } catch (error) {
      console.error('Error fetching return items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handelReturn = async (e) => {
    e.preventDefault();

    try {
      const [itemCode, qty, projectName, issuedDate] = selectedIssuedDetail.split(',');

      const returnData = {
        issuedDetails: {
          itemCode,
          qty,
          projectName,
          issuedDate,
        },
        returnItem,
        returnQty,
        returnReason,
        returnStatus,
        returnApprovedBy,
      };

      const response = await axios.post('http://localhost:8081/return/save', returnData);
      if (response.data.success) {
        alert('Return saved successfully');
        fetchReturnItems(); // Fetch updated list of return items
      } else {
        alert('Return not saved successfully');
      }
    } catch (err) {
      alert('Error saving return:', err);
      console.error('Error saving return:', err);
    }
  };

  return (
    <>
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Return Form</h2>
      <form onSubmit={handelReturn}>
        <div className="mb-4">
          <label htmlFor="issuedDetails" className="block font-medium mb-1">
            Select Issued Details
          </label>
          <select
            id="issuedDetails"
            className="w-full p-2 border rounded-md"
            value={selectedIssuedDetail}
            onChange={(e) => setSelectedIssuedDetail(e.target.value)}
          >
            <option value="">Select Issued Details</option>
            {issuedDetails.map((detail, index) => (
              <option key={index} value={`${detail.itemCode},${detail.qty},${detail.projectName},${detail.issuedDate}`}>
                <p className='b'>ItemCode =</p> {detail.itemCode} ProjectName = {detail.projectName}
              </option>
            ))}
          </select>
        </div>
        
        <input
          type="text"
          placeholder="Return Item"
          className="w-full p-2 border rounded-md mb-2"
          value={returnItem}
          onChange={(e) => setReturnItem(e.target.value)}
        />
        
        <input
          type="number"
          placeholder="Return Qty"
          className="w-full p-2 border rounded-md mb-2"
          value={returnQty}
          onChange={(e) => setReturnQty(e.target.value)}
        />
        
        <input
          type="text"
          placeholder="Return Reason"
          className="w-full p-2 border rounded-md mb-2"
          value={returnReason}
          onChange={(e) => setReturnReason(e.target.value)}
        />
        
        <select
          className="w-full p-2 border rounded-md mb-2"
          value={returnStatus}
          onChange={(e) => setReturnStatus(e.target.value)}
        >
          <option value="">Select Return Status</option>
          <option value="broken">Broken Item</option>
          <option value="Wrong Item">Wrong Item</option>
          <option value="other">Other Reason</option>
        </select>
        
        <input
          type="text"
          placeholder="Return Approved By"
          className="w-full p-2 border rounded-md mb-4"
          value={returnApprovedBy}
          onChange={(e) => setReturnApprovedBy(e.target.value)}
        />
        
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      
     
    </div>
     <div className="mt-6">
     <h2 className="text-xl font-semibold mb-2">Return Items</h2>
     <table className="w-full border-collapse border">
       <thead>
         <tr className="bg-gray-100">
           <th className="border p-2">Return Item</th>
           <th className="border p-2">Return Qty</th>
           <th className="border p-2">Return Reason</th>
           <th className="border p-2">Return Status</th>
           <th className="border p-2">Approved By</th>
           <th className="border p-2">Issued Details</th>
         </tr>
       </thead>
       <tbody>
         {isLoading ? (
           <tr>
             <td colSpan="6" className="text-center py-2">
               Loading...
             </td>
           </tr>
         ) : returnItems.map((item, index) => (
           <tr key={index}>
             <td className="border p-2">{item.returnItem}</td>
             <td className="border p-2">{item.returnQty}</td>
             <td className="border p-2">{item.returnReason}</td>
             <td className="border p-2">{item.returnStatus}</td>
             <td className="border p-2">{item.returnApprovedBy}</td>
             <td className="border p-2">
               {item.issuedDetails && item.issuedDetails.length > 0 ? (
                 <div>
                   {/* Display all associated issued details */}
                   {item.issuedDetails.map((detail, index) => (
                     <div key={index}>
                       <p className="mb-1"><strong>Item Code:</strong> {detail.itemCode}</p>
                       <p className="mb-1"><strong>Project Name:</strong> {detail.projectName}</p>
                       <p className="mb-1"><strong>Issued Quantity:</strong> {detail.qty}</p>
                       <p className="mb-1"><strong>Issued Date:</strong> {detail.issuedDate}</p>
                       {/* Display other issued details fields */}
                     </div>
                   ))}
                 </div>
               ) : (
                 <p>No associated issued details</p>
               )}
             </td>
           </tr>
         ))}
       </tbody>
     </table>
   </div>
   </>
  );
}
