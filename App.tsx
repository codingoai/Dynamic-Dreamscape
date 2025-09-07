
import React, { useState, useCallback, useEffect } from 'react';
import { AppStep, ArtStyle, Genre, ImageFile } from './types';
import * as geminiService from './services/geminiService';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import StyleSelector from './components/StyleSelector';
import StoryCanvas from './components/StoryCanvas';
import Loader from './components/Loader';
import { GENERATING_MESSAGES } from './constants';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.UPLOAD);
  const [userImage, setUserImage] = useState<ImageFile | null>(null);
  const [artStyle, setArtStyle] = useState<ArtStyle | null>(null);
  const [genre, setGenre] = useState<Genre | null>(null);
  const [characterSheet, setCharacterSheet] = useState<ImageFile | null>(null);
  const [currentScene, setCurrentScene] = useState<ImageFile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>(GENERATING_MESSAGES[0]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fix: Changed NodeJS.Timeout to ReturnType<typeof setInterval> for browser compatibility.
    let interval: ReturnType<typeof setInterval>;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingMessage(prev => {
          const currentIndex = GENERATING_MESSAGES.indexOf(prev);
          const nextIndex = (currentIndex + 1) % GENERATING_MESSAGES.length;
          return GENERATING_MESSAGES[nextIndex];
        });
      }, 2500);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isLoading]);

  const handleImageUpload = (image: ImageFile) => {
    setUserImage(image);
    setStep(AppStep.STYLE_SELECTION);
    setError(null);
  };

  const handleStyleAndGenreSelect = async (selectedArtStyle: ArtStyle, selectedGenre: Genre) => {
    if (!userImage) return;
    setArtStyle(selectedArtStyle);
    setGenre(selectedGenre);
    setStep(AppStep.GENERATING);
    setIsLoading(true);
    setError(null);

    try {
      const newCharacterSheet = await geminiService.generateCharacterSheet(userImage, selectedArtStyle, selectedGenre);
      setCharacterSheet(newCharacterSheet);
      setLoadingMessage("Character created! Generating first scene...");
      const initialScene = await geminiService.generateInitialScene(newCharacterSheet, selectedArtStyle, selectedGenre);
      setCurrentScene(initialScene);
      setStep(AppStep.STORY);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
      setStep(AppStep.STYLE_SELECTION);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditScene = async (prompt: string) => {
    if (!currentScene) return;
    setIsLoading(true);
    setError(null);
    try {
      const editedScene = await geminiService.editScene(currentScene, prompt);
      setCurrentScene(editedScene);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to edit the scene.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReset = () => {
    setStep(AppStep.UPLOAD);
    setUserImage(null);
    setArtStyle(null);
    setGenre(null);
    setCharacterSheet(null);
    setCurrentScene(null);
    setIsLoading(false);
    setError(null);
  };

  const renderContent = () => {
    if (isLoading || step === AppStep.GENERATING) {
      return <Loader message={loadingMessage} />;
    }
    switch (step) {
      case AppStep.UPLOAD:
        return <ImageUploader onImageUpload={handleImageUpload} />;
      case AppStep.STYLE_SELECTION:
        return userImage && <StyleSelector onSelect={handleStyleAndGenreSelect} />;
      case AppStep.STORY:
        return currentScene && <StoryCanvas scene={currentScene} onEdit={handleEditScene} onReset={handleReset} />;
      default:
        return <ImageUploader onImageUpload={handleImageUpload} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <Header />
      <main className="w-full max-w-5xl mx-auto flex-grow flex flex-col items-center justify-center">
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg mb-6 w-full max-w-md text-center">
            <p className="font-semibold">An Error Occurred</p>
            <p className="text-sm">{error}</p>
          </div>
        )}
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
