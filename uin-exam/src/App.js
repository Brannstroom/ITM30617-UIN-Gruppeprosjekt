import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Games from './components/Games';
import Game from './components/Game';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/game/:slug" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
