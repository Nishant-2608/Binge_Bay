import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import GenreFilter from '../components/GenreFilter';
import MovieCard from '../components/MovieCard';
import { searchMovies, getPopular, getMoviesByGenre, getGenres } from '../api/backend';

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getGenres().then((res) => setGenres(res.data.genres || []));
  }, []);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        let res;
        if (query) {
          res = await searchMovies(query, page);
        } else if (selectedGenre) {
          res = await getMoviesByGenre(selectedGenre.id, page);
        } else {
          res = await getPopular(page);
        }
        setMovies(res.data.results || []);
        setTotalPages(res.data.total_pages || 1);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [query, selectedGenre, page]);

  const handleSearch = (q) => { setQuery(q); setPage(1); };
  const handleGenre = (g) => { setSelectedGenre(g); setPage(1); setQuery(''); };

  return (
    <div className="min-h-screen bg-bb-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 space-y-4"
        >
          <h1 className="font-display text-4xl text-bb-text">Browse Movies</h1>
          <SearchBar onSearch={handleSearch} />
          <GenreFilter genres={genres} selectedGenre={selectedGenre} onSelectGenre={handleGenre} />
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="rounded-xl overflow-hidden">
                <div className="aspect-[2/3] shimmer-bg" />
                <div className="p-2 space-y-1">
                  <div className="h-3 shimmer-bg rounded w-3/4" />
                  <div className="h-3 shimmer-bg rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : movies.length === 0 ? (
          <div className="text-center py-24 text-bb-muted">
            <p className="text-6xl mb-4">🎬</p>
            <p className="text-xl">No movies found for "{query}"</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {movies.map((movie, i) => (
              <div key={movie.id}>
                <MovieCard movie={movie} index={i} />
              </div>
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-12">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-5 py-2 bg-bb-card border border-bb-border text-bb-muted hover:text-bb-text rounded-full text-sm disabled:opacity-40 transition-all"
            >
              ← Prev
            </button>
            <span className="px-5 py-2 text-bb-muted text-sm">
              Page {page} of {Math.min(totalPages, 500)}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= Math.min(totalPages, 500)}
              className="px-5 py-2 bg-bb-card border border-bb-border text-bb-muted hover:text-bb-text rounded-full text-sm disabled:opacity-40 transition-all"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;