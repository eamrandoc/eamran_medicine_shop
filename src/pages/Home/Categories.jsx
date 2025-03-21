import { Link } from "react-router-dom";


const Categories = () => {
    const categories = [
        { id: 1, name: 'Painkillers', medicineCount: 12, image: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Antibiotics', medicineCount: 8, image: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Vitamins', medicineCount: 15, image: 'https://via.placeholder.com/150' },
        { id: 4, name: 'Cold & Cough', medicineCount: 10, image: 'https://via.placeholder.com/150' },
        { id: 5, name: 'Allergy Medications', medicineCount: 6, image: 'https://via.placeholder.com/150' },
        { id: 6, name: 'Digestive Health', medicineCount: 7, image: 'https://via.placeholder.com/150' },
    ];
    return (
        <div>
            <section className="p-6">
                <h2 className="text-2xl font-bold text-center mb-4">Medicine Categories</h2>
                {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {categories.map((category, index) => (
                        <Link key={index} href={`/category/${category.name.toLowerCase()}`}>
                            <div className="border p-4 text-center cursor-pointer hover:shadow-lg">
                                <img src={category.image} alt={category.name} className="w-full h-24 object-cover" />
                                <h3 className="mt-2 font-bold">{category.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div> */}







                <div className="min-h-screen p-4 bg-gray-100">
                    <h2 className="text-3xl font-semibold text-center mb-6">Categories</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                        {categories.map(category => (
                            <div className="card w-60 bg-base-100 shadow-md hover:shadow-lg">
                                <figure>
                                    <img src={category.image || 'https://via.placeholder.com/150'} alt={category.name} className="w-full h-40 object-cover" />
                                </figure>
                                <div className="card-body">
                                    <h3 className="card-title text-xl">{category.name}</h3>
                                    <p>{category.medicineCount} medicines</p>
                                    <div className="card-actions justify-end">
                                        <Link to={`/category/${category.id}`} className="btn btn-primary">View Medicines</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>




                
            </section>

        </div>
    );
};

export default Categories;