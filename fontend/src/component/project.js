import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Project() {
    const [issueItems, setIssueItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        viewTools();
    }, []);

    const viewTools = () => {
        axios.get('https://inventorygreenlanka.onrender.com/issue/show')
            .then((res) => {
                if (res.data.success) {
                    // Aggregate items by project name and item code and calculate total quantity
                    const aggregatedItems = {};
                    res.data.issuedItems.forEach((issue) => {
                        const key = `${issue.projectName}_${issue.itemCode}`;
                        if (!aggregatedItems[key]) {
                            aggregatedItems[key] = {
                                itemCode: issue.itemCode,
                                projectName: issue.projectName,
                                qty: issue.qty,
                                issuedDate: issue.issuedDate,
                             
                            };
                        } else {
                            aggregatedItems[key].qty += issue.qty;
                        }
                    });
                    const aggregatedItemList = Object.values(aggregatedItems);
                    setIssueItems(aggregatedItemList);
                }
            })
            .catch((error) => {
                console.error('Error fetching issue items:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div>
            <div className='mt-5'>
                <div className='mt-5'>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <table className='table-auto w-full'>
                            <thead>
                                <tr>
                                    <th className='border px-4 py-2'>Project Name</th>
                                    <th className='border px-4 py-2'>Item Code</th>
                                    <th className='border px-4 py-2'>Total Quantity</th>
                                    <th className='border px-4 py-2'>Data</th>
                                </tr>
                            </thead>
                            <tbody>
                                {issueItems && issueItems.length > 0 ? (
                                    issueItems.map((issue, index) => (
                                        <tr key={index}>
                                            <td className='border px-4 py-2 font-bold'>{issue.projectName}</td>
                                            <td className='border px-4 py-2'>{issue.itemCode}</td>
                                            <td className='border px-4 py-2'>{issue.qty}</td>
                                            <td className='border px-4 py-2'>{issue.issuedDate}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">No issue items found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    )
}
