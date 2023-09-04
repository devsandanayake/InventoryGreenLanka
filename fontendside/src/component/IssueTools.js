import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function IssueTools() {
    const [selectedTools, setSelectedTools] = useState([]);
    const [personName, setPersonName] = useState('');
    const [project, setProject] = useState('');
    const [toolCodes, setToolCodes] = useState([]);
    const [issuedDate, setIssuedDate] = useState('');
    const [availableQuantities, setAvailableQuantities] = useState({});

    useEffect(() => {
        fetchToolCodes();
    }, []);

    const fetchToolCodes = async () => {
        try {
            const response = await axios.get('https://inventorygreenlanka.onrender.com/tools');
            if (response.data.success) {
                const tools = response.data.tools;
                setToolCodes(tools);
            }
        } catch (error) {
            console.error('Error fetching tool codes:', error);
        }
    };

    const fetchAvailableQuantity = async (toolCode) => {
        try {
            const response = await axios.get(`https://inventorygreenlanka.onrender.com/tools/${toolCode}`);
            if (response.data.success) {
                const newAvailableQuantities = { ...availableQuantities };
                newAvailableQuantities[toolCode] = response.data.tool.qty;
                setAvailableQuantities(newAvailableQuantities);
            }
        } catch (error) {
            console.error('Error fetching available quantity:', error);
        }
    };
    

    const handleAddTool = () => {
        setSelectedTools([...selectedTools, { toolCode: '', quantity: 0 }]);
    };

    const handleToolChange = (index, toolCode) => {
        const updatedTools = [...selectedTools];
        updatedTools[index].toolCode = toolCode;
        setSelectedTools(updatedTools);
        fetchAvailableQuantity(toolCode);
    };

    const handleQuantityChange = (index, quantity) => {
        const updatedTools = [...selectedTools];
        updatedTools[index].quantity = parseInt(quantity);
        setSelectedTools(updatedTools);
    };

    const handleIssue = async () => {
        const toolsToIssue = selectedTools.map((tool) => ({
            toolCode: tool.toolCode,
            qty: tool.quantity,
            personName: personName,
            project: project,
            issuedDate: issuedDate,
        }));

        try {
            const response = await axios.post('https://inventorygreenlanka.onrender.com/tools/issue', toolsToIssue);
            if (response.data.success) {
                alert('Tools issued successfully');
                // Clear selectedTools array or perform any other necessary action
                setSelectedTools([]);
                setPersonName('');
                setIssuedDate('');
                setProject('');
            }
        } catch (error) {
            console.error('Error issuing tools:', error);
        }
    };

    return (
        <div className="ml-96 mt-32 justify-center items-center h-screen">
            <div className="max-w-md w-full p-6 bg-red-300 rounded shadow-md animate__animated animate__fadeIn">
                <h2 className="text-xl font-semibold mb-4">Issue Tools</h2>
                {toolCodes && toolCodes.length > 0 ? (
                    selectedTools.map((selectedTool, index) => (
                        <div key={index} className='mb-4 p-4 border rounded shadow'>
                            <label className="block mb-2">
                                Tool Code:
                                <select
                                    className="w-full my-input p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    value={selectedTool.toolCode}
                                    onChange={(e) => handleToolChange(index, e.target.value)}
                                >
                                    <option value="">Select a tool</option>
                                    {toolCodes.map((tool) => (
                                        <option key={tool.toolCode} value={tool.toolCode}>
                                            {tool.toolCode} - {tool.toolName}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <p>Available Quantity: {availableQuantities[selectedTool.toolCode] || 0}</p>
                            <label className="block mb-2">
                                Quantity:
                                <input
                                    className="w-full my-input p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    type="number"
                                    value={selectedTool.quantity}
                                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                                />
                            </label>
                        </div>
                    ))
                ) : (
                    <p>No tools available.</p>
                )}
                <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded mb-2" onClick={handleAddTool}>
                    Add Tool
                </button>
                <label className="block mb-4">
                    Person Name:
                    <input
                        className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:bg-white focus:border-blue-500"
                        type="text"
                        value={personName}
                        onChange={(e) => setPersonName(e.target.value)}
                    />
                </label>
                <label className="block mb-4">
                    Project Name:
                    <input
                        className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:bg-white focus:border-blue-500"
                        type="text"
                        value={project}
                        onChange={(e) => setProject(e.target.value)}
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
                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleIssue}>
                    Issue Tools
                </button>
            </div>
        </div>
    );
}
