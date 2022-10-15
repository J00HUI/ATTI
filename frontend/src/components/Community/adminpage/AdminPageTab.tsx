import React from "react";
import styled from "styled-components";
import { ButtonBlue } from "../../ButtonStyled";
export interface tabNameProps {
  children: any;
  name: string;
  handlerSelectTab: (element: string) => void;
  select: string;
}

const CustomBlueButton = styled(ButtonBlue)`
  width: 130px;
  height: 100%;
`;

const Tab = styled.div`
  margin-left: 3%;
  margin-right: 3%;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
`;

const AdminPageTab = ({ select, name, handlerSelectTab }: tabNameProps) => {
  console.log(name);
  function onClick() {
    handlerSelectTab(name);
  }
  return (
    <Tab onClick={onClick}>
      {select === name ? (
        <CustomBlueButton>{name}</CustomBlueButton>
      ) : (
        <div> {name}</div>
      )}
    </Tab>
  );
};

export default AdminPageTab;
