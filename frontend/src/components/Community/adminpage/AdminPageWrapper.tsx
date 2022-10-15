import React, { useState, useEffect } from "react";
import AdminAttendance from "./AdminAttendance";
import AdminInvaiteCode from "./AdminInvaiteCode";
import AdminMember from "./AdminMember";
import AdminPageTabWrapper from "./AdminPageTabWrapper";
import AdminSchedule from "./AdminSchedule";
import styled from "styled-components";

const AdminPageWrapperDiv = styled.div`
  /* background-color: white; */
  width: 100%;
  /* height: 90vh; */
  border-radius: 30px;
  margin-top: 15px;
  margin-bottom: 15px;
`;

function AdminPageWrapper() {
  const [select, setSelect] = useState<string>("시간표");
  function handlerSelect(element: string) {
    setSelect(element);
  }
  return (
    <AdminPageWrapperDiv>
      <AdminPageTabWrapper handlerSelect={handlerSelect} select={select} />
      <div>
        {select === "시간표" && <AdminSchedule />}
        {select === "멤버 관리" && <AdminMember />}
        {select === "출결 확인" && <AdminAttendance />}
        {select === "초대코드" && <AdminInvaiteCode />}
      </div>
    </AdminPageWrapperDiv>
  );
}

export default AdminPageWrapper;
