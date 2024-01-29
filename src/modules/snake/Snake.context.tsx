import * as React from "react";
import { SnakeBody } from "./types";

type SnakeContextType = {
  body: SnakeBody;
};
export const SnakeContext = React.createContext<SnakeContextType>({ body: [] });

export const useSnakeContext = () => {
  return React.useContext(SnakeContext);
};
