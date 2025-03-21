import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";



const Categories = () => {
    const axiosPublic = useAxiosPublic()
    const { data: categories = [], isLoading, isError, error } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
          const res = await axiosPublic.get("/categories");
          return res.data;
        },
      });
    
      if (isLoading) {
        return <p className="text-center">Loading categories...</p>;
      }
    
      if (isError) {
        return <p className="text-center">Error: {error.message}</p>;
      }
    
    
    return (
        <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Medicine Categories</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            to={`/category/${category.name}`} // Navigate to category details page
            key={category._id}
            className="p-4 border rounded-lg shadow-lg hover:shadow-xl transition duration-300"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold mt-4">{category.name}</h3>
            <p className="text-gray-600">{category.medicineCount} medicines</p>
          </Link>
        ))}
      </div>
    </div>
    );
};

export default Categories;
