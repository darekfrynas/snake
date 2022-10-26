import React from "react";
import styled from "styled-components";
import range from "lodash/range";
import { Cell } from "./Cell";

const StyledBoard = styled.div`
  border: 1px solid white;
  display: inline-block;
  margin: 30px;
`;

const StyledRow = styled.div`
  display: flex;
`;

interface Props {
  width: number;
  height: number;
}

export const Board: React.FC<Props> = ({ width, height }) => {
  const widthRange = range(1, width + 1);
  const heightRange = range(1, height + 1);
  return (
    <StyledBoard>
      {heightRange.map((positionY: number) => (
        <StyledRow key={positionY}>
          {widthRange.map((positionX: number) => (
            <Cell x={positionX} y={positionY} />
          ))}
        </StyledRow>
      ))}
    </StyledBoard>
  );
};
