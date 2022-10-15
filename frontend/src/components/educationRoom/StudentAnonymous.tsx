import React from "react";
import {
  ReqeustModalButton,
  ReqeustModalButtonWrapper,
  ReqeustModalWrapper,
  RequestModalRedButton,
} from "./RequestModal";

interface ReqeustProps {
  anonymousOK: () => void;
  setOnClickToggleModal: () => void;
  detail: string;
  detail2: string;
}

const StudentAnonymouse = ({
  anonymousOK,
  setOnClickToggleModal,
  detail,
  detail2,
}: ReqeustProps) => {
  return (
    <ReqeustModalWrapper>
      <h1>{detail}</h1>
      <div>{detail2}</div>
      <ReqeustModalButtonWrapper>
        <ReqeustModalButton onClick={anonymousOK}>예</ReqeustModalButton>
        <RequestModalRedButton onClick={setOnClickToggleModal}>
          아니오
        </RequestModalRedButton>
      </ReqeustModalButtonWrapper>
    </ReqeustModalWrapper>
  );
};

export default StudentAnonymouse;
