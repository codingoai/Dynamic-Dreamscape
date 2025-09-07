
import React, { useState } from 'react';
import { ArtStyle, Genre } from '../types';
import { ART_STYLES, GENRES } from '../constants';

interface StyleSelectorProps {
  onSelect: (artStyle: ArtStyle, genre: Genre) => void;
}

// Fix: Moved the OptionButton component outside of the StyleSelector component to prevent re-definition on each render
// and to allow TypeScript to correctly identify it as a React component, thus resolving errors with the 'key' prop.
const OptionButton = ({ label, isSelected, onClick }: { label: string; isSelected: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
      isSelected
        ? 'bg-purple-600 border-purple-500 text-white shadow-lg'
        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-slate-600'
    }`}
  >
    {label}
  </button>
);

const StyleSelector: React.FC<StyleSelectorProps> = ({ onSelect }) => {
  const [selectedStyle, setSelectedStyle] = useState<ArtStyle | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);

  const canProceed = selectedStyle && selectedGenre;

  return (
    <div className="w-full max-w-2xl p-6 bg-slate-800/50 rounded-xl border border-slate-700 shadow-lg animate-fade-in">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-slate-100 mb-4">1. Choose an Art Style</h3>
        <div className="flex flex-wrap gap-3">
          {ART_STYLES.map((style) => (
            <OptionButton
              key={style}
              label={style}
              isSelected={selectedStyle === style}
              onClick={() => setSelectedStyle(style)}
            />
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-slate-100 mb-4">2. Choose a Genre</h3>
        <div className="flex flex-wrap gap-3">
          {GENRES.map((genre) => (
            <OptionButton
              key={genre}
              label={genre}
              isSelected={selectedGenre === genre}
              onClick={() => setSelectedGenre(genre)}
            />
          ))}
        </div>
      </div>

      <button
        onClick={() => onSelect(selectedStyle!, selectedGenre!)}
        disabled={!canProceed}
        className="w-full px-6 py-3 font-bold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:transform-none"
      >
        Create My Character
      </button>
    </div>
  );
};

export default StyleSelector;
