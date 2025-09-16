import { useEffect, useState } from 'react';
import './App.scss';

const initialGames = [
  {
    title: 'Path of Exile 2',
    img: new URL('./assets/img/games/poe2.webp', import.meta.url).href,
    selected: true
  },
  {
    title: 'Forza Horizon 5',
    img: new URL('./assets/img/games/fh5.webp', import.meta.url).href,
    selected: false
  },
  {
    title: 'Nightreign',
    img: new URL('./assets/img/games/nightreign.webp', import.meta.url).href,
    selected: false
  }
];

type GameProps = {
  title: string;
  img: string;
  selected: boolean;
};

const Game = ({ title, img, selected }: GameProps) => {
  return (
    <div className='game-card-container'>
      <div className={`game ${selected ? 'game-card-selected' : ''}`}></div>
      <img className='game-card' src={img} alt={title} />
    </div>
  )
}

const App = () => {
  const [games, setGames] = useState(initialGames);
  const [focusedIndex, setFocusedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        setFocusedIndex((prevIndex) => (prevIndex + 1) % games.length);
      } else if (event.key === 'ArrowLeft') {
        setFocusedIndex((prevIndex) => (prevIndex - 1 + games.length) % games.length);
      } else if (event.key === 'Enter') {
        setGames((prevGames) =>
          prevGames.map((game, index) => ({
            ...game,
            selected: index === focusedIndex
          }))
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusedIndex, games.length]);

  return (
    <>
      <div className='game-selection'>
        {
          games.map((game, index) => (
            <Game
              key={index}
              title={game.title}
              img={game.img}
              selected={index === focusedIndex}
            />
          ))
        }
      </div>
    </>
  )
};

export default App
