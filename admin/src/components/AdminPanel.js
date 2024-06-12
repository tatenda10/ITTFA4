import React from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-3xl bg-white p-8 border border-gray-300 rounded shadow-md">
        <h2 className="text-2xl mb-4 text-center">Admin Panel</h2>
        <p className="text-center mb-4">Welcome to the admin panel.</p>
        <div className="flex justify-center space-x-4">
          <Link to="/add-product" className="bg-blue-500 text-white p-2 rounded">Add Product</Link>
          <Link to="/view-orders" className="bg-green-500 text-white p-2 rounded">View Orders</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
