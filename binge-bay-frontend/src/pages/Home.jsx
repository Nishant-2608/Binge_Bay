import { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import MovieGrid from '../components/MovieGrid';
import { getTrending, getPopular, getTopRated, getNowPlaying } from '../api/backend';

const Home = () => {
  const [trending, setTrending] = useState(null);
  const [popular, setPopular] = useState(null);
  const [topRated, setTopRated] = useState(null);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [t, p, tr, n] = await Promise.all([
          getTrending('week'),
          getPopular(),
          getTopRated(),
          getNowPlaying(),
        ]);
        setTrending(t.data.results);
        setPopular(p.data.results);
        setTopRated(tr.data.results);
        setNowPlaying(n.data.results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return (
    <div className="min-h-screen bg-bb-black">
      <HeroSection movies={trending} />
      <div className="pt-8">
        <MovieGrid title="🔥 Trending This Week" movies={trending} loading={loading} />
        <MovieGrid title="🎬 Now Playing" movies={nowPlaying} loading={loading} />
        <MovieGrid title="⭐ Top Rated" movies={topRated} loading={loading} seeAllLink="/search" />
        <MovieGrid title="🍿 Popular" movies={popular} loading={loading} seeAllLink="/search" />
      </div>
    </div>
  );
};

export default Home;