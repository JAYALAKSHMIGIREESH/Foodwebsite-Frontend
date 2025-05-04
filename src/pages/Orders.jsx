import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { foodContext } from "../contexts/foodContext";
import { backendUrl } from "../App";

const Orders = () => {
  const { token, currency } = useContext(foodContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      console.log("Order API response:", response.data);

      if (response.data.success && Array.isArray(response.data.orders)) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            });
          });
        });

        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>

      {orderData.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="border-b font-bold">
              <th className="px-4 py-2 text-left text-sm font-bold text-gray-700">
                Image
              </th>
              <th className="px-4 py-2 text-left text-sm font-bold text-gray-700">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-bold text-gray-700">
                Price
              </th>
              <th className="px-4 py-2 text-left text-sm font-bold text-gray-700">
                Quantity
              </th>
              <th className="px-4 py-2 text-left text-sm font-bold text-gray-700">
                Date
              </th>
              <th className="px-4 py-2 text-left text-sm font-bold text-gray-700">
                Payment
              </th>
              <th className="px-4 py-2 text-left text-sm font-bold text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orderData.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2 text-sm text-gray-800">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover"
                  />
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">{item.name}</td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {currency} {item.price}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {item.quantity}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {new Date(item.date).toLocaleString()}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {item.paymentMethod}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
