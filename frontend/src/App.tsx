import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import KanJam from "./components/KanJam";
import "./App.css";
import BeanBags from "./components/BeanBags";
import GameView from "./components/GameView";
import BeerDie from "./components/BeerDie";
import BocceBall from "./components/BocceBall";
import LadderGolf from "./components/LadderGolf";
import TimberToss from "./components/TimberToss";
import Tournament from "./components/Tournament";
import TournamentGame from "./components/TournamentGame";
import PastTournaments from "./components/PastTournaments";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-games" element={<GameView />} />
          <Route path="/Kan Jam" element={<KanJam />} />
          <Route path="/Kan Jam/:_id" element={<KanJam />} />
          <Route path="/Bean Bags" element={<BeanBags />} />
          <Route path="/Bean Bags/:_id" element={<BeanBags />} />
          <Route path="/Beer Die" element={<BeerDie />} />
          <Route path="/Beer Die/:_id" element={<BeerDie />} />
          <Route path="/Bocce Ball" element={<BocceBall />} />
          <Route path="/Bocce Ball/:_id" element={<BocceBall />} />
          <Route path="/Ladder Golf" element={<LadderGolf />} />
          <Route path="/Ladder Golf/:_id" element={<LadderGolf />} />
          <Route path="/Timber Toss" element={<TimberToss />} />
          <Route path="/Timber Toss/:_id" element={<TimberToss />} />
          <Route path="/tournament" element={<Tournament />} />
          <Route path="/tournament/:game" element={<TournamentGame />} />
          <Route path="/tournament/all" element={<PastTournaments />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
