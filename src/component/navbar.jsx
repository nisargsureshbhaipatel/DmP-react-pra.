import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart, Search } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("username");
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUser(null); // ✅ React way (no reload)
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
            <Link to="/" className="hover:text-indigo-600">Home</Link>
            <Link to="/explore" className="hover:text-indigo-600">Explore</Link>
            <Link to="/sell" className="hover:text-indigo-600">Sell Books</Link>
            <Link to="/categories" className="hover:text-indigo-600">Categories</Link>
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
          <div className="hidden md:flex items-center gap-4">
            <ShoppingCart className="cursor-pointer hover:text-indigo-600" />

            {user ? (
              <>
                <span>Hi, {user} 👋</span>
                <button onClick={handleLogout} className="text-red-600">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/register">
                  <button className="border border-indigo-600 px-4 py-2 rounded-lg">
                    Register
                  </button>
                </Link>

                <Link to="/signin">
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
                    Sign In
                  </button>
                </Link>
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
              <span>Hi, {user}</span>
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
