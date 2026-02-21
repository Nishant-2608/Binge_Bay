const IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

export const getImageUrl = (path, size = 'w500') => {
  if (!path) return '/placeholder-movie.jpg';
  return `${IMAGE_BASE}/${size}${path}`;
};

export const formatDate = (dateStr) => {
  if (!dateStr) return 'TBA';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
};

export const formatRating = (rating) => {
  if (!rating) return 'N/A';
  return parseFloat(rating).toFixed(1);
};

export const formatRuntime = (minutes) => {
  if (!minutes) return 'N/A';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};

export const getYouTubeKey = (videos) => {
  if (!videos?.results?.length) return null;
  const trailer = videos.results.find(
    (v) => v.type === 'Trailer' && v.site === 'YouTube'
  );
  return trailer?.key || videos.results[0]?.key || null;
};

export const truncate = (str, length = 150) => {
  if (!str) return '';
  return str.length > length ? str.substring(0, length) + '...' : str;
};