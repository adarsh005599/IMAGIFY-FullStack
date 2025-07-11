import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import { assets } from '../assets/assets';
import { FaHome } from 'react-icons/fa';

const Navbar = () => {
  const { user, setShowLogin, logout, credits } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between py-4 px-6">
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} className="w-28 sm:w-32 lg:w-40" alt="Logo" />
      </Link>

      {/* Right Section */}
      {user ? (
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Home Icon */}
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-full bg-zinc-800 text-white hover:bg-zinc-700 transition-all duration-300 hover:scale-105"
            title="Home"
          >
            <FaHome className="text-lg" />
          </button>

          {/* Buy/Credits Button */}
          <button
            onClick={() => navigate('/buy')}
            className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-2 rounded-full hover:scale-105 transition-all duration-300"
          >
            <img className="w-5" src={assets.credit_star} alt="Credit" />
            <p className="text-sm font-medium text-green-600">
              Credits: {credits ?? 'Loading...'}
            </p>
          </button>

          {/* Username */}
          <p className="text-green-600 max-sm:hidden pl-3">Hey, {user.name}</p>

          {/* Profile Dropdown */}
          <div className="relative group">
            <img
              src={assets.profile_icon}
              className="w-10 cursor-pointer"
              alt="Profile"
            />
            <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
              <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                <li
                  onClick={logout}
                  className="py-1 px-2 cursor-pointer pr-10 hover:text-red-600"
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Home Icon */}
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-full bg-zinc-800 text-white hover:bg-zinc-700 transition-all duration-300 hover:scale-105"
            title="Home"
          >
            <FaHome className="text-lg" />
          </button>

          {/* Pricing Button */}
          <button
            onClick={() => navigate('/buy')}
            className="bg-zinc-800 text-white px-6 py-2 text-sm rounded-full hover:bg-zinc-700 transform transition-all duration-300 hover:scale-95 active:scale-90"
          >
            Pricing
          </button>

          {/* Login Button */}
          <button
            onClick={() => setShowLogin(true)}
            className="bg-zinc-800 text-white px-6 py-2 text-sm rounded-full hover:bg-zinc-700 transform transition-all duration-300 hover:scale-95 active:scale-90"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
