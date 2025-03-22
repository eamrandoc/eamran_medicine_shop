import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCart = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth(); // Get the user data from authentication hook

    // Use React Query to fetch cart data for the current user
    const { data: cart = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ["cart", user?.email],  // Use user's email as query key for cart
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user?.email}`);
            return res.data; // Return cart data from the response
        },
        enabled: !!user?.email,  // Only run query if the user email is available
    });

    // Return the data, loading, error, and refetch functions to be used by components
    console.log("object", cart);
    return [ cart, isLoading, isError, error, refetch ];
};

export default useCart;
