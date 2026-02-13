import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginImg from "../assets/login.webp";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { loginUser } from "../redux/slices/authSlice.js";
import { mergeCart } from "../redux/slices/cartSlice.js";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [hasMerged, setHasMerged] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { user, guestId, loading } = useSelector((state) => state.auth);

    // Get redirect parameter and check if it's checkout or something else
    const redirect = new URLSearchParams(location.search).get("redirect") || "/";
    const isCheckoutRedirect = redirect.includes("checkout");

    useEffect(() => {
        if (!user || hasMerged) return;
        const handlePostLogin = async () => {
            try {
                if (guestId) {
                    if (localStorage.getItem("cart")) {
                        await dispatch(mergeCart({ guestId })).unwrap();
                    }
                    localStorage.removeItem("guestId");
                }

                setHasMerged(true);
                navigate(isCheckoutRedirect ? "/checkout" : "/");
            } catch (error) {
                console.error("Cart merge failed: ", error);
            }
        };

        handlePostLogin();
    }, [user, guestId, hasMerged, navigate, isCheckoutRedirect, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    }

    return (
        <div className="flex ">
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
                <form onSubmit={handleSubmit}
                    className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm"
                >
                    <div className="flex justify-center mb-6">
                        <h2 className="text-xl font-medium">Shozada</h2>
                    </div>
                    <h2 className="text-2xl font-bold text-center mb-6">Hey there! 👋 </h2>
                    <p className="text-center mb-6">Enter your email and password to Login.</p>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Email</label>
                        <input type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter your email address"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Password</label>
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 pr-10 border rounded"
                                placeholder="Enter your password"
                                required
                            />
                            {/* Password visibility toggle */}
                            <button type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                title={showPassword ? "Hide password" : "Show Password"}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer text-xl text-gray-600 hover:text-gray-800 p-1"
                            >
                                {showPassword ? <IoEyeOff /> : <IoEye />}
                            </button>
                        </div>
                    </div>
                    <button type="submit"
                        className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-500 transition"
                    >
                        {loading ? "loading..." : "Sign In"}
                    </button>
                    <p className="mt-6 text-center text-sm">
                        Don't have and account? {" "}
                        <Link to={`/register?redirect=${encodeURIComponent(redirect)}`}
                            className="text-blue-500"
                        >Register</Link>
                    </p>
                </form>
            </div>
            <div className="hidden md:block w-1/2 bg-gray-800">
                <div className="h-full flex flex-col justify-center items-center">
                    <img src={loginImg}
                        alt="Login to Account"
                        className="h-[750px] w-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
}

export default Login
