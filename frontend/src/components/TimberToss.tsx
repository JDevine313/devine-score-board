import { useContext, useEffect } from "react";
import "./TimberToss.css";
import GameContext from "../context/GameContext";

const TimberToss = () => {
  const { game, updateGame, changePoints, Bust } = useContext(GameContext);

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

  const handleBUST = (index: number) => {
    if (game) {
      let copy = { ...game };
      copy.score[index] = 15;
      Bust(copy);
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
              <div onClick={() => changePoints(4, i)}>+4</div>
              <div onClick={() => changePoints(5, i)}>+5</div>
              <div onClick={() => changePoints(6, i)}>+6</div>
              <div onClick={() => changePoints(7, i)}>+7</div>
              <div onClick={() => changePoints(8, i)}>+8</div>
              <div onClick={() => changePoints(9, i)}>+9</div>
              <div onClick={() => handleBUST(i)}>BUST</div>
            </section>
          </li>
        ))}
    </div>
  );
};

export default TimberToss;
