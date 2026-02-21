import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-bb-dark border-t border-bb-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-1 mb-3">
              <span className="font-display text-2xl text-bb-red">BINGE</span>
              <span className="font-display text-2xl text-bb-text">BAY</span>
            </div>
            <p className="text-bb-muted text-sm leading-relaxed">
              Your ultimate destination for discovering and tracking movies.
              Powered by TMDB.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-bb-text font-medium mb-3 text-sm uppercase tracking-wider">
              Navigate
            </h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-bb-muted hover:text-bb-red text-sm transition-colors">Home</Link></li>
              <li><Link to="/search" className="text-bb-muted hover:text-bb-red text-sm transition-colors">Browse Movies</Link></li>
              <li><Link to="/watchlist" className="text-bb-muted hover:text-bb-red text-sm transition-colors">My Watchlist</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-bb-text font-medium mb-3 text-sm uppercase tracking-wider">
              Account
            </h3>
            <ul className="space-y-2">
              <li><Link to="/login" className="text-bb-muted hover:text-bb-red text-sm transition-colors">Sign In</Link></li>
              <li><Link to="/register" className="text-bb-muted hover:text-bb-red text-sm transition-colors">Join Free</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-bb-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-bb-muted text-xs">
            © 2024 Binge Bay. All rights reserved.
          </p>
          <p className="text-bb-muted text-xs">
            Movie data provided by{' '}
            
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noreferrer"
              className="text-bb-red hover:underline"
            <a>
              TMDB
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;