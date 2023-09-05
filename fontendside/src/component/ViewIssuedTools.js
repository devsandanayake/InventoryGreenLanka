// In your ViewIssuedTools.js component

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ViewIssuedTools() {
    const [issuedTools, setIssuedTools] = useState([]);

    useEffect(() => {
        fetchIssuedTools();
    }, []);

    const fetchIssuedTools = async () => {
        try {
            const response = await axios.get('https://inventorygreenlanka.onrender.com/issue/tool');
            if (response.data.success) {
                const tools = response.data.tools;
                console.log('Received tools:', tools); // Add this line to check if data is received
                setIssuedTools(tools);
            }
        } catch (error) {
            console.error('Error fetching issued tools:', error);
        }
    };
    

    const handleReturnTool = async (toolId) => {
        try {
            // Make a request to your server to handle tool return using the toolId
            // You should implement the server-side logic for returning tools.
            // For example:
            const response = await axios.post(`https://inventorygreenlanka.onrender.com/tools/return/${toolId}`);
            if (response.data.success) {
                // Handle success, update UI as needed
                alert('Tool returned successfully.');
                // You might want to fetch the updated issued tools list here.
                fetchIssuedTools();
            }
        } catch (error) {
            console.error('Error returning tool:', error);
        }
    };

    return (
        <div className="container mx-auto mt-10">
            <h2 className="text-2xl font-semibold mb-4">View Issued Tools</h2>
            <table className="min-w-full table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Tool Code</th>
                        <th className="px-4 py-2">Quantity</th>
                        <th className="px-4 py-2">Person Name</th>
                        <th className="px-4 py-2">Project Name</th>
                        <th className="px-4 py-2">Issued Date</th>
                        <th className="px-4 py-2">Actions</th> {/* Add Actions column */}
                    </tr>
                </thead>
                <tbody>
                    {issuedTools.map((tool) => (
                        <tr key={tool._id}>
                            <td className="border px-4 py-2">{tool.toolCode}</td>
                            <td className="border px-4 py-2">{tool.qty}</td>
                            <td className="border px-4 py-2">{tool.personName}</td>
                            <td className="border px-4 py-2">{tool.project}</td>
                            <td className="border px-4 py-2">{tool.issuedDate}</td>
                            <td className="border px-4 py-2">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => handleReturnTool(tool._id)} // Pass tool ID
                                >
                                    Return Tool
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
