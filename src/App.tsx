import { useState } from 'react';
import { GameCanvas } from './components/GameCanvas';
import { StartScreen } from './components/StartScreen';
import { PhotoGallery } from './components/PhotoGallery';
import { ToBeContinued } from './components/ToBeContinued';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LEVELS, TOTAL_LEVELS } from './game/config';

// Theme toggler component
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-[100] bg-white/10 p-2 rounded-full border border-white/30 backdrop-blur-md hover:bg-white/20 transition-all font-sans text-xs"
    >
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
};

function App() {
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GALLERY' | 'END'>('START');
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
    <ThemeProvider>
      <div className="min-h-screen bg-black text-white font-press-start select-none overflow-hidden">
        <ThemeToggle />

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
  );
}

export default App;
