import React, { useContext, useState } from 'react';
import { categoryItem } from '../assets/asset';
import { foodContext } from '../contexts/foodContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Menu = () => {
  const { products, addToCart, token } = useContext(foodContext);
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();

  const filteredProducts = category === "All"
    ? products
    : products.filter(item => item.category === category);

  const handleAddToCart = (productId) => {
    if (!token) {
      toast.error("Please log in or register to add items to your cart.");
      navigate("/login");
    } else {
      addToCart(productId, navigate);  
    }
  };

  return (
    <div className="px-4 py-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Discover our Menu</h1>
        <hr className="border-t-2 border-gray-200 w-24 mx-auto" />
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Category */}
        <div className="lg:w-1/4">
          <h2 className="text-xl font-semibold mb-4">Explore our Categories</h2>
          <ul className="space-y-3">
            {categoryItem.map((item, index) => (
              <li
                key={index}
                onClick={() =>
                  setCategory(prev =>
                    prev === item.category_title ? "All" : item.category_title
                  )
                }
                className={`cursor-pointer px-4 py-2 rounded-lg border transition 
                  ${category === item.category_title
                      ? "bg-orange-400 text-white border-orange-400"
                      : "bg-white text-gray-700 border-gray-300"
                    }`}
              >
                {item.category_title}
              </li>
            ))}
          </ul>
        </div>

        {/* Products */}
        <div className="lg:w-3/4">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div
                  key={product._id}
                  className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
                >
                  <div className="h-48 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-orange-400 font-bold">Rs{product.price}</p>
                      <button
                        onClick={() => handleAddToCart(product._id)}
                        className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
