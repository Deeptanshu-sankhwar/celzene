import './App.css';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import GameList from './pages/GameList/GameList';
import GameScreen from './pages/GameScreen/GameScreen';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';


function App() {


  return (
    <Router>
        <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/game-list" element={<GameList />} />
          <Route path="/game/:gameId" element={<GameScreen />} />
        </Routes>
      </div>

      </Router>
  );
}

export default App;
