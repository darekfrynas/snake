import React from "react";
import styled from "styled-components";

const StyledCell = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid white;
  display: flex;

  span {
    flex: 1;
    margin: auto;
    color: #777;
    font-size: 8px;
    text-align: center;
  }
`;

interface Props {
  x: number;
  y: number;
}

export const Cell: React.FC<Props> = ({ x, y }) => {
  return (
    <StyledCell>
      <span>{`${x}x${y}`}</span>
    </StyledCell>
  );
};
