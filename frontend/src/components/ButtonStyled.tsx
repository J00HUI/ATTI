import styled from "styled-components";
import { palette } from "../styles/palette";

export const ButtonBlue = styled.button`
  background: ${palette.main_grBlue};
  color: white;
  border-radius: 1rem;
  border: 0px solid;
  padding: 0.3rem 1rem;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  font-family: "GunggiLight";

  &:active,
  &:hover {
    filter: brightness(90%);
    background: ${palette.main_grBlue};
  }

  &:disabled {
    opacity: 0.5;
    background: ${palette.main_grBlue};
    cursor: not-allowed;
  }
`;

export const ButtonPurple = styled.button`
  background: ${palette.main_grPurple};
  color: white;
  border-radius: 1rem;
  border: 0px solid;
  padding: 0.3rem 1rem;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  font-family: "GunggiLight";

  &:active,
  &:hover {
    filter: brightness(90%);
    background: ${palette.main_grPurple};
  }

  &:disabled {
    opacity: 0.5;
    background: ${palette.main_grPurple};
    cursor: not-allowed;
  }
`;
