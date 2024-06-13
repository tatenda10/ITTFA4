import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import Sidebar from './Sidebar';

const Category = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const baseImageUrl = 'http://16.171.137.189:5000'; // Adjust as necessary

  useEffect(() => {
    if (category) {
      api.get(`/products/${category}`)
        .then(response => setProducts(response.data))
        .catch(error => console.error(error));
    }
  }, [category]);

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

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        {category && <h2 className="text-2xl font-bold mb-4 capitalize">{category.replace('-', ' ')}</h2>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
              <img src={`${baseImageUrl}${product.image_path}`} alt={product.name} className="w-full h-48 object-cover mb-2 rounded" />
              <div className="text-center">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-700">${product.price}</p>
                <button onClick={() => handleAddToCart(product)} className="bg-green-500 text-white p-2 rounded mt-2">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
