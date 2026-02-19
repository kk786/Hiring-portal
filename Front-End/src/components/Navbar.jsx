import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header className="w-full border-b border-gray-900 bg-gray-900">

            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">

                {/* Left */}
                <h1
                    className="auth-title cursor-pointer m-0"
                    onClick={() => navigate("/")}
                >
                    Hiring-Portal
                </h1>

                {/* Right */}
                <div className="flex items-center gap-4">

                    {user ? (
                        <>
              <span className="auth-label m-0">
                {user.name}
              </span>

                            <button
                                onClick={handleLogout}
                                className="auth-btn px-4 py-1"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => navigate("/")}
                            className="auth-btn px-4 py-1"
                        >
                            Login
                        </button>
                    )}

                </div>
            </div>

        </header>
    );
};

export default Navbar;
