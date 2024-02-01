import React from "react";
import { GameContextType } from "./types";

export const GameContext = React.createContext<GameContextType>(
  {} as GameContextType,
);

export const useGameContext = () => {
  return React.useContext(GameContext);
};
