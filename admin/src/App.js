import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ViewOrders from './components/ViewOrders';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/adminpanel" element={<AdminPanel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/view-orders" element={<ViewOrders />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
