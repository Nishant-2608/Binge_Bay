import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getWatchlist, addToWatchlist as apiAdd, removeFromWatchlist as apiRemove } from '../api/backend';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const WatchlistContext = createContext(null);

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const fetchWatchlist = useCallback(async () => {
    if (!isAuthenticated) { setWatchlist([]); return; }
    setLoading(true);
    try {
      const res = await getWatchlist();
      setWatchlist(res.data);
    } catch (err) {
      console.error('Failed to fetch watchlist', err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => { fetchWatchlist(); }, [fetchWatchlist]);

  const addToWatchlist = async (movie) => {
    try {
      const dto = {
        tmdbMovieId: movie.id,
        movieTitle: movie.title,
        posterPath: movie.poster_path,
        releaseDate: movie.release_date,
        voteAverage: movie.vote_average,
        overview: movie.overview,
      };
      const res = await apiAdd(dto);
      setWatchlist((prev) => [...prev, res.data]);
      toast.success('Added to watchlist! 🎬');
    } catch (err) {
      if (err.response?.data?.message?.includes('already')) {
        toast.error('Already in your watchlist!');
      } else {
        toast.error('Failed to add to watchlist');
      }
    }
  };

  const removeFromWatchlist = async (tmdbMovieId) => {
    try {
      await apiRemove(tmdbMovieId);
      setWatchlist((prev) => prev.filter((item) => item.tmdbMovieId !== tmdbMovieId));
      toast.success('Removed from watchlist');
    } catch (err) {
      toast.error('Failed to remove from watchlist');
    }
  };

  const isInWatchlist = (tmdbMovieId) =>
    watchlist.some((item) => item.tmdbMovieId === tmdbMovieId);

  return (
    <WatchlistContext.Provider value={{ watchlist, loading, addToWatchlist, removeFromWatchlist, isInWatchlist, fetchWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error('useWatchlist must be used within WatchlistProvider');
  return ctx;
};