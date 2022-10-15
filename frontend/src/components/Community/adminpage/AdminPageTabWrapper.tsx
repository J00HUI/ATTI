import React, { useState } from "react";
import AdminPageTab from "./AdminPageTab";
import styled from "styled-components";

interface adminPageWrapperProps {
  handlerSelect: (e: string) => void;
  select: string;
}

const AdminTabWrapper = styled.div`
  margin-top: 1%;
  margin-left: 5%;
  margin-bottom: 2%;
  display: flex;
  height: 50px;
`;

const AdminPageTabWrapper = ({
  handlerSelect,
  select,
}: adminPageWrapperProps) => {
  const tab = ["시간표", "출결 확인", "초대코드"];
  console.log(select);
  return (
    <AdminTabWrapper>
      {tab.map((e) => (
        <AdminPageTab
          handlerSelectTab={handlerSelect}
          name={e}
          key={e}
          select={select}
        >
          {e}
        </AdminPageTab>
      ))}
    </AdminTabWrapper>
  );
};

export default AdminPageTabWrapper;
