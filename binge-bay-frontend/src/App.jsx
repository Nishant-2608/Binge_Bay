import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { WatchlistProvider } from './context/WatchlistContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MovieDetail from './pages/MovieDetail';
import Search from './pages/Search';
import Watchlist from './pages/Watchlist';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WatchlistProvider>
          <div className="min-h-screen bg-bb-black">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/search" element={<Search />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route
                path="/watchlist"
                element={
                  <ProtectedRoute>
                    <Watchlist />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />        
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: '#1A1A24',
                  color: '#E8E8F0',
                  border: '1px solid #2A2A38',
                  borderRadius: '12px',
                  fontSize: '14px',
                },
                success: {
                  iconTheme: { primary: '#E50914', secondary: '#fff' },
                },
              }}
            />
          </div>
        </WatchlistProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;