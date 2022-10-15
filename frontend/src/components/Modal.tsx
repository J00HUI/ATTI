import { Restaurant } from "@material-ui/icons";
import React, { PropsWithChildren, ReactNode } from "react";
import styled, { css } from "styled-components";

interface ModalStyle {
  width?: string;
  height?: string;
}

interface ModalDefaultType extends ModalStyle {
  onClickToggleModal: () => void;
  children: ReactNode;
  className?: string;
}

function Modal({
  onClickToggleModal,
  children,
  ...rest
}: PropsWithChildren<ModalDefaultType>) {
  return (
    <ModalContainer>
      <DialogBox {...rest}>{children}</DialogBox>
      <Backdrop
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      />
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 50px;
  z-index: 1;
`;
const DialogBox = styled.dialog<ModalStyle>`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 1rem;
  position: fixed;
  left: 0;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0/185);
  box-sizing: border-box;
  background-color: white;
  z-index: 10000;
  ${({ width = "800px", height = "400px" }) => css`
    width: ${width};
    height: ${height};
  `}
`;

const Backdrop = styled.div`
  width: 100vw;
  height: 100vw;
  position: fixed;
  top: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.2);
  left: 0;
`;

export default Modal;
