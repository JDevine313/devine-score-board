import { FormEvent, useContext, useState } from "react";
import "./Header.css";
import { addPlayer, getPlayerByPhone } from "../services/playerServices";
import PlayerContext from "../context/PlayerContext";
import Player from "../models/Player";
import { useLocation, useNavigate } from "react-router-dom";
import GameContext from "../context/GameContext";
import secureLocalStorage from "react-secure-storage";

const Header = () => {
  const [openSignIn, setOpenSignIn] = useState<boolean>(
    secureLocalStorage.getItem("xijs") ? false : true
  );
  const [openNewPlayer, setOpenNewPlayer] = useState<boolean>(false);
  const [phoneNum, setPhoneNum] = useState<string>("");
  const [name, setName] = useState<string>("");
  const { player, setPlayer } = useContext(PlayerContext);
  const { startNewGame, handleJoinGame } = useContext(GameContext);
  const nav = useNavigate();
  const location = useLocation();
  const handleSignIn = (e: FormEvent) => {
    e.preventDefault();
    getPlayerByPhone(phoneNum)
      .then((res: any) => {
        if (res) {
          setPlayer(res);
          setOpenSignIn(false);
        }
      })
      .catch(() => {
        setOpenSignIn(false);
        setOpenNewPlayer(true);
      });
  };
  const handleNewPlayer = (e: FormEvent) => {
    e.preventDefault();
    addPlayer({ name, phoneNumber: phoneNum }).then((res: Player) => {
      setPlayer(res);
      secureLocalStorage.setItem("xijs", JSON.stringify(res.phoneNumber));
    });
    setOpenNewPlayer(false);
  };

  return (
    <div className="Header">
      {player &&
        location.pathname !== "/" &&
        !window.location.href.includes("tournament") && (
          <>
            <button onClick={() => nav("/")}>Home</button>

            {window.location.href.split("/")[4] ? (
              <button onClick={() => handleJoinGame()}>Join Game</button>
            ) : (
              <button onClick={() => startNewGame(nav)}>New Game</button>
            )}
          </>
        )}
      {/* Account */}
      {openSignIn && !player && (
        <form onSubmit={handleSignIn} id="sign-in">
          <div>
            <p id="phone-label">Phone Number</p>
            <p id="display">{phoneNum}</p>
          </div>
          <ul id="num-pad">
            <button
              type="button"
              className="nums"
              onClick={() => setPhoneNum((prev) => `${prev}1`)}
            >
              1
            </button>

            <button
              type="button"
              className="nums"
              onClick={() => setPhoneNum((prev) => `${prev}2`)}
            >
              2
            </button>

            <button
              type="button"
              className="nums"
              onClick={() => setPhoneNum((prev) => `${prev}3`)}
            >
              3
            </button>

            <button
              type="button"
              className="nums"
              onClick={() => setPhoneNum((prev) => `${prev}4`)}
            >
              4
            </button>

            <button
              type="button"
              className="nums"
              onClick={() => setPhoneNum((prev) => `${prev}5`)}
            >
              5
            </button>

            <button
              type="button"
              className="nums"
              onClick={() => setPhoneNum((prev) => `${prev}6`)}
            >
              6
            </button>

            <button
              type="button"
              className="nums"
              onClick={() => setPhoneNum((prev) => `${prev}7`)}
            >
              7
            </button>

            <button
              type="button"
              className="nums"
              onClick={() => setPhoneNum((prev) => `${prev}8`)}
            >
              8
            </button>

            <button
              type="button"
              className="nums"
              onClick={() => setPhoneNum((prev) => `${prev}9`)}
            >
              9
            </button>

            <button
              type="button"
              className="nums"
              onClick={() => setPhoneNum((prev) => `${prev}0`)}
            >
              0
            </button>
          </ul>
          <button
            type="button"
            className="nums back"
            onClick={() =>
              setPhoneNum((prev) => prev.slice(0, prev.length - 1))
            }
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <button>Sign In</button>
        </form>
      )}
      {openNewPlayer && (
        <form onSubmit={handleNewPlayer} id="new-user-form">
          <p>Looks like it's your first time! Give us your name!</p>
          <label htmlFor="name">Your Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button>Create</button>
        </form>
      )}
      {!openSignIn && !openNewPlayer && !player && (
        <button onClick={() => setOpenSignIn(true)}>Sign in</button>
      )}
      {player && <button onClick={() => setPlayer(null)}>Sign Out</button>}
    </div>
  );
};

export default Header;
