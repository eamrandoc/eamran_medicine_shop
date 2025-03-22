import { useNavigate } from "react-router-dom";
import useCart from "../../Hooks/useCart";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Cart = () => {
    const [ cart, isLoading, isError, error, refetch ] = useCart(); // Use the cart data from useCart hook
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    // Handle increasing quantity
    const increaseQuantity = async (medicineId) => {
        const medicine = cart.find(item => item._id === medicineId);
        if (medicine) {
            const updatedMedicine = { ...medicine, quantity: medicine.quantity + 1 };
            try {
                await axiosSecure.put(`/carts/${medicineId}`, updatedMedicine); // Update the quantity on the server
                refetch(); // Refresh the cart data
            } catch (error) {
                console.error("Error updating quantity:", error);
            }
        }
    };

    // Handle decreasing quantity
    const decreaseQuantity = async (medicineId) => {
        const medicine = cart.find(item => item._id === medicineId);
        if (medicine && medicine.quantity > 1) {
            const updatedMedicine = { ...medicine, quantity: medicine.quantity - 1 };
            try {
                await axiosSecure.put(`/carts/${medicineId}`, updatedMedicine); // Update the quantity on the server
                refetch(); // Refresh the cart data
            } catch (error) {
                console.error("Error updating quantity:", error);
            }
        }
    };

    // Handle removing a medicine from the cart
    const removeFromCart = async (medicineId) => {
        try {
            await axiosSecure.delete(`/carts/${medicineId}`); // Remove the medicine from the cart on the server
            refetch(); // Refresh the cart data
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    // Handle clearing the entire cart
    const clearCart = async () => {
        try {
            await axiosSecure.delete(`/carts?email=${user?.email}`); // Clear the entire cart from the server
            refetch(); // Refresh the cart data
        } catch (error) {
            console.error("Error clearing cart:", error);
        }
    };

    // Handle proceeding to checkout
    const handleCheckout = () => {
        navigate("/checkout");
    };

    // Calculate the total price
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Loading or error handling
    if (isLoading) {
        return <p>Loading cart...</p>;
    }

    if (isError) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-6">Your Cart</h2>

            {cart.length === 0 ? (
                <p className="text-center">Your cart is empty</p>
            ) : (
                <>
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border px-4 py-2">Name</th>
                                <th className="px-4 py-2">Price</th>
                                <th className="border px-4 py-2">Quantity</th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((medicine) => (
                                <tr key={medicine._id} className="text-center">
                                    <td className="border px-4 py-2">{medicine.name}</td>
                                    <td className="border px-4 py-2">${medicine.price}</td>
                                    <td className="border px-4 py-2">
                                        <button
                                            onClick={() => decreaseQuantity(medicine._id)}
                                            className="px-2 py-1 text-gray-500"
                                        >
                                            -
                                        </button>
                                        <span className="mx-2">{medicine.quantity}</span>
                                        <button
                                            onClick={() => increaseQuantity(medicine._id)}
                                            className="px-2 py-1 text-gray-500"
                                        >
                                            +
                                        </button>
                                    </td>
                                    <td className="border px-4 py-2">
                                        <button
                                            onClick={() => removeFromCart(medicine._id)}
                                            className="text-red-500"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex justify-between mt-4">
                        <button
                            onClick={clearCart}
                            className="btn btn-sm btn-danger"
                        >
                            Clear Cart
                        </button>
                        <div className="text-lg font-bold">
                            Total: ${total.toFixed(2)}
                        </div>
                    </div>

                    <div className="mt-4">
                        <button
                            onClick={handleCheckout}
                            className="btn btn-sm btn-success"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
