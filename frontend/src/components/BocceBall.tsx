import { useContext, useEffect } from "react";
import "./BocceBall.css";
import GameContext from "../context/GameContext";

const BocceBall = () => {
  const { game, updateGame, changePoints } = useContext(GameContext);

  useEffect(() => {
    const updating = setInterval(() => {
      updateGame();
    }, 2000);
    return () => clearInterval(updating);
  }, []);

  const handleClicker = (e: any) => {
    console.log(e.target);
    if (e.target.tagName === "DIV") {
      e.target.classList.add("clicked");
      setTimeout(() => {
        e.target.classList.remove("clicked");
      }, 1000);
    }
  };

  return (
    <div className="BeanBags universal">
      {game &&
        game.players.map((player, i) => (
          <li key={player.phoneNumber} className="player">
            <p>
              {player.name} : {game.score[i]}
            </p>
            <section onClick={handleClicker} className="points-section">
              <div onClick={() => changePoints(1, i)}>+1</div>
              <div onClick={() => changePoints(2, i)}>+2</div>
              <div onClick={() => changePoints(3, i)}>+3</div>
            </section>
          </li>
        ))}
    </div>
  );
};

export default BocceBall;
