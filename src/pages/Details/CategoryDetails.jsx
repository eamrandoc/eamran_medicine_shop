import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useState } from "react";

const CategoryDetails = () => {
    const axiosPublic = useAxiosPublic();
    const { categoryName } = useParams(); // Get category name from URL
    const [searchTerm, setSearchTerm] = useState(""); // Search input
    const [sortOrder, setSortOrder] = useState("asc"); // Sort order (ascending or descending)

    // Fetch medicines by category
    const { data: medicines = [], isLoading, isError, error } = useQuery({
        queryKey: ["medicines", categoryName],
        queryFn: async () => {
            const res = await axiosPublic.get(`/medicines/${categoryName}`); // Make API call to fetch medicines by category
            return res.data; // Return data from the response
        },
    });

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
                            <th className="border px-4 py-2">Price</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMedicines.map((medicine) => (
                            <tr key={medicine._id} className="text-center">
                                <td className="border px-4 py-2">{medicine.name}</td>
                                <td className="border px-4 py-2">${medicine.price}</td>
                                <td className="border px-4 py-2">
                                    {/* View Details Button */}
                                    <button className="btn btn-sm btn-info mr-2">View Details</button>

                                    {/* Add to Cart Button */}
                                    <button className="btn btn-sm btn-success">Add to Cart</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CategoryDetails;