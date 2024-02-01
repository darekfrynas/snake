type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type CellPosition = {
  x: number;
  y: number;
};

export type GameContextType = {
  snakeBody: CellPosition[];
  setSnakeBody: SetState<CellPosition[]>;
  food: CellPosition[];
  setFood: SetState<CellPosition[]>;
  snakeDirection: Directions;
  setSnakeDirection: SetState<Directions>;
  snakeSpeed: number | null;
  setSnakeSpeed: SetState<number | null>;
};

export enum Directions {
  UP = "up",
  DOWN = "down",
  RIGHT = "right",
  LEFT = "left",
}

export enum ArrowKeys {
  UP = "ArrowUp",
  DOWN = "ArrowDown",
  RIGHT = "ArrowRight",
  LEFT = "ArrowLeft",
}
