import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, Search } from "lucide-react";

const Navbar = () => {
 const [userDetails, setUserDetails] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  

  useEffect(() => {
    const savedUser = localStorage.getItem("userDetails");

    if (savedUser) {
      setUserDetails(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    setUserDetails(null);
    navigate("/signin");
  };


  return (
    <nav className="bg-gray-300 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <span className="text-2xl font-bold text-indigo-600">
            📚 BookVerse
          </span>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="hover:text-indigo-600 active:scale-95">
              Home
            </Link>
            <Link
              to="/explore"
              className="hover:text-indigo-600 active:scale-95"
            >
              Explore
            </Link>
            <Link to="/sell" className="hover:text-indigo-600 active:scale-95 ">
              Sell Books
            </Link>
            <Link
              to="/categories"
              className="hover:text-indigo-600  active:scale-95"
            >
              Categories
            </Link>
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-lg">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search books..."
              className="bg-transparent outline-none px-2"
            />
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">

  {!userDetails ? (
    <>
      <button
        onClick={() => navigate("/register")}
        className="border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-indigo-50 transition"
      >
        Register
      </button>

      <button
        onClick={() => navigate("/signin")}
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
      >
        Sign In
      </button>
    </>
  ) : (
    <>
      <span className="text-gray-700 font-medium">
        Hi, <span className="text-indigo-600">{userDetails.fullName}</span> 👋
      </span>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition"
      >
        Logout
      </button>
    </>
  )}

</div>


          {/* Mobile Button */}
          <div className="md:hidden">
            <button onClick={() => setOpen(!open)}>
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white px-4 pb-4 shadow flex flex-col gap-4">
          <Link to="/">Home</Link>
          <Link to="/explore">Explore</Link>
          <Link to="/sell">Sell Books</Link>
          <Link to="/categories">Categories</Link>

          {user ? (
            <>
              <span>Hi, {}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/register">Register</Link>
              <Link to="/signin">Sign In</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
