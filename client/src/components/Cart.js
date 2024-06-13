import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../services/api';
import { useUser } from '../context/UserContext';

const Cart = () => {
  const { state } = useUser();
  const { user } = state;
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [address, setAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);
    calculateTotalPrice(items);
  }, []);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const handleQuantityChange = (productId, quantity) => {
    const newCartItems = cartItems.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: quantity };
      }
      return item;
    });

    setCartItems(newCartItems);
    calculateTotalPrice(newCartItems);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
  };

  const handlePlaceOrder = () => {
    if (!user) {
      alert('Please login first');
      return;
    }

    const order = {
      user_id: user.user.id,
      items: cartItems.map(item => ({
        product_id: item.id, // Ensure product_id is included
        quantity: item.quantity,
        price: item.price // Include price if needed
      })),
      total_price: totalPrice,
      delivery_date: deliveryDate,
      address,
    };

    api.post('/orders', order)
      .then(response => {
        alert('Order placed successfully');
        localStorage.removeItem('cart');
        setRedirect(true);
      })
      .catch(error => {
        console.error(error);
        alert('Error placing order');
      });
  };

  if (redirect) return <Navigate to="/orders" />;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-3xl bg-white p-8 border border-gray-300 rounded shadow-md">
        <h2 className="text-2xl mb-4 text-center">Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-center">Your cart is empty</p>
        ) : (
          <>
            <div className="mb-4">
              {cartItems.map((item, index) => (
                <div key={item.id} className="flex items-center mb-2 justify-center">
                  <img src={`http://16.171.137.189/:5000${item.image_path}`} alt={item.name} className="w-16 h-16 object-cover mr-4" />
                  <div className="flex-1 text-center">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-700">${item.price} x {item.quantity}</p>
                  </div>
                  <input 
                    type="number" 
                    value={item.quantity} 
                    min="1" 
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    className="w-16 p-2 border rounded"
                  />
                </div>
              ))}
            </div>
            <div className="mb-4">
              <label className="block mb-2">Delivery Address</label>
              <input 
                type="text" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Delivery Date</label>
              <input 
                type="date" 
                value={deliveryDate} 
                onChange={(e) => setDeliveryDate(e.target.value)} 
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold">Total: ${totalPrice.toFixed(2)}</p>
              <button onClick={handlePlaceOrder} className="bg-blue-500 text-white p-2 rounded">Place Order</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
