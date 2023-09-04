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
            const response = await axios.get('https://inventorygreenlanka.onrender.com/items');
            if (response.data.success) {
                const items = response.data.items;
                setItemCodes(items);
            }
        } catch (error) {
            console.error('Error fetching item codes:', error);
        }
    };
    

    const fetchAvailableQuantity = async (itemCode) => {
        try {
            const response = await axios.get(`https://inventorygreenlanka.onrender.com/items/${itemCode}`);
            if (response.data.success) {
                const newAvailableQuantities = { ...availableQuantities };
                newAvailableQuantities[itemCode] = response.data.item.qty;
                setAvailableQuantities(newAvailableQuantities);
            }
        } catch (error) {
            console.error('Error fetching available quantity:', error);
        }
    };

    const handleAddItem = () => {
        setSelectedItems([...selectedItems, { itemCode: '', quantity: 0 }]);
    };

    const handleItemChange = (index, itemCode) => {
        const updatedItems = [...selectedItems];
        updatedItems[index].itemCode = itemCode;
        setSelectedItems(updatedItems);
        fetchAvailableQuantity(itemCode);
    };

    const handleQuantityChange = (index, quantity) => {
        const updatedItems = [...selectedItems];
        updatedItems[index].quantity = parseInt(quantity);
        setSelectedItems(updatedItems);
    };

    const handleIssue = async () => {
        const itemsToIssue = selectedItems.map((item) => ({
            itemCode: item.itemCode,
            qty: item.quantity,
            projectName: projectName,
            issuedDate: issuedDate,
        }));

        try {
            const response = await axios.post('https://inventorygreenlanka.onrender.com/items/issue', itemsToIssue);
            if (response.data.success) {
                alert('Items issued successfully');
                // Clear selectedItems array or perform any other necessary action
                setSelectedItems([]);
                setProjectName('');
                setItemCodes([]);
                setIssuedDate('');




            }
        } catch (error) {
            console.error('Error issuing items:', error);
        }
    };
    
    return (
        <div className="container justify-center items-center h-screen ml-80 mt-32">
            <div className="max-w-md w-full p-6 bg-blue-400 rounded shadow-md">
                <h2 className="text-xl font-semibold mb-4">Issue Move Items for Project</h2>
                {selectedItems.map((selectedItem, index) => (
             <div key={index} className="mb-4 p-4 border rounded shadow">
             <label className="block mb-2">
                 Item Code:
                 <select
                     className="w-full my-input p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                     value={selectedItem.itemCode}
                     onChange={(e) => handleItemChange(index, e.target.value)}
                 >
                     <option value="">Select an item</option>
                     {itemCodes.map((item) => (
                         <option key={item.itemCode} value={item.itemCode}>
                             {item.itemCode} - {item.itemName}
                         </option>
                     ))}
                 </select>
             </label>
             <p className="text-gray-600">Available Quantity: {availableQuantities[selectedItem.itemCode] || 0}</p>
             <label className="block mt-2">
                 Quantity:
                 <input
                     className="w-full my-input p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                     type="number"
                     value={selectedItem.quantity}
                     onChange={(e) => handleQuantityChange(index, e.target.value)}
                 />
             </label>
         </div>
         
                ))}
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded mb-2" onClick={handleAddItem}>
    Add Item
</button>

<label className="block mb-4 font-semibold">
    Project Name:
    <input
        className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:bg-white focus:border-blue-500"
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
    />
</label>

<label className="block mb-4">
    Issued Date:
    <input
        className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:bg-white focus:border-blue-500"
        type="date"
        value={issuedDate}
        onChange={(e) => setIssuedDate(e.target.value)}
    />
</label>

<button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
    Issue Items
</button>

            </div>
        </div>
    );
}
