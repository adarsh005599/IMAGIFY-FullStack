import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import { assets } from '../assets/assets';

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
        <div className="flex text-center gap-2 sm:gap-3 items-center">
          {/* Buy/Credits Button */}
          <button
            onClick={() => navigate('/buy')}
            className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700"
          >
            <img className="w-5" src={assets.credit_star} alt="Credit" />
            <p className="text-xs sm:text-sm font-medium text-green-600">
              <span>Credits left: {credits ?? 'Loading...'}
              </span>
              
            </p>
          </button>

          {/* Username */}
          <p className="text-green-600 max-sm:hidden pl-3 pt-2">Hey,{user.name}</p>

          {/* Profile Menu */}
          <div className="relative group">
            <img
              src={assets.profile_icon}
              className="w-10 drop-shadow cursor-pointer"
              alt="Profile"
            />
            <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
              <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                <li
                  onClick={logout}
                  className="py-1 px-2 cursor-pointer pr-10"
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 sm:gap-5">
          {/* Pricing */}
          <p onClick={() => navigate('/buy')} className="cursor-pointer">
            Pricing
          </p>

          {/* Login Button */}
          <button
            onClick={() => setShowLogin(true)}
            className="bg-zinc-800 text-white px-7 py-2 sm:px-8 text-sm rounded-full hover:bg-zinc-800 transform transition-all duration-300 hover:scale-95 active:scale-90"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
