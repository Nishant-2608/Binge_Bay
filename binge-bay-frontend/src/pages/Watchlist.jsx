import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookmarkSlashIcon, StarIcon } from '@heroicons/react/24/solid';
import { useWatchlist } from '../context/WatchlistContext';
import { getImageUrl, formatRating } from '../utils/helpers';

const Watchlist = () => {
  const { watchlist, loading, removeFromWatchlist } = useWatchlist();
  const navigate = useNavigate();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-bb-black">
      <div className="w-12 h-12 border-4 border-bb-red border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-bb-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-5xl text-bb-text mb-1">My Watchlist</h1>
          <p className="text-bb-muted text-sm">
            {watchlist.length} movie{watchlist.length !== 1 ? 's' : ''} saved
          </p>
        </motion.div>

        {watchlist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32"
          >
            <div className="text-8xl mb-6">🎬</div>
            <h2 className="text-bb-text text-2xl font-medium mb-3">Nothing saved yet</h2>
            <p className="text-bb-muted mb-6">Browse movies and bookmark ones you want to watch</p>
            <button
              onClick={() => navigate('/search')}
              className="px-6 py-3 bg-bb-red hover:bg-bb-red-hover text-white rounded-full font-medium transition-colors"
            >
              Browse Movies
            </button>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AnimatePresence>
              {watchlist.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  className="group relative bg-bb-card rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/movie/${item.tmdbMovieId}`)}
                >
                  <div className="aspect-[2/3] relative">
                    <img
                      src={getImageUrl(item.posterPath, 'w342')}
                      alt={item.movieTitle}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-card-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/70 px-2 py-0.5 rounded-full">
                      <StarIcon className="w-3 h-3 text-bb-gold" />
                      <span className="text-xs text-white">{formatRating(item.voteAverage)}</span>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); removeFromWatchlist(item.tmdbMovieId); }}
                      className="absolute top-2 right-2 p-1.5 bg-bb-red/80 hover:bg-bb-red rounded-full text-white opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <BookmarkSlashIcon className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-2">
                    <h3 className="text-bb-text text-xs font-medium truncate">{item.movieTitle}</h3>
                    <p className="text-bb-muted text-xs mt-0.5">{item.releaseDate?.split('-')[0]}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;