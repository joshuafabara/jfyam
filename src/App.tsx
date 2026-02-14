import { useState } from 'react';
import { GameCanvas } from './components/GameCanvas';
import { StartScreen } from './components/StartScreen';
import { PhotoGallery } from './components/PhotoGallery';
import { TransitionScreen } from './components/TransitionScreen';
import { ToBeContinued } from './components/ToBeContinued';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { LEVELS, TOTAL_LEVELS } from './game/config';

// Theme toggler component
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="bg-white/10 dark:bg-white/10 p-2 rounded-full border border-black/10 dark:border-white/30 backdrop-blur-md hover:bg-black/5 dark:hover:bg-white/20 transition-all font-sans text-xs text-black dark:text-white shadow-md w-8 h-8 flex items-center justify-center"
      title="Toggle Theme"
    >
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
};

// Language toggler component
const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();
  return (
    <button
      onClick={toggleLanguage}
      className="bg-white/10 dark:bg-white/10 p-2 rounded-full border border-black/10 dark:border-white/30 backdrop-blur-md hover:bg-black/5 dark:hover:bg-white/20 transition-all font-sans text-xs text-black dark:text-white shadow-md w-8 h-8 flex items-center justify-center"
      title="Switch Language"
    >
      {language === 'en' ? '🇺🇸' : '🇪🇸'}
    </button>
  );
};

function App() {
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'TRANSITION' | 'GALLERY' | 'END'>('START');
  const [levelIndex, setLevelIndex] = useState(0);
  const [score, setScore] = useState(0);

  const startGame = () => {
    setGameState('PLAYING');
    setLevelIndex(0);
    setScore(0);
  };

  const handleLevelWin = (levelScore: number) => {
    // Keep updated score
    setScore(levelScore);
    setGameState('TRANSITION');
  };

  const finishTransition = () => {
    setGameState('GALLERY');
  };

  const nextLevel = () => {
    const nextIdx = levelIndex + 1;
    if (nextIdx >= TOTAL_LEVELS) {
      setGameState('END');
    } else {
      setLevelIndex(nextIdx);
      setGameState('PLAYING');
    }
  };

  const currentYear = LEVELS[levelIndex]?.year || 2023;

  return (
    <LanguageProvider>
      <ThemeProvider>
        <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white font-press-start select-none overflow-hidden transition-colors duration-300">

          {/* Controls Container */}
          <div className="fixed top-4 left-4 z-[100] flex gap-2">
            <ThemeToggle />
            <LanguageToggle />
          </div>

          {gameState === 'START' && (
            <StartScreen onStart={startGame} />
          )}

          {gameState === 'PLAYING' && (
            <GameCanvas
              levelIndex={levelIndex}
              initialScore={score}
              onWin={handleLevelWin}
            />
          )}

          {gameState === 'TRANSITION' && (
            <TransitionScreen
              year={currentYear}
              onNext={finishTransition}
            />
          )}

          {gameState === 'GALLERY' && (
            <PhotoGallery
              year={currentYear}
              onNext={nextLevel}
            />
          )}

          {gameState === 'END' && (
            <ToBeContinued />
          )}
        </div>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
