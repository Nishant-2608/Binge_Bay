import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { MagnifyingGlassIcon, BookmarkIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bb-dark/95 backdrop-blur-md shadow-2xl border-b border-bb-border'
          : 'bg-transparent'
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-1">
            <span className="font-display text-3xl text-bb-red tracking-wider">BINGE</span>
            <span className="font-display text-3xl text-bb-text tracking-wider">BAY</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/"
              className={`text-sm font-medium transition-colors hover:text-bb-red ${
                location.pathname === '/' ? 'text-bb-red' : 'text-bb-muted'
              }`}>
              Home
            </Link>
            <Link to="/search"
              className={`text-sm font-medium transition-colors hover:text-bb-red ${
                location.pathname === '/search' ? 'text-bb-red' : 'text-bb-muted'
              }`}>
              Browse
            </Link>
            {isAuthenticated && (
              <Link to="/watchlist"
                className={`text-sm font-medium transition-colors hover:text-bb-red flex items-center gap-1 ${
                  location.pathname === '/watchlist' ? 'text-bb-red' : 'text-bb-muted'
                }`}>
                <BookmarkIcon className="w-4 h-4" />
                Watchlist
              </Link>
            )}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate('/search')}
              className="text-bb-muted hover:text-bb-text transition-colors p-2"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-bb-muted text-sm">
                  Hi, <span className="text-bb-text font-medium">{user?.username}</span>
                </span>
                <button
                  onClick={logout}
                  className="px-4 py-1.5 text-sm border border-bb-border text-bb-muted hover:text-bb-text hover:border-bb-text rounded-full transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login"
                  className="px-4 py-1.5 text-sm text-bb-muted hover:text-bb-text transition-colors">
                  Sign In
                </Link>
                <Link to="/register"
                  className="px-4 py-1.5 text-sm bg-bb-red hover:bg-bb-red-hover text-white rounded-full transition-colors font-medium">
                  Join Free
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-bb-text p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen
              ? <XMarkIcon className="w-6 h-6" />
              : <Bars3Icon className="w-6 h-6" />
            }
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-bb-dark border-t border-bb-border overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              <Link to="/" onClick={() => setMenuOpen(false)}
                className="text-bb-text hover:text-bb-red transition-colors">
                Home
              </Link>
              <Link to="/search" onClick={() => setMenuOpen(false)}
                className="text-bb-text hover:text-bb-red transition-colors">
                Browse
              </Link>
              {isAuthenticated ? (
                <>
                  <Link to="/watchlist" onClick={() => setMenuOpen(false)}
                    className="text-bb-text hover:text-bb-red transition-colors">
                    My Watchlist
                  </Link>
                  <button
                    onClick={() => { logout(); setMenuOpen(false); }}
                    className="text-left text-bb-muted hover:text-bb-text transition-colors">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)}
                    className="text-bb-text hover:text-bb-red transition-colors">
                    Sign In
                  </Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)}
                    className="text-white bg-bb-red px-4 py-2 rounded-full text-center">
                    Join Free
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;