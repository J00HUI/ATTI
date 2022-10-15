import styled from "styled-components";
import { ButtonBlue } from "../ButtonStyled";
import { palette } from "../../styles/palette";

export const ReqeustModalWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const ReqeustModalButtonWrapper = styled.span`
  width: 40%;
  display: flex;
  margin-top: auto;
  margin-bottom: "5px";
`;

export const ReqeustModalButton = styled(ButtonBlue)`
  width: 45%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  font-size: large;
`;

export const RequestModalRedButton = styled.button`
  width: 45%;
  background: ${palette.grRed};
  color: white;
  border-radius: 1rem;
  border: 0px solid;
  padding: 0.3rem 1rem;
  font-size: large;
  font-weight: bold;
  cursor: pointer;

  &:active,
  &:hover {
    filter: brightness(90%);
    background: ${palette.grRed};
  }

  &:disabled {
    opacity: 0.5;
    background: ${palette.grRed};
    cursor: auto;
  }
`;
