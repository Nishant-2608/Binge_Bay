import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayIcon, InformationCircleIcon, StarIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { getImageUrl, truncate } from '../utils/helpers';
import WatchlistButton from './WatchlistButton';

const HeroSection = ({ movies }) => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!movies?.length) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % Math.min(movies.length, 5));
    }, 8000);
    return () => clearInterval(timer);
  }, [movies]);

  if (!movies?.length) return (
    <div className="h-screen bg-bb-dark flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-bb-red border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const movie = movies[current];

  return (
    <div className="relative h-screen min-h-[600px] overflow-hidden">

      {/* Backdrop Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={movie.id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={getImageUrl(movie.backdrop_path, 'original')}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-hero-gradient" />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-bb-black to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full pb-24 px-8 sm:px-16 max-w-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Rating + Year */}
            <div className="flex items-center gap-2 mb-3">
              <StarIcon className="w-5 h-5 text-bb-gold" />
              <span className="text-bb-gold font-medium">{movie.vote_average?.toFixed(1)}</span>
              <span className="text-bb-muted">•</span>
              <span className="text-bb-muted text-sm">{movie.release_date?.split('-')[0]}</span>
            </div>

            {/* Title */}
            <h1 className="font-display text-5xl sm:text-7xl text-bb-text leading-none mb-4 text-shadow-lg">
              {movie.title}
            </h1>

            {/* Overview */}
            <p className="text-bb-muted text-sm sm:text-base mb-6 max-w-xl leading-relaxed">
              {truncate(movie.overview, 180)}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              <motion.button
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="flex items-center gap-2 px-8 py-3 bg-bb-red hover:bg-bb-red-hover text-white rounded-full font-medium transition-all text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PlayIcon className="w-5 h-5" />
                Play Trailer
              </motion.button>

              <motion.button
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="flex items-center gap-2 px-6 py-3 glass text-bb-text hover:text-white rounded-full font-medium transition-all text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <InformationCircleIcon className="w-5 h-5" />
                More Info
              </motion.button>

              <WatchlistButton movie={movie} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-8 sm:left-16 flex gap-2 z-10">
        {movies.slice(0, 5).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === current ? 'w-8 bg-bb-red' : 'w-2 bg-bb-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;