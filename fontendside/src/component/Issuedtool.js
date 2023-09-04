import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function IssueItems() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [itemCodes, setItemCodes] = useState([]);
  const [issuedDate, setIssuedDate] = useState('');
  const [availableQuantities, setAvailableQuantities] = useState({});

  useEffect(() => {
    fetchItemCodes();
  }, []);

  const fetchItemCodes = async () => {
    try {
      const response = await axios.get('https://inventorygreenlanka.onrender.com/tools'); // Update the URL to match your backend API
      if (response.data.success) {
        const tools = response.data.existingTools;
        setItemCodes(tools);
      }
    } catch (error) {
      console.error('Error fetching item codes:', error);
    }
  };

  const fetchAvailableQuantity = async (toolCode) => {
    try {
      const response = await axios.get(`https://inventorygreenlanka.onrender.com/tools/${toolCode}`); // Update the URL to match your backend API
      if (response.data.success) {
        const newAvailableQuantities = { ...availableQuantities };
        newAvailableQuantities[toolCode] = response.data.post.qty;
        setAvailableQuantities(newAvailableQuantities);
      }
    } catch (error) {
      console.error('Error fetching available quantity:', error);
    }
  };

  const handleAddItem = () => {
    setSelectedItems([...selectedItems, { itemCode: '', quantity: 0 }]);
  };

  const handleItemChange = (index, toolCode) => {
    const updatedItems = [...selectedItems];
    updatedItems[index].itemCode = toolCode;
    setSelectedItems(updatedItems);
    fetchAvailableQuantity(toolCode);
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedItems = [...selectedItems];
    updatedItems[index].quantity = parseInt(quantity);
    setSelectedItems(updatedItems);
  };

  const handleIssue = async () => {
    const toolsToIssue = selectedItems.map((selectedItem) => ({
      toolCode: selectedItem.itemCode,
      qty: selectedItem.quantity,
      projectName: projectName,
      issuedDate: issuedDate,
    }));

    try {
      const response = await axios.post('http://localhost:3000/tools/save', toolsToIssue); // Update the URL to match your backend API
      if (response.data.success) {
        alert('Tools issued successfully');
        // Clear selectedItems array or perform any other necessary action
      }
    } catch (error) {
      console.error('Error issuing tools:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full p-6 bg-white rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Issue Tools for Project</h2>
        {selectedItems.map((selectedItem, index) => (
          <div key={index}>
            <label className="block mb-2">
              Tool Code:
              <select
                className="w-full my-input"
                value={selectedItem.itemCode}
                onChange={(e) => handleItemChange(index, e.target.value)}
              >
                <option value="">Select a tool</option>
                {itemCodes.map((tool) => (
                  <option key={tool._id} value={tool.toolCode}>
                    {tool.toolCode} - {tool.toolName}
                  </option>
                ))}
              </select>
            </label>
            <p>Available Quantity: {availableQuantities[selectedItem.itemCode] || 0}</p>
            <label className="block mb-2">
              Quantity:
              <input
                className="w-full my-input"
                type="number"
                value={selectedItem.quantity}
                onChange={(e) => handleQuantityChange(index, e.target.value)}
              />
            </label>
          </div>
        ))}
        <button className="w-full my-button mb-2" onClick={handleAddItem}>
          Add Tool
        </button>
        <label className="block mb-4">
          Project Name:
          <input
            className="w-full my-input"
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </label>
        <label className="block mb-4">
          Issued Date:
          <input
            className="w-full my-input"
            type="date"
            value={issuedDate}
            onChange={(e) => setIssuedDate(e.target.value)}
          />
        </label>
        <button className="w-full my-button" onClick={handleIssue}>
          Issue Tools
        </button>
      </div>
    </div>
  );
}
