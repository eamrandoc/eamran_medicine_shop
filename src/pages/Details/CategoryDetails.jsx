import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const CategoryDetails = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { categoryName } = useParams(); // Get category name from URL
    const [searchTerm, setSearchTerm] = useState(""); // Search input
    const [sortOrder, setSortOrder] = useState("asc"); // Sort order (ascending or descending)
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [cart, setCart] = useState([]);
    console.log("cart", cart);

    // Fetch medicines by category
    const { data: medicines = [], isLoading, isError, error } = useQuery({
        queryKey: ["medicines", categoryName],
        queryFn: async () => {
            const res = await axiosPublic.get(`/medicines/${categoryName}`); // Make API call to fetch medicines by category
            return res.data; // Return data from the response
        },
    });


    // Handle Add to Cart
    const handleAddToCart = async (medicine) => {
        // Check if medicine is already in cart
        const existingMedicine = cart.find((item) => item._id === medicine._id);
        if (existingMedicine) {
            // Update the quantity if medicine already exists in cart
            setCart((prevCart) =>
                prevCart.map((item) =>
                    item._id === medicine._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            // Add new medicine to cart with quantity set to 1
            setCart((prevCart) => [...prevCart, { ...medicine, quantity: 1 }]);
        }

        // Add to cart on the server
        const res = await axiosSecure.post(`/carts`, medicine );
        if (res.data) {
            console.log("Medicine added to cart:", res.data);
        }
    };


    const handleViewMedicine = (medicine) => {
        setSelectedMedicine(medicine);
    };

    if (isLoading) {
        return <p className="text-center">Loading medicines...</p>;
    }

    if (isError) {
        return <p className="text-center">Error: {error.message}</p>;
    }


    // Filter and sort medicines
    const filteredMedicines = medicines
        .filter((medicine) =>
            medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) =>
            sortOrder === "asc" ? a.price - b.price : b.price - a.price
        );

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-6">
                Medicines in {categoryName}
            </h2>

            {/* Search and Sort Controls */}
            <div className="flex justify-between mb-4">
                <input
                    type="text"
                    placeholder="Search medicines..."
                    className="input input-bordered w-full max-w-xs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select
                    className="select select-bordered"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="asc">Sort by Price: Low to High</option>
                    <option value="desc">Sort by Price: High to Low</option>
                </select>
            </div>

            {/* Medicine Table */}
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">Name</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="border px-4 py-2">Price</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMedicines.map((medicine) => (
                            <tr key={medicine._id} className="text-center">
                                <td className="border px-4 py-2">{medicine.name}</td>
                                <td className="border px-4 py-2">{medicine.description}</td>
                                <td className="border px-4 py-2">${medicine.price}</td>
                                <td className="border px-4 py-2">
                                    {/* View Details Button */}
                                    {/* <button className="btn btn-sm btn-info mr-2">View Details</button> */}

                                    {/* Add to Cart Button */}
                                    {/* <button className="btn btn-sm btn-success">Add to Cart</button> */}


                                    <button
                                        onClick={() => handleViewMedicine(medicine)}
                                        className="px-4 py-2 text-blue-500"
                                    >
                                        👁️
                                    </button>
                                    <button
                                        onClick={() => handleAddToCart(medicine)}
                                        className="px-4 py-2 text-green-500"
                                    >
                                        🛒
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Modal to view medicine details */}
                {selectedMedicine && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                            <h3 className="text-2xl font-semibold">{selectedMedicine.name}</h3>
                            <img
                                src={selectedMedicine.image}
                                alt={selectedMedicine.name}
                                className="w-full h-40 object-cover mt-4 rounded-lg"
                            />
                            <p className="mt-4">{selectedMedicine.description}</p>
                            <p className="mt-2 text-lg font-bold">Price: {selectedMedicine.price}</p>
                            <button
                                onClick={() => setSelectedMedicine(null)}
                                className="mt-4 px-4 py-2 text-red-500 border border-red-500 rounded-lg"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryDetails;




// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "../../Hooks/useAxiosPublic";

// const CategoryDetails = () => {
//
//
//   const [selectedMedicine, setSelectedMedicine] = useState(null);
//   const [cart, setCart] = useState([]);


//   const handleAddToCart = (medicine) => {
//     setCart((prevCart) => [...prevCart, medicine]);
//   };

//   const handleViewMedicine = (medicine) => {
//     setSelectedMedicine(medicine);
//   };



//   return (
//     <div className="container mx-auto p-6">
//

//       <table className="table-auto w-full">
//         <thead>
//           <tr>
//             <th className="px-4 py-2">Medicine</th>
//             <th className="px-4 py-2">Description</th>
//             <th className="px-4 py-2">Price</th>
//             <th className="px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {medicines.map((medicine) => (
//             <tr key={medicine._id}>
//               <td className="border px-4 py-2">{medicine.name}</td>
//               <td className="border px-4 py-2">{medicine.description}</td>
//               <td className="border px-4 py-2">{medicine.price}</td>
//               <td className="border px-4 py-2">
// <button
//   onClick={() => handleViewMedicine(medicine)}
//   className="px-4 py-2 text-blue-500"
// >
//   👁️
// </button>
// <button
//   onClick={() => handleAddToCart(medicine)}
//   className="px-4 py-2 text-green-500"
// >
//   🛒
// </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Modal to view medicine details */}
//       {selectedMedicine && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
//             <h3 className="text-2xl font-semibold">{selectedMedicine.name}</h3>
//             <img
//               src={selectedMedicine.image}
//               alt={selectedMedicine.name}
//               className="w-full h-40 object-cover mt-4 rounded-lg"
//             />
//             <p className="mt-4">{selectedMedicine.description}</p>
//             <p className="mt-2 text-lg font-bold">Price: {selectedMedicine.price}</p>
//             <button
//               onClick={() => setSelectedMedicine(null)}
//               className="mt-4 px-4 py-2 text-red-500 border border-red-500 rounded-lg"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CategoryDetails;
