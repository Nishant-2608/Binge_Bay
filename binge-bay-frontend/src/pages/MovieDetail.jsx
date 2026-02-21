import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlayIcon, StarIcon, ClockIcon, CalendarIcon } from '@heroicons/react/24/solid';
import { getMovieDetails, getMovieTrailers, getSimilarMovies } from '../api/backend';
import { getImageUrl, formatDate, formatRuntime, formatRating, getYouTubeKey } from '../utils/helpers';
import TrailerModal from '../components/TrailerModal';
import MovieGrid from '../components/MovieGrid';
import WatchlistButton from '../components/WatchlistButton';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [movieRes, trailerRes, similarRes] = await Promise.all([
          getMovieDetails(id),
          getMovieTrailers(id),
          getSimilarMovies(id),
        ]);
        setMovie(movieRes.data);
        setTrailerKey(getYouTubeKey(trailerRes.data));
        setSimilar(similarRes.data.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-bb-black flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-bb-red border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!movie) return null;

  return (
    <div className="min-h-screen bg-bb-black">
      {/* Backdrop */}
      <div className="relative h-[70vh] overflow-hidden">
        <img
          src={getImageUrl(movie.backdrop_path, 'original')}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bb-black via-bb-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-bb-black/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 -mt-64 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Poster */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={getImageUrl(movie.poster_path, 'w342')}
              alt={movie.title}
              className="w-48 md:w-64 rounded-2xl shadow-2xl border border-bb-border"
            />
          </motion.div>

          {/* Info */}
          <motion.div
            className="flex-1 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="font-display text-4xl sm:text-6xl text-bb-text mb-3">
              {movie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-bb-muted">
              <span className="flex items-center gap-1">
                <StarIcon className="w-4 h-4 text-bb-gold" />
                <span className="text-bb-gold font-medium">{formatRating(movie.vote_average)}</span>
                <span>/ 10</span>
              </span>
              <span className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" />
                {formatDate(movie.release_date)}
              </span>
              <span className="flex items-center gap-1">
                <ClockIcon className="w-4 h-4" />
                {formatRuntime(movie.runtime)}
              </span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-5">
              {movie.genres?.map((g) => (
                <span
                  key={g.id}
                  className="px-3 py-1 bg-bb-card border border-bb-border text-bb-muted text-xs rounded-full"
                >
                  {g.name}
                </span>
              ))}
            </div>

            <p className="text-bb-muted text-sm leading-relaxed mb-6 max-w-2xl">
              {movie.overview}
            </p>

            <div className="flex flex-wrap gap-3">
              {trailerKey && (
                <motion.button
                  onClick={() => setShowTrailer(true)}
                  className="flex items-center gap-2 px-8 py-3 bg-bb-red hover:bg-bb-red-hover text-white rounded-full font-medium text-sm transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <PlayIcon className="w-5 h-5" />
                  Play Trailer
                </motion.button>
              )}
              <WatchlistButton movie={movie} />
            </div>
          </motion.div>
        </div>

        {/* Similar Movies */}
        {similar.length > 0 && (
          <div className="mt-16 pb-16">
            <MovieGrid title="You Might Also Like" movies={similar} loading={false} />
          </div>
        )}
      </div>

      {showTrailer && trailerKey && (
        <TrailerModal videoKey={trailerKey} onClose={() => setShowTrailer(false)} />
      )}
    </div>
  );
};

export default MovieDetail;