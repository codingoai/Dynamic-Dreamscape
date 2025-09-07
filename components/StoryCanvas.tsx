
import React, { useState } from 'react';
import { ImageFile } from '../types';

interface StoryCanvasProps {
  scene: ImageFile;
  onEdit: (prompt: string) => void;
  onReset: () => void;
}

const StoryCanvas: React.FC<StoryCanvasProps> = ({ scene, onEdit, onReset }) => {
  const [prompt, setPrompt] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onEdit(prompt);
      setPrompt('');
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <div className="relative w-full max-w-2xl aspect-[4/3] bg-slate-800 rounded-lg shadow-2xl overflow-hidden border-2 border-slate-700">
        <img
          src={`data:${scene.mimeType};base64,${scene.base64}`}
          alt="Generated story scene"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="w-full max-w-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="What happens next? (e.g., 'Make it rain')"
            className="flex-grow px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
          />
          <button
            type="submit"
            disabled={!prompt.trim()}
            className="px-6 py-3 font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed transition-all"
          >
            Update Scene
          </button>
        </form>
        <div className="text-center mt-6">
          <button 
            onClick={onReset}
            className="text-slate-400 hover:text-purple-400 transition-colors text-sm font-medium"
          >
            Start a New Story
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryCanvas;
