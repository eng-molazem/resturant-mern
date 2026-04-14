import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyOrders = () => {
  const { axios } = useContext(AppContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        "http://localhost:5000/api/order/my-orders"
      );

      if (data?.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="py-12 flex items-center justify-center">
      <div className="w-full sm:w-[600px] border border-zinc-300/60 dark:border-zinc-700 rounded-2xl px-8 bg-white dark:bg-zinc-900">

        <h1 className="text-zinc-900 dark:text-white text-3xl mt-10 font-medium text-center">
          My Orders
        </h1>

        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2 pb-6 text-center">
          Here are your recent orders
        </p>

        {loading ? (
          <p className="text-center py-10">Loading...</p>
        ) : orders.length === 0 ? (
          <p className="text-center py-10 text-gray-500">
            No orders found
          </p>
        ) : (
          <div className="space-y-4 pb-8">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border rounded-xl p-4 flex flex-col gap-2 bg-gray-50 dark:bg-zinc-800"
              >
                <div className="flex justify-between">
                  <p className="font-semibold text-zinc-800 dark:text-white">
                    Order ID:
                  </p>
                  <p className="text-sm text-gray-500">{order._id}</p>
                </div>

                <div className="flex justify-between">
                  <p className="font-semibold text-zinc-800 dark:text-white">
                    Total:
                  </p>
                  <p className="text-green-600 font-bold">
                    ${order.totalAmount}
                  </p>
                </div>

                <div className="flex justify-between">
                  <p className="font-semibold text-zinc-800 dark:text-white">
                    Status:
                  </p>
                  <p className="text-blue-500">{order.status}</p>
                </div>

                <div className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;