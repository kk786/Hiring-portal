import { useState, useContext} from "react";
import { registerUser, loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../context/AuthContext.jsx";

const LoginPage = () => {

    const {login} = useContext(AuthContext);

    const navigate = useNavigate();

    const [isSignup, setIsSignup] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    // Submit handler (Login + Register)
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        // Validation
        if (isSignup && !formData.name.trim()) {
            return setError("Name is required");
        }

        if (!formData.email.trim()) {
            return setError("Email is required");
        }

        if (!formData.password.trim()) {
            return setError("Password is required");
        }

        try {
            setLoading(true);

            let data;

            if (isSignup) {
                data = await registerUser(formData);
                alert("Registration successful!");
            } else {
                data = await loginUser(formData);

                login(data.user, data.token);

                // Save token
                // localStorage.setItem("token", data.token);

                // Save user info
                // localStorage.setItem("user", JSON.stringify(data.user));

                navigate("/dashboard");

            }

            console.log("Response:", data);

        } catch (err) {
            setError(
                err.response?.data?.message || "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-bg">

            <div className="auth-card">

                {/* Logo */}
                <div className="flex justify-center mb-4">
                    <img
                        src="/assets/Logo.png"
                        alt="Hiring Portal Logo"
                        className="auth-logo"
                    />
                </div>

                {/* Title */}
                <h2 className="auth-title">
                    {isSignup ? "Create Account" : "Welcome Back"}
                </h2>

                {/* Error */}
                {error && <p className="auth-error">{error}</p>}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Name (Signup only) */}
                    {isSignup && (
                        <div>
                            <label className="auth-label">Name</label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="auth-input"
                            />
                        </div>
                    )}

                    {/* Email */}
                    <div>
                        <label className="auth-label">Email</label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="auth-input"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="auth-label">Password</label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="auth-input"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="auth-btn"
                    >
                        {loading
                            ? "Please wait..."
                            : isSignup
                                ? "Sign Up"
                                : "Login"}
                    </button>

                </form>

                {/* Switch */}
                <p
                    className="auth-switch"
                    onClick={() => {
                        setIsSignup(!isSignup);
                        setError("");
                    }}
                >
                    {isSignup
                        ? "Already have an account? Login"
                        : "Don't have an account? Sign Up"}
                </p>

            </div>

        </div>
    );
};

export default LoginPage;
