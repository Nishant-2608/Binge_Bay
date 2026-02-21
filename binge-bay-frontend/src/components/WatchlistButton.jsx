import { motion } from 'framer-motion';
import { BookmarkIcon } from '@heroicons/react/24/solid';
import { BookmarkIcon as BookmarkOutline } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import { useWatchlist } from '../context/WatchlistContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const WatchlistButton = ({ movie, className = '' }) => {
  const { isAuthenticated } = useAuth();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const navigate = useNavigate();
  const inWatchlist = isInWatchlist(movie?.id);

  const handleClick = () => {
    if (!isAuthenticated) {
      toast.error('Sign in to save movies to your watchlist!');
      navigate('/login');
      return;
    }
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all ${
        inWatchlist
          ? 'bg-bb-red text-white'
          : 'glass text-bb-muted hover:text-white'
      } ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {inWatchlist
        ? <><BookmarkIcon className="w-5 h-5" /> Saved</>
        : <><BookmarkOutline className="w-5 h-5" /> Watchlist</>
      }
    </motion.button>
  );
};

export default WatchlistButton;