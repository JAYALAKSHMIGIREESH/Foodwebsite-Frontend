import React, { useContext, useState } from "react";
import { foodContext } from "../contexts/foodContext";
import { Link, useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { DotLoader } from "react-spinners";

const Cart = () => {
  const {
    products,
    cartItems = {},
    updateQuantity,
    getCartAmount,
    delivery_fee,
    setCartItems,
  } = useContext(foodContext);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const totalAmount = getCartAmount();
  const finalAmount = totalAmount + delivery_fee;

  const cartProductList = products.filter(
    (product) => cartItems[product._id]
  );

  const removeItem = (itemId) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      const updatedCart = { ...cartItems };
      delete updatedCart[itemId];
      setCartItems(updatedCart);
    }
  };

  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/checkout");
    }, 1000); // Simulate delay
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Loading Spinner Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-60 flex items-center justify-center z-50">
          <DotLoader color="#f97316" size={60} />
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartProductList.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>Your cart is empty.</p>
          <Link to="/menu" className="text-orange-500 hover:underline">
            Go to Menu
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-6">
            {cartProductList.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row items-center gap-4 border p-4 rounded-lg shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-contain"
                />
                <div className="flex-1 w-full">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-orange-500 font-bold">${item.price}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      <label htmlFor={`qty-${item._id}`}>Qty:</label>
                      <input
                        id={`qty-${item._id}`}
                        type="number"
                        value={cartItems[item._id]}
                        min={1}
                        disabled={loading} // ✅ Disable while loading
                        className="w-16 border rounded px-2 py-1"
                        onChange={(e) =>
                          updateQuantity(item._id, parseInt(e.target.value))
                        }
                      />
                    </div>
                    <button
                      onClick={() => removeItem(item._id)}
                      disabled={loading}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="border p-6 rounded-lg shadow-md h-fit">
            <h3 className="text-xl font-bold mb-4">Summary</h3>
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Delivery Fee:</span>
              <span>${delivery_fee.toFixed(2)}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>${finalAmount.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full mt-6 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
