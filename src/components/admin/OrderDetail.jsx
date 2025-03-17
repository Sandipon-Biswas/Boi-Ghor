import { useContext, useState } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore"; // Add getDoc
import myContext from "../../context/myContext";
import { fireDB } from "../../firebase/FirebaseConfig";
import Loader from "../loader/Loader";

const OrderDetail = () => {
    const context = useContext(myContext);
    const {loading, setLoading, getAllOrder, deleteProduct } = context;

    const [editingOrderId, setEditingOrderId] = useState(null);
    const [newStatus, setNewStatus] = useState("");

    // Handle clicking the Edit button
    const handleEditClick = (orderId, currentStatus) => {
        console.log(`Editing order: ${orderId} with current status: ${currentStatus}`);
        setEditingOrderId(orderId);
        setNewStatus(currentStatus);
    };

    // Handle updating the order status
    const handleStatusUpdate = async (orderId) => {
        console.log(`Attempting to update order ID: ${orderId} with status: ${newStatus}`);

        if (!orderId) {
            alert("Error: Invalid order ID.");
            return;
        }

        try {
            setLoading(true)
            const orderRef = doc(fireDB, "order", orderId);

            // Check if the document exists
            const docSnap = await getDoc(orderRef);
            if (!docSnap.exists()) {
                setLoading(false)
                alert("Error: Order not found.");
                console.error(`❌ Order ID ${orderId} does not exist in Firestore.`);
                return;
            }

            await updateDoc(orderRef, { status: newStatus });

            console.log(`✅ Order ID ${orderId} updated to status: ${newStatus}`);
            alert("Order status updated successfully!");

            setEditingOrderId(null);
            setNewStatus("");
            setLoading(false)

            // Optional: Refresh orders
            // getAllOrders(); 

        } catch (error) {
            console.error("🔥 Error updating order status:", error);
            alert("Failed to update order status. Check console for details.");
            setLoading(false)
        }
    };

    return (
        <div>
            <div className="py-5">
                <h1 className="text-xl text-cyan-900 font-bold">All Orders</h1>
            </div>
            <div className="flex justify-center relative top-32">
            { loading && <Loader/> }
            </div>

            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border border-collapse border-cyan-900 text-white">
                    <thead>
                        <tr className="bg-cyan-900 text-white font-bold">
                            <th className="h-12 px-6 border border-cyan-900">S.No.</th>
                            <th className="h-12 px-6 border border-cyan-900">Order Id</th>
                            <th className="h-12 px-6 border border-cyan-900">Image</th>
                            <th className="h-12 px-6 border border-cyan-900">Title</th>
                            <th className="h-12 px-6 border border-cyan-900">Category</th>
                            <th className="h-12 px-6 border border-cyan-900">Price</th>
                            <th className="h-12 px-6 border border-cyan-900">Quantity</th>
                            <th className="h-12 px-6 border border-cyan-900">Total Price</th>
                            <th className="h-12 px-6 border border-cyan-900">Status</th>
                            <th className="h-12 px-6 border border-cyan-900">Name</th>
                            <th className="h-12 px-6 border border-cyan-900">Address</th>
                            <th className="h-12 px-6 border border-cyan-900">Pincode</th>
                            <th className="h-12 px-6 border border-cyan-900">Phone Number</th>
                            <th className="h-12 px-6 border border-cyan-900">Email</th>
                            <th className="h-12 px-6 border border-cyan-900">Date</th>
                            <th className="h-12 px-6 border border-cyan-900">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getAllOrder.map((order) =>
                            order.cartItems.map((item, index) => {
                                const { id, productImageUrl, title, category, price, quantity } = item;

                                return (
                                    <tr key={id || `${order.id}-${index}`} className="text-white even:bg-gray-800 border border-cyan-900">
                                        <td className="h-12 px-6 border border-cyan-900">{index + 1}</td>
                                        <td className="h-12 px-6 border border-cyan-900">{order.id}</td>
                                        <td className="h-12 px-6 border border-cyan-900">
                                            <img src={productImageUrl} alt="Product" className="w-16 h-16 object-cover rounded-md" />
                                        </td>
                                        <td className="h-12 px-6 border border-cyan-900">{title}</td>
                                        <td className="h-12 px-6 border border-cyan-900">{category}</td>
                                        <td className="h-12 px-6 border border-cyan-900">₹{price}</td>
                                        <td className="h-12 px-6 border border-cyan-900">{quantity}</td>
                                        <td className="h-12 px-6 border border-cyan-900">₹{price * quantity}</td>

                                        {/* Status Column with Edit */}
                                        <td className="h-12 px-6 border border-cyan-900">
                                          
                                            {editingOrderId === order.id ? (
                                                <div className="flex flex-col gap-2">
                                                    <select
                                                        value={newStatus}
                                                        onChange={(e) => setNewStatus(e.target.value)}
                                                        className=" px-2 py-1 rounded"
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="Processing">Processing</option>
                                                        <option value="Shipped">Shipped</option>
                                                        <option value="Delivered">Delivered</option>
                                                        <option className="text-red-900" value="Cancelled">Cancelled</option>
                                                    </select>

                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleStatusUpdate(order.id)}
                                                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={() => setEditingOrderId(null)}
                                                            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-green-600">{order.status}</span>
                                                    <button
                                                        onClick={() => handleEditClick(order.id, order.status)}
                                                        className="text-blue-600 hover:underline text-sm"
                                                    >
                                                        Edit
                                                    </button>
                                                </div>
                                            )}
                                        </td>

                                        <td className="h-12 px-6 border border-cyan-900">{order.addressInfo.name}</td>
                                        <td className="h-12 px-6 border border-cyan-900">{order.addressInfo.address}</td>
                                        <td className="h-12 px-6 border border-cyan-900">{order.addressInfo.pincode}</td>
                                        <td className="h-12 px-6 border border-cyan-900">{order.addressInfo.mobileNumber}</td>
                                        <td className="h-12 px-6 border border-cyan-900">{order.email}</td>
                                        <td className="h-12 px-6 border border-cyan-900">{order.date}</td>
                                        <td className="h-12 px-6 border border-cyan-900">
                                            <button onClick={() => deleteProduct(order.id)} className="text-red-800 cursor-pointer hover:underline">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderDetail;
