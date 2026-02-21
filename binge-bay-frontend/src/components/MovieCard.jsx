import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookmarkIcon, PlayIcon, StarIcon } from '@heroicons/react/24/solid';
import { BookmarkIcon as BookmarkOutline } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import { useWatchlist } from '../context/WatchlistContext';
import { getImageUrl, formatRating } from '../utils/helpers';
import toast from 'react-hot-toast';

const MovieCard = ({ movie, index = 0 }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const [imgError, setImgError] = useState(false);

  const inWatchlist = isInWatchlist(movie.id);
  const year = movie.release_date?.split('-')[0];

  const handleWatchlistClick = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error('Sign in to save movies!');
      return;
    }
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <motion.div
      className="group relative cursor-pointer rounded-xl overflow-hidden bg-bb-card flex-shrink-0"
      style={{ width: '180px' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <div className="relative aspect-[2/3]">
        <img
          src={imgError ? '/placeholder-movie.jpg' : getImageUrl(movie.poster_path, 'w342')}
          alt={movie.title}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bb-black via-bb-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded-full">
          <StarIcon className="w-3 h-3 text-bb-gold" />
          <span className="text-xs font-medium text-white">{formatRating(movie.vote_average)}</span>
        </div>

        <button
          onClick={handleWatchlistClick}
          className={`absolute top-2 right-2 p-1.5 rounded-full transition-all duration-200 ${
            inWatchlist
              ? 'bg-bb-red text-white'
              : 'bg-black/70 text-bb-muted hover:text-white hover:bg-black/90'
          }`}
        >
          {inWatchlist
            ? <BookmarkIcon className="w-4 h-4" />
            : <BookmarkOutline className="w-4 h-4" />
          }
        </button>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="bg-bb-red/90 hover:bg-bb-red text-white rounded-full p-3 transform scale-90 group-hover:scale-100 transition-transform">
            <PlayIcon className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="p-2">
        <h3 className="text-bb-text text-xs font-medium truncate">{movie.title}</h3>
        <p className="text-bb-muted text-xs mt-0.5">{year}</p>
      </div>
    </motion.div>
  );
};

export default MovieCard;