import { useState, useEffect, useCallback } from 'react';
import { GameCanvas } from './components/GameCanvas';
import { StartScreen } from './components/StartScreen';
import { PhotoGallery } from './components/PhotoGallery';
import { TransitionScreen } from './components/TransitionScreen';
import { ToBeContinued } from './components/ToBeContinued';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { LEVELS, TOTAL_LEVELS } from './game/config';

// Zoom reset button — only appears if user somehow triggers a zoom
const ZoomResetButton = () => {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const check = () => setZoomed(vv.scale > 1.05);
    vv.addEventListener('resize', check);
    return () => vv.removeEventListener('resize', check);
  }, []);

  const resetZoom = useCallback(() => {
    const meta = document.querySelector('meta[name="viewport"]');
    if (!meta) return;

    // Step 1: unlock zoom completely so Safari releases its current zoom level
    meta.setAttribute('content', 'width=device-width, initial-scale=1.0, minimum-scale=0.1, maximum-scale=10.0, user-scalable=yes');

    // Step 2: after Safari processes, force a focus trick to reset visual viewport
    setTimeout(() => {
      const input = document.createElement('input');
      input.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;font-size:16px;z-index:-1;';
      document.body.appendChild(input);
      input.focus();

      setTimeout(() => {
        input.blur();
        document.body.removeChild(input);
        // Step 3: lock zoom back down
        meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        setZoomed(false);
      }, 150);
    }, 150);
  }, []);

  if (!zoomed) return null;

  return (
    <button
      onClick={resetZoom}
      onTouchEnd={(e) => { e.preventDefault(); resetZoom(); }}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999] w-16 h-16 bg-black/80 border-2 border-white/60 rounded-full flex items-center justify-center text-white shadow-lg backdrop-blur-sm active:bg-white/20"
      title="Reset Zoom"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    </button>
  );
};

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

  // Reset scroll position on every state change (fixes mobile Safari scroll persistence)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [gameState]);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white font-press-start select-none overflow-hidden transition-colors duration-300">

          {/* Controls Container */}
          <div className="fixed top-4 left-4 z-[100] flex gap-2">
            <ThemeToggle />
            <LanguageToggle />
          </div>

          {/* Zoom reset safety net — appears centered if user triggers zoom */}
          <ZoomResetButton />

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
