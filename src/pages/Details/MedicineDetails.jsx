import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const MedicineDetails = () => {
    const axiosPublic = useAxiosPublic()
    const { id } = useParams(); // Get medicine ID from URL

    // Fetch medicine details
    const { data: medicine, isLoading } = useQuery({
        queryKey: ["medicine", id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/medicines/${id}`);
            return res.data; // Return data from the response
        },
    });

    if (isLoading) {
        return <p className="text-center">Loading medicine details...</p>;
    }

    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Medicine Image */}
                <img
                    src={medicine.image}
                    alt={medicine.name}
                    className="w-full md:w-1/3 rounded-lg shadow-lg"
                />

                {/* Medicine Details */}
                <div className="md:w-2/3">
                    <h2 className="text-3xl font-bold mb-4">{medicine.name}</h2>
                    <p className="text-gray-600 mb-2"><strong>Category:</strong> {medicine.category}</p>
                    <p className="text-gray-600 mb-2"><strong>Company:</strong> {medicine.company}</p>
                    <p className="text-gray-600 mb-2"><strong>Stock:</strong> {medicine.stock} available</p>
                    <p className="text-gray-600 mb-2"><strong>Price:</strong> ${medicine.price}</p>
                    <p className="text-gray-700 mb-4">{medicine.description}</p>

                    {/* Add to Cart Button */}
                    <button className="btn btn-primary">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default MedicineDetails;
