import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('bb_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('bb_token');
      localStorage.removeItem('bb_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth
export const login = (data) => api.post('/auth/login', data);
export const register = (data) => api.post('/auth/register', data);

// Movies
export const getTrending = (tw = 'week') => api.get(`/movies/trending/${tw}`);
export const getPopular = (page = 1) => api.get(`/movies/popular?page=${page}`);
export const getTopRated = (page = 1) => api.get(`/movies/top-rated?page=${page}`);
export const getNowPlaying = (page = 1) => api.get(`/movies/now-playing?page=${page}`);
export const getMovieDetails = (id) => api.get(`/movies/${id}`);
export const getMovieTrailers = (id) => api.get(`/movies/${id}/trailers`);
export const getSimilarMovies = (id) => api.get(`/movies/${id}/similar`);
export const searchMovies = (query, page = 1) => api.get(`/movies/search?query=${query}&page=${page}`);
export const getMoviesByGenre = (genreId, page = 1) => api.get(`/movies/genre/${genreId}?page=${page}`);
export const getGenres = () => api.get('/movies/genres');

// Watchlist
export const getWatchlist = () => api.get('/watchlist');
export const addToWatchlist = (data) => api.post('/watchlist', data);
export const removeFromWatchlist = (tmdbId) => api.delete(`/watchlist/${tmdbId}`);
export const checkWatchlist = (tmdbId) => api.get(`/watchlist/check/${tmdbId}`);

export default api;