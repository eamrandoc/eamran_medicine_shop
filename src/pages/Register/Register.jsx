import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch, // Used to watch password value for validation
    } = useForm();

    const { signUp, updateUserProfile } = useAuth()
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false); // Track loading state for Google sign-in
    const [errorMessage, setErrorMessage] = useState(""); // Track error message from Google sign-in

    // Watch password to validate confirm password
    const password = watch("password");

    const onSubmit = (data) => {
        console.log("Form data:", data); // Handle your form submission here (e.g., save to Firebase)
        const { confirmPassword, ...dataWithoutConfirmPassword } = data;
        console.log("Form data without confirmPassword:", dataWithoutConfirmPassword);
        signUp(data?.email, data?.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        console.log('user profile info updated')
                        reset();
                        // Swal.fire({
                        //     position: 'top-end',
                        //     icon: 'success',
                        //     title: 'User created successfully.',
                        //     showConfirmButton: false,
                        //     timer: 1500
                        // });
                        navigate('/');

                    })
                    .catch(error => console.log(error))
            })

    };

    //   const handleGoogleSignIn = async () => {
    //     setIsLoading(true);
    //     try {
    //       const result = await signInWithPopup(auth, provider);
    //       const user = result.user;
    //       console.log("Google User:", user);
    //       // You can handle user data here, save to database, or redirect, etc.
    //     } catch (error) {
    //       setErrorMessage(error.message); // Capture any error during Google Sign-In
    //     } finally {
    //       setIsLoading(false);
    //     }
    //   };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="label">Name</label>
                        <input
                            id="name"
                            type="text"
                            {...register("name", { required: "Name is required" })}
                            className="input input-bordered w-full"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="label">Email</label>
                        <input
                            id="email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,4}$/,
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

                    {/* Confirm Password Field */}
                    <div>
                        <label htmlFor="confirmPassword" className="label">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            {...register("confirmPassword", {
                                required: "Confirm password is required",
                                validate: (value) =>
                                    value === password || "Passwords do not match",
                            })}
                            className="input input-bordered w-full"
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="w-full btn btn-primary">
                        Register
                    </button>
                </form>

                {/* Error message from Google Sign-in */}
                {errorMessage && (
                    <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                )}

                <div className="divider">OR</div>

                {/* Google Sign-In Button */}
                {/* <button
              onClick={handleGoogleSignIn}
              className="w-full btn btn-outline"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign up with Google"}
            </button> */}
            </div>
        </div>
    );
};

export default Register;