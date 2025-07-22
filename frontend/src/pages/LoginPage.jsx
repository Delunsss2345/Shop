import { useAuthStore } from "@/store/useAuthStore";
import { Eye, EyeOff, Lock, LogIn, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaFacebook, FaPinterest } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      return toast.error("Sai định dạng email");
    }

    if (!/^.{6,}$/.test(formData.password)) {
      return toast.error("Mật khẩu quá ngắn");
    }

    await login(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Login Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl px-10 py-8 backdrop-blur-sm bg-opacity-95">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center">
              <LogIn className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-2">
            Chào Mừng Trở Lại
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Chỉ cần đăng nhập, mua đồ công nghệ là siêu nhanh
          </p>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              {/* Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>
            {/* Forgot Password */}
            <div className="text-right mb-4 mt-1 tracking-wide">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                Quên mật khẩu ?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-900 dark:bg-gray-700 text-white py-2 px-3 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-normal tracking-wider"
            >
              {isLoading ? "Signing in..." : "Get Started"}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 mb-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  hoặc đăng nhập với
                </span>
              </div>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-3 items-center space-x-4">
            <button className="bg-white hover:bg-slate-300 cursor-pointer dark:bg-slate-800 border border-gray-300 rounded-lg flex items-center justify-center p-3 hover:shadow-md transition">
              <FcGoogle size={25} />
            </button>
            <button className=" bg-white hover:bg-slate-300 cursor-pointer dark:bg-slate-800 border border-gray-300 rounded-lg flex items-center justify-center p-3 hover:shadow-md transition">
              <FaFacebook className="text-blue-600" size={25} />
            </button>
            <button className=" bg-white hover:bg-slate-300 cursor-pointer dark:bg-slate-800 border border-gray-300 rounded-lg flex items-center justify-center p-3 hover:shadow-md transition">
              <FaPinterest color="#E60023" size={25} />
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-2 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Bạn chưa có tài khoản?{" "}
              <Link
                to="/signup"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
              >
                Đăng ký
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
