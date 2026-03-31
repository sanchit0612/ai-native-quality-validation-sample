import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import { useAuthStore } from '../store/authStore';

const Header = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <svg
              className="h-8 w-8 text-airbnb-red group-hover:scale-110 transition-transform"
              viewBox="0 0 32 32"
              fill="currentColor"
            >
              <path d="M16 1c2 0 3.46 1.5 3.46 3.8 0 2.6-2.5 6-3.46 7.3-.96-1.3-3.46-4.7-3.46-7.3C12.54 2.5 14 1 16 1zm0 14.5c4.5 0 8.5 1.5 11.5 4C29 21 30 23 30 25.5c0 2.8-2.2 5-5 5H7c-2.8 0-5-2.2-5-5 0-2.5 1-4.5 2.5-6 3-2.5 7-4 11.5-4z" />
            </svg>
            <span className="ml-2 text-xl font-semibold text-gray-800 group-hover:text-airbnb-red transition">
              Demo Github App
            </span>
          </Link>

          {/* Right Section */}
          <div className="flex items-center space-x-3">

            <Link
              to="/become-host"
              className="hidden md:block text-sm font-medium text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-full transition"
            >
              Become a Host
            </Link>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 border border-gray-300 rounded-full py-2 px-3 hover:shadow-md hover:border-gray-400 transition-all"
              >
                <FaBars className="text-gray-600" />
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.firstName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="text-gray-500 text-2xl" />
                )}
              </button>

              {/* Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-lg py-2 border border-gray-200 transform transition-all duration-200 ease-out scale-95 opacity-100">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/bookings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        My Bookings
                      </Link>
                      <Link
                        to="/favorites"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Favorites
                      </Link>

                      <div className="border-t my-2"></div>

                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-gray-800 font-medium hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Log in
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-2 text-sm text-gray-800 font-medium hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Sign up
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
