import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders/admin');
        console.log(response.data);
        
        const ordersData = response.data.map(order => ({
          ...order,
          user_id: order.user_id || 1
        }));
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
        alert('Failed to fetch orders');
      }
    };
    fetchOrders();
  }, []);

  console.log(orders)
  return (
    <div className="flex justify-center items-center  bg-gray-100">
      <div className="w-full max-w-3xl bg-white p-8 border border-gray-300 rounded shadow-md overflow-x-auto">
        <h2 className="text-2xl mb-4 text-center">View Orders</h2>
        <table className="min-w-full bg-white border border-gray-300 rounded">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Order ID</th>
              <th className="py-2 px-4 border-b">User ID</th>
              <th className="py-2 px-4 border-b">Total Price</th>
              <th className="py-2 px-4 border-b">Delivery Date</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td className="py-2 px-4 border-b">{order.id}</td>
                <td className="py-2 px-4 border-b">{order.user_id}</td>
                <td className="py-2 px-4 border-b">${order.total_price}</td>
                <td className="py-2 px-4 border-b">{new Date(order.delivery_date).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">{order.address}</td>
                <td className="py-2 px-4 border-b">
                  {order.items ? order.items.map(item => (
                    <div key={item.id}>
                      {item.product_name} x {item.quantity}
                    </div>
                  )) : 'No items'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewOrders;
