import { Link, NavLink } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
// import useCart from '../Hooks/useCart';

const Navbar = () => {
    const { user, logOut } = useAuth();
    // const [cart,refetch] = useCart()
    const handleLogout = async () => {
        try {
            await logOut(); // Log the user out using the logOut function from AuthContext
        } catch (error) {
            console.error("Logout error:", error.message);
        }
    };
    const menu = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/shop'}>Shop</NavLink></li>
    </>
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {
                                menu
                            }
                        </ul>
                    </div>
                    <Link to={"/"} className="btn btn-ghost text-xl">Ruma Medicine Shop</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            menu
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    {/* cart will show */}
                    {/* If logged in, display profile image and logout button */}
                    {user ? (
                        <div className="flex items-center space-x-3">
                            {/* Cart icon and count */}


                            {/* {cart && cart.length > 0 && ( */}
                                {/* // <div className="relative"> */}
                                    {/* <Link to="/cart" className="btn btn-ghost"> */}
                                        {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> */}
                                            {/* <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18l-1 12H4L3 3z" /> */}
                                        {/* </svg> */}
                                        {/* Display cart item count */}
                                        {/* <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full px-1">{cart?.length}</span> */}
                                    {/* </Link> */}
                                {/* </div> */}
                            {/* )} */}

                            

                            {/* Profile image */}
                            <img
                                src={user.photoURL || 'https://via.placeholder.com/40'}
                                alt="Profile"
                                className="w-10 h-10 rounded-full"
                            />
                            <button
                                onClick={handleLogout}
                                className="btn btn-error text-sm"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        // If not logged in, display Sign In and Register buttons
                        <div className="flex items-center space-x-3">
                            <Link to="/login" className="btn btn-primary text-sm">Sign In</Link>
                            <Link to="/register" className="btn btn-secondary text-sm">Register</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;