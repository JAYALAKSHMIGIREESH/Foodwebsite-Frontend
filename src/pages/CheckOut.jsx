import React, { useState, useContext, useEffect } from 'react';
import { foodContext } from '../contexts/foodContext';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { DotLoader } from 'react-spinners';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { backendUrl } from '../App';

const CheckOut = () => {
  const {
    products,
    cartItems = {},
    setCartItems,
    delivery_fee,
    token,
  } = useContext(foodContext);

  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [form, setForm] = useState({ name: '', phone: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const navigate = useNavigate();

  const cartProductList = products.filter(product => cartItems[product._id]);
  const cartTotal = cartProductList.reduce(
    (acc, item) => acc + item.price * cartItems[item._id],
    0
  );

  useEffect(() => {
    if (cartProductList.length === 0 && !orderDetails) {
      toast.info("Your cart is empty. Redirecting...");
      navigate('/', { replace: true });
    }
  }, [cartProductList.length, orderDetails, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const handleConfirmOrder = async () => {
    const { name, phone, address } = form;

    if (!name || !phone || !address) {
      toast.error('Please fill in all shipping details.');
      return;
    }

    if (!validatePhoneNumber(phone)) {
      toast.error('Please enter a valid 10-digit phone number.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/place`,
        {
          amount: cartTotal + delivery_fee,
          address: { name, phone, address },
        },
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        setCartItems({});
        setOrderDetails({
          name,
          phone,
          address,
          total: cartTotal + delivery_fee,
        });

        toast.success('Order confirmed! Redirecting shortly...');

        setTimeout(() => {
          navigate('/', { replace: true });
        }, 5000);
      } else {
        toast.error(response.data.message || 'Order failed.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Try again later.');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 relative">
      <ToastContainer />

      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
          <DotLoader color="#f97316" size={60} />
        </div>
      )}

      {orderDetails ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
          <h2 className="text-2xl font-semibold text-green-800">Order Confirmed!</h2>
          <p className="mt-2">Thank you, {orderDetails.name}. Your order has been placed.</p>
          <p className="mt-1">Total: ${orderDetails.total.toFixed(2)}</p>
          <p className="mt-1">Delivery Address: {orderDetails.address}</p>
          <p className="mt-1 text-sm text-gray-600">Redirecting to home page...</p>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6">Checkout</h1>

          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

            <ul className="divide-y divide-gray-200">
              {cartProductList.map((item) => (
                <li key={item._id} className="py-4 flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover mr-4"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-500">
                      ${item.price} × {cartItems[item._id]}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex justify-between items-center">
              <span className="text-xl font-semibold">Subtotal:</span>
              <span className="text-xl">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-md text-gray-600">Delivery Fee:</span>
              <span className="text-md text-gray-600">Rs{delivery_fee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mt-2 text-lg font-bold">
              <span>Total:</span>
              <span>${(cartTotal + delivery_fee).toFixed(2)}</span>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-medium mb-4">Shipping Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="border border-gray-300 rounded-lg px-4 py-2"
                  disabled={loading}
                />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  className="border border-gray-300 rounded-lg px-4 py-2"
                  disabled={loading}
                />
              </div>
              <textarea
                name="address"
                value={form.address}
                onChange={handleInputChange}
                placeholder="Shipping Address"
                rows="3"
                className="mt-4 border border-gray-300 rounded-lg px-4 py-2 w-full"
                disabled={loading}
              />
            </div>

            <div className="mt-8">
              <div className="flex items-center gap-8">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                    disabled={loading}
                  />
                  Cash on Delivery
                </label>
              </div>
            </div>

            <button
              onClick={handleConfirmOrder}
              disabled={loading}
              className="mt-8 w-full bg-green-700 hover:bg-green-600 text-white py-3 px-6 rounded-xl text-lg transition duration-300"
            >
              {loading ? 'Processing...' : 'Confirm Order'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckOut;
