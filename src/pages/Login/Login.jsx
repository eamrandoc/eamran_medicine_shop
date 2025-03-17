import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const { signIn, loading, setLoading } = useAuth();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(""); // Track error message from login

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        setErrorMessage(""); // Reset error message on form submit

        try {
            const { email, password } = data;

            // Call the signIn method from AuthContext to log the user in
            await signIn(email, password);

            console.log("User logged in successfully!");
            // Redirect user or show a success message (you can use react-router to redirect if needed)

            navigate("/dashboard")

        } catch (error) {
            setErrorMessage(error.message); // Set error message if login fails
            console.error("Login error:", error.message);
        } finally {
            setLoading(false); // Stop loading when the process is done
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="label">Email</label>
                        <input
                            id="email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Invalid email format",
                                },
                            })}
                            className="input input-bordered w-full"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="label">Password</label>
                        <input
                            id="password"
                            type="password"
                            {...register("password", { required: "Password is required" })}
                            className="input input-bordered w-full"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Error Message */}
                    {errorMessage && (
                        <p className="text-red-500 text-sm">{errorMessage}</p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
