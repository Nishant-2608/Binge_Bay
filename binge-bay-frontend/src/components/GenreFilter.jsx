import { motion } from 'framer-motion';

const GenreFilter = ({ genres, selectedGenre, onSelectGenre }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
      <button
        onClick={() => onSelectGenre(null)}
        className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
          !selectedGenre
            ? 'bg-bb-red text-white'
            : 'bg-bb-card text-bb-muted hover:text-bb-text border border-bb-border'
        }`}
      >
        All
      </button>
      {genres?.map((genre) => (
        <motion.button
          key={genre.id}
          onClick={() => onSelectGenre(genre)}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedGenre?.id === genre.id
              ? 'bg-bb-red text-white'
              : 'bg-bb-card text-bb-muted hover:text-bb-text border border-bb-border'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {genre.name}
        </motion.button>
      ))}
    </div>
  );
};

export default GenreFilter;