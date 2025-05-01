import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const initialCustomers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', joined: '2024-09-12' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive', joined: '2024-10-01' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', status: 'Active', joined: '2024-11-22' },
];

function Admin() {
    const userdata = useSelector((state => state.auth))
    const adminData = userdata?.admin
    const employeesData = userdata?.employees

    const taskShow = employeesData?.find((e) => e.task_show)
    const [customers, setCustomers] = useState(initialCustomers);
    const [search, setSearch] = useState('');
    const [filtered, setFiltered] = useState(initialCustomers);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    // Search logic
    useEffect(() => {
        const timer = setTimeout(() => {
            const result = customers.filter(c =>
                c.name.toLowerCase().includes(search.toLowerCase())
            );
            setFiltered(result);
        }, 300);
        return () => clearTimeout(timer);
    }, [search, customers]);

    // Avatar initials
    const getAvatar = (name) => name.split(' ').map(n => n[0]).join('');

    // Save edit
    const saveEdit = () => {
        setCustomers(prev =>
            prev.map(c => (c.id === selectedCustomer.id ? selectedCustomer : c))
        );
        setEditMode(false);
    };

    // Delete customer
    const deleteCustomer = () => {
        setCustomers(prev => prev.filter(c => c.id !== selectedCustomer.id));
        setDeleteConfirm(false);
        setSelectedCustomer(null);
    };

    return (
        <div className="p-6 min-h-screen bg-gray-100">
            <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Employees</h1>

                {/* Search */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search customers..."
                        className="w-full md:w-1/2 px-4 py-2 border rounded-md"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead className="bg-gray-100 text-left text-sm text-gray-600">
                            <tr>
                                <th className="px-4 py-2">Employees</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Password</th>
                                <th className="px-4 py-2">Age</th>
                                <th className="px-4 py-2 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {adminData.map(c => (
                                <tr key={c.id} className="border-b hover:bg-gray-50 text-sm">
                                    <td className="px-4 py-3 flex items-center gap-3">
                                        <div className="h-9 w-9 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                                            {getAvatar(c.name)}
                                        </div>
                                        {c.name}
                                    </td>
                                    <td className="px-4 py-3">{c.email}</td>
                                    <td className="px-4 py-3">
                                        <span className='px-2 py-1 rounded-full text-xs font-medium '>
                                            {c.password}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">{c.age}</td>
                                    <td className="px-4 py-3 text-right space-x-2">
                                        <button onClick={() => { setSelectedCustomer(c); setEditMode(false); }} className="text-blue-600 hover:underline">View</button>
                                        <button onClick={() => { setSelectedCustomer(c); setEditMode(true); }} className="text-yellow-500 hover:underline">Edit</button>
                                        <button onClick={() => { setSelectedCustomer(c); setDeleteConfirm(true); }} className="text-red-500 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            ))}


                            {!filtered.length && (
                                <tr><td colSpan="5" className="text-center text-gray-500 py-4">No customers found.</td></tr>
                            )}
                        </tbody>
                    </table>
                    <div className='flex justify-between items-center mt-6 '>

                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Add Admin
                        </button>
                        <button
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-blue-700"
                        >
                            Delete Admin
                        </button>
                    </div>
                </div>
            </div>

            {/* View/Edit Modal */}
            {selectedCustomer && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl relative">
                        <h2 className="text-xl font-semibold mb-4">
                            {editMode ? 'Edit Customer' : 'Customer Details'}
                        </h2>

                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium">Name</label>
                                {editMode ? (
                                    <input
                                        value={selectedCustomer.name}
                                        onChange={e =>
                                            setSelectedCustomer({ ...selectedCustomer, name: e.target.value })
                                        }
                                        className="mt-1 w-full px-3 py-2 border rounded"
                                    />
                                ) : (
                                    <p className="text-gray-700">{selectedCustomer.name}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Email</label>
                                {editMode ? (
                                    <input
                                        value={selectedCustomer.email}
                                        onChange={e =>
                                            setSelectedCustomer({ ...selectedCustomer, email: e.target.value })
                                        }
                                        className="mt-1 w-full px-3 py-2 border rounded"
                                    />
                                ) : (
                                    <p className="text-gray-700">{selectedCustomer.email}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Status</label>
                                {editMode ? (
                                    <select
                                        value={selectedCustomer.status}
                                        onChange={e =>
                                            setSelectedCustomer({ ...selectedCustomer, status: e.target.value })
                                        }
                                        className="mt-1 w-full px-3 py-2 border rounded"
                                    >
                                        <option>Active</option>
                                        <option>Inactive</option>
                                    </select>
                                ) : (
                                    <p className="text-gray-700">{selectedCustomer.status}</p>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                onClick={() => { setSelectedCustomer(null); setEditMode(false); }}
                            >
                                Close
                            </button>
                            {editMode && (
                                <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    onClick={saveEdit}
                                >
                                    Save
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirm Modal */}
            {deleteConfirm && selectedCustomer && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white w-full max-w-sm p-6 rounded-lg shadow-xl text-center">
                        <h2 className="text-lg font-bold mb-4 text-red-600">Delete Customer</h2>
                        <p className="mb-6">Are you sure you want to delete <strong>{selectedCustomer.name}</strong>?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                onClick={() => setDeleteConfirm(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                onClick={deleteCustomer}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Admin;
