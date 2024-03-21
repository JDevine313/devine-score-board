import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import PlayerContextProvider from "./context/PlayerContextProvider.tsx";
import GameContextProvider from "./context/GameContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PlayerContextProvider>
      <GameContextProvider>
        <App />
      </GameContextProvider>
    </PlayerContextProvider>
  </React.StrictMode>
);
