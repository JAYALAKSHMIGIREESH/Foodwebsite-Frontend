import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../App";

export const foodContext = createContext();

export const FoodProvider = ({ children }) => {
  const delivery_fee = 12;
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    const getProductsData = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/product/list`);
        if (res.data.success) {
          setProducts(res.data.products);
        } else {
          toast.error(res.data.message);
        }
      } catch (err) {
        console.error(err);
        toast.error(err.message);
      }
    };
    getProductsData();
  }, []);

  useEffect(() => {
    if (token) {
      getUserCart(token);
    }
  }, [token]);

  const getUserCart = async (authToken) => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { token: authToken } }
      );
      if (res.data.success) {
        setCartItems(res.data.cartData);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const addToCart = async (itemId) => {
    if (!token) return toast.error("Please log in to add items to your cart.");

    try {
      const userId = localStorage.getItem("userId");
      const res = await axios.post(
        `${backendUrl}/api/cart/add`,
        { userId, itemId },
        { headers: { token } }
      );
      if (res.data.success) {
        setCartItems(res.data.cartData);
        toast.success("Added to cart");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (!token) return toast.error("Please log in to update your cart.");

    try {
      const userId = localStorage.getItem("userId");
      const res = await axios.post(
        `${backendUrl}/api/cart/update`,
        { userId, itemId, quantity },
        { headers: { token } }
      );
      if (res.data.success) {
        setCartItems(res.data.cartData);
        toast.success("Cart updated");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const removeFromCart = async (itemId) => {
    if (!token) return toast.error("Please log in to remove items from your cart.");

    try {
      const userId = localStorage.getItem("userId");
      const res = await axios.post(
        `${backendUrl}/api/cart/update`,
        { userId, itemId, quantity: 0 },
        { headers: { token } }
      );
      if (res.data.success) {
        setCartItems(res.data.cartData);
        toast.info("Removed from cart");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  };

  const getCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [itemId, qty]) => {
      const product = products.find((p) => p._id === itemId);
      return product ? total + product.price * qty : total;
    }, 0);
  };

  const logout = () => {
    setToken("");
    setCartItems({});
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    toast.info("Logged out");
  };

  return (
    <foodContext.Provider
      value={{
        products,
        cartItems,
        setCartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        getCartCount,
        getCartAmount,
        delivery_fee,
        token,
        setToken,
        logout,
      }}
    >
      {children}
    </foodContext.Provider>
  );
};
