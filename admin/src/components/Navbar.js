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
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <div  className="mr-4">
         Admin Panel
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
