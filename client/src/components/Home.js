import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Sidebar from './Sidebar';
import { useUser } from '../context/UserContext';

const Home = () => {
  const { state: { user } } = useUser();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const baseImageUrl = 'http://16.171.137.189:5000'; // Adjust as necessary

  useEffect(() => {
    api.get('/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart');
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setShowProductModal(false);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
              <img src={`${baseImageUrl}${product.image_path}`} alt={product.name} className="w-full h-48 object-cover mb-2 rounded" />
              <div className="text-center">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-700 font-bold">${product.price}</p>
                <p className="text-gray-700">{product.category_name}</p>
                <button onClick={() => handleViewProduct(product)} className="bg-blue-500 text-white p-2 rounded mt-2">View Product</button>
                <button onClick={() => handleAddToCart(product)} className="bg-green-500 text-white p-2 rounded mt-2 ml-2">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showProductModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg max-w-md">
            <h2 className="text-xl font-semibold mb-4">{selectedProduct.name}</h2>
            <img src={`${baseImageUrl}${selectedProduct.image_path}`} alt={selectedProduct.name} className="w-full h-64 object-cover mb-4 rounded-lg" />
            <p className="mb-2"><strong>Description:</strong> {selectedProduct.description}</p>
            <p className="mb-2"><strong>Price:</strong> ${selectedProduct.price}</p>
            <p className="mb-2"><strong>Category:</strong> {selectedProduct.category_name}</p>
            <button onClick={handleCloseModal} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
