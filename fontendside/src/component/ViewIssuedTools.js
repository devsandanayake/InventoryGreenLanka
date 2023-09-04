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
                setIssuedTools(tools);
            }
        } catch (error) {
            console.error('Error fetching issued tools:', error);
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
                        <th className="px-4 py-2">Issued Date</th>
                    </tr>
                </thead>
                <tbody>
                    {issuedTools.map((tool) => (
                        <tr key={tool._id}>
                            <td className="border px-4 py-2">{tool.toolCode}</td>
                            <td className="border px-4 py-2">{tool.qty}</td>
                            <td className="border px-4 py-2">{tool.personName}</td>
                            <td className="border px-4 py-2">{tool.issuedDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
