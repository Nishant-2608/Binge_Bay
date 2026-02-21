import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import MovieCard from './MovieCard';

const SkeletonCard = () => (
  <div className="flex-shrink-0 rounded-xl overflow-hidden" style={{ width: '180px' }}>
    <div className="aspect-[2/3] shimmer-bg" />
    <div className="p-2 space-y-1">
      <div className="h-3 shimmer-bg rounded w-3/4" />
      <div className="h-3 shimmer-bg rounded w-1/3" />
    </div>
  </div>
);

const MovieGrid = ({ title, movies, loading, seeAllLink }) => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 600, behavior: 'smooth' });
    }
  };

  return (
    <motion.section
      className="mb-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-4 sm:px-8">
        <h2 className="font-display text-2xl text-bb-text tracking-wide">{title}</h2>
        <div className="flex items-center gap-3">
          {seeAllLink && (
            <Link to={seeAllLink}
              className="text-sm text-bb-red hover:text-bb-red-hover transition-colors font-medium">
              See All →
            </Link>
          )}
          <div className="flex gap-1">
            <button
              onClick={() => scroll(-1)}
              className="p-1.5 rounded-full bg-bb-card hover:bg-bb-border text-bb-muted hover:text-bb-text transition-all border border-bb-border"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll(1)}
              className="p-1.5 rounded-full bg-bb-card hover:bg-bb-border text-bb-muted hover:text-bb-text transition-all border border-bb-border"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Row */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 px-4 sm:px-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : movies?.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} index={index} />
            ))}
      </div>
    </motion.section>
  );
};

export default MovieGrid;