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
          <Route path="/kan-jam" element={<KanJam />} />
          <Route path="/kan-jam/:_id" element={<KanJam />} />
          <Route path="/bean-bags" element={<BeanBags />} />
          <Route path="/bean-bags/:_id" element={<BeanBags />} />
          <Route path="/beer-die" element={<BeerDie />} />
          <Route path="/beer-die/:_id" element={<BeerDie />} />
          <Route path="/bocce-ball" element={<BocceBall />} />
          <Route path="/bocce-ball/:_id" element={<BocceBall />} />
          <Route path="/ladder-golf" element={<LadderGolf />} />
          <Route path="/ladder-golf/:_id" element={<LadderGolf />} />
          <Route path="/timber-toss" element={<TimberToss />} />
          <Route path="/timber-toss/:_id" element={<TimberToss />} />
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
