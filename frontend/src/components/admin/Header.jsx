import { Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();

    const getPageTitle = (pathname) => {
        switch (pathname) {
            case "/admin/dashboard":
                return "Admin Dashboard";
            case "/admin/products":
                return "Products";
            case "/admin/users":
                return "Users";
            default:
                return "Settings";
        }
    };
    const [showDropdown, setShowDropdown] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const handleLogout = () => {
        // Thêm logic logout ở đây
        console.log('Logging out...');
        // Có thể redirect hoặc clear token
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    const toggleMode = (e) => {
        e.preventDefault();
        setIsDarkMode(!isDarkMode);
        const html = document.querySelector("html");
        html.classList.toggle("dark");
    }
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <header className="bg-white dark:bg-slate-900 shadow-sm transition-colors border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <h1 className="text-2xl font-bold">{getPageTitle(location.pathname)}</h1>
                </div>

                <div className="relative flex gap-5 items-center">
                    <button onClick={toggleMode} className='relative border w-12 py-2 rounded-full cursor-pointer'>
                        <div className={`p-1 absolute ${isDarkMode ? " translate-x-full bg-slate-950 text-white" : "-translate-x-1 bg-white"} top-1/2  -translate-y-1/2 border rounded-full  transition-transform`}>
                            {!isDarkMode ? <Moon size={15} /> : <Sun size={15} />}
                        </div>
                    </button>
                    <div
                        className="flex items-center space-x-3 cursor-pointer hover:dark:bg-gray-700 px-3 py-2 rounded-lg transition-colors duration-200"
                        onClick={toggleDropdown}
                    >
                        <img
                            src="https://ui-avatars.com/api/?name=Admin&background=4f46e5&color=fff&size=40"
                            alt="Avatar"
                            className="w-10 h-10 rounded-full ring-2 ring-indigo-500 ring-offset-2"
                        />
                        <span className="font-medium hidden md:block">Admin</span>
                        <svg
                            className={`w-4 h-4 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 11a.5.5 0 0 1-.354-.146l-3-3a.5.5 0 0 1 .708-.708L8 9.793l2.646-2.647a.5.5 0 0 1 .708.708l-3 3A.5.5 0 0 1 8 11z" />
                        </svg>
                    </div>

                    {showDropdown && (
                        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                            <div className="px-4 py-3 border-b border-gray-100">
                                <p className="text-sm font-medium text-gray-900">Admin User</p>
                                <p className="text-sm text-gray-500 truncate">admin@example.com</p>
                            </div>

                            <div className="py-1">
                                <div className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                                    <svg className="w-4 h-4 mr-3 text-gray-400" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                    </svg>
                                    Profile
                                </div>

                                <div className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                                    <svg className="w-4 h-4 mr-3 text-gray-400" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                                    </svg>
                                    Settings
                                </div>

                                <hr className="my-1 border-gray-200" />

                                <div
                                    className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer transition-colors duration-150"
                                    onClick={handleLogout}
                                >
                                    <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                        <path d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                    </svg>
                                    Logout
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header; 