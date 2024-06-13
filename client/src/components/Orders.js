import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useUser } from '../context/UserContext';

const Orders = () => {
  const { state: { user } } = useUser();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await api.get(`/orders/user/${user.user.id}`);
        console.log(user.user.id)
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        alert('Failed to fetch orders');
      }
    };

    if (user) {
      fetchUserOrders();
    }
  }, [user]);

  if (!user) {
    return <p>Please log in to view orders.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Order ID: {order.id}</span>
                <span className="text-sm">Date: {new Date(order.created_at).toLocaleDateString()}</span>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Items</h3>
                <ul>
                  {order.items.map(item => (
                    <li key={item.id}>{item.product_name} x {item.quantity}</li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total Price: ${order.total_price}</span>
                <span>Delivery Date: {new Date(order.delivery_date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
