import React from "react";

import { AdminScheduleAddButton, ClassCheckDiv, ClassCheckWrapper } from "./SchedulePageStyle";

const ClassCheckModal = ({
  classCheck,
  handlerClassCheckModal,
}: {
  classCheck: string;
  handlerClassCheckModal: () => void;
}) => {
  return (
    <ClassCheckWrapper>
      <ClassCheckDiv>{classCheck}</ClassCheckDiv>
      <div>
        <AdminScheduleAddButton
          onClick={() => {
            handlerClassCheckModal();
          }}
        >
          확인
        </AdminScheduleAddButton>
      </div>
    </ClassCheckWrapper>
  );
};

export default ClassCheckModal;
