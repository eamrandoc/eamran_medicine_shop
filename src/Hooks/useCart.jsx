import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCart = () => {
    const axiosSecure =useAxiosSecure()
    const {user} = useAuth()
    const { data: cart = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ["cart", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user?.email}`);
            return res.data;
        },
    });
    if (isLoading) {
        return <p className="text-center">Loading medicines...</p>;
    }

    if (isError) {
        return <p className="text-center">Error: {error.message}</p>;
    }

    return [cart, refetch]
};

export default useCart;