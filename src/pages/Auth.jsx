import React, { useContext, useState } from "react";
import { foodContext } from "../contexts/foodContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../App";

const Auth = ({ insideRegister }) => {
  const navigate = useNavigate();
  const { setToken, addToCart } = useContext(foodContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!email || !password || (insideRegister && !name)) {
      toast.error("Please fill all the required fields.");
      return;
    }

    try {
      const payload = insideRegister ? { name, email, password } : { email, password };
      const url = insideRegister
        ? `${backendUrl}/api/user/register`
        : `${backendUrl}/api/user/login`;

      const response = await axios.post(url, payload);

      if (response.data.success) {
        const token = response.data.token;
        setToken(token);
        localStorage.setItem("token", token); 
        toast.success(response.data.message);

        setName('');
        setEmail('');
        setPassword('');

        const pendingItem = localStorage.getItem("pendingCartItem");
        if (pendingItem) {
          localStorage.removeItem("pendingCartItem");
          setTimeout(() => {
            addToCart(pendingItem, navigate);
          }, 200);
        }

        navigate("/menu");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Auth Error:", error.response || error.message);
      toast.error(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center w-full bg-gray-100 relative px-4">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/background-with-happy-chef-with-steak-his-hand_1308-42794.jpg')",
        }}
      ></div>

      <div className="container mx-auto relative z-10 flex justify-center items-center min-h-screen">
        <form
          onSubmit={onSubmitHandler}
          className="shadow-lg bg-white p-6 rounded-lg w-full max-w-md text-center"
          autoComplete="off"
        >
          <h5 className="text-xl mb-4 text-orange-400 font-semibold">
            Sign {insideRegister ? " up" : " in"} to your Account
          </h5>

          {insideRegister && (
            <div className="mb-3">
              <input
                type="text"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                autoComplete="off"
              />
            </div>
          )}

          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
              autoComplete="off"
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
              autoComplete="new-password"
            />
          </div>

          <div className="mt-3">
            <button
              type="submit"
              className="w-full bg-orange-400 text-white py-2 rounded-lg hover:bg-white hover:text-orange-400 hover:border-2 border-orange-400 transition duration-300"
            >
              {insideRegister ? "Register" : "Login"}
            </button>

            <p className="mt-2 text-sm">
              {insideRegister ? (
                <span>
                  Already a user?{" "}
                  <span
                    onClick={() => navigate("/login")}
                    className="text-orange-400 hover:underline cursor-pointer"
                  >
                    Login
                  </span>
                </span>
              ) : (
                <span>
                  New User?{" "}
                  <span
                    onClick={() => navigate("/register")}
                    className="text-orange-400 hover:underline cursor-pointer"
                  >
                    Register
                  </span>
                </span>
              )}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
