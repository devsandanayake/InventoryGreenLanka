import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TiTick } from 'react-icons/ti';

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
                                status: issue.status
                             
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
            <div className='text-5xl font-bold'>Project Issued Items</div>
                <div className='mt-5'>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <table className='table-auto w-full'>
                            <thead>
                                <tr>
                                    <th className='border px-4 py-2 text-2xl'>Project Name</th>
                                    <th className='border px-4 py-2 text-2xl'>Item Code</th>
                                    <th className='border px-4 py-2 text-2xl'>Total Quantity</th>
                                    <th className='border px-4 py-2 text-2xl'>Data</th>
                                    <th className='border px-4 py-2 text-2xl'>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {issueItems && issueItems.length > 0 ? (
                                    issueItems.map((issue, index) => (
                                        <tr key={index}>
                                            <td className='border px-4 py-2 font-bold text-2xl'>{issue.projectName}</td>
                                            <td className='border px-4 py-2 text-2xl'>{issue.itemCode}</td>
                                            <td className='border px-4 py-2 text-2xl'>{issue.qty}</td>
                                            <td className='border px-4 py-2 text-2xl'>{issue.issuedDate}</td>
                                            {issue.status === 'Returned' ? (<td className='border px-4 py-2 text-2xl bg-red-600'>Returned</td>) : (<td className='border px-4 py-2 text-2xl'><TiTick className='bg-green-500 text-4xl text-center'/></td>)}
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
