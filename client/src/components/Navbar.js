import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useUser();
  const { user } = state;

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    alert('Hey, you logged out!');
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <div>
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/cart" className="mr-4">Cart</Link>
        <Link to="/orders" className="mr-4">Orders</Link>
        {user && user.email === 'tatendamuzenda740@gmail.com' && (
          <Link to="/admin" className="mr-4">Admin Panel</Link>
        )}
      </div>
      <div>
        {user ? (
          <>
            <span className="mr-4">{user.name}</span>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <Link to="/login" className="bg-blue-500 px-3 py-1 rounded">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
