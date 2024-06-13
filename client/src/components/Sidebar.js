import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white p-4">
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            <ul>
                <li className="mb-2">
                    <Link to="/category/Action" className="hover:underline">Action</Link>
                </li>
                <li className="mb-2">
                    <Link to="/category/Fiction" className="hover:underline">Fiction</Link>
                </li>
                <li className="mb-2">
                    <Link to="/category/Mystery" className="hover:underline">Mystery</Link>
                </li>
                <li className="mb-2">
                    <Link to="/category/Romance" className="hover:underline">Romance</Link>
                </li>
                <li className="mb-2">
                    <Link to="/category/SciFi" className="hover:underline">Sci-Fi</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
