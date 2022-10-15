import styled from "styled-components";
import { palette } from "../../../styles/palette";
import { ButtonBlue } from "../../ButtonStyled";

export const LeftBar = styled.div`
  width: 100px;
  height: 65px;
  display: flex;
  margin-left: auto;
`;

export const TempDiv = styled.div`
  margin-top: 18%;
`;

export const AddClassButton = styled.button<{ adminPage: boolean }>`
  width: 10vw;
  background: none;
  height: 65px;
  border: none;
  :hover {
    background-color: ${(props) => (props.adminPage ? "#ffa" : null)};
    cursor: ${(props) => (props.adminPage ? "crosshair" : null)};
  }
`;

export const ExistenceClass = styled.div<{
  extendsHeight: number;
  calcColor: string | undefined;
}>`
  width: 10vw;
  background-color: ${(props) => `${props.calcColor}`};
  height: ${(props) => `${props.extendsHeight * 65}px`};
  border-top-color: #ada4a5;
  border-bottom-color: #ada4a5;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ScheduleDiv = styled.div``;

export const ScheduleLi = styled.li`
  list-style: none;
  height: 65px;
  margin-top: 0px;
  margin-bottom: 0px;
  border-bottom: 1px solid #ada4a5;
`;

export const ScheduleUl = styled.ul<{ index: number }>`
  margin-block-start: 0px;
  margin-block-end: 0px;
  padding-inline-start: 0px;
  border-top: 1px solid #ada4a5;
  border-right: 1px dashed #c58bf2;
  border-left: ${(props) => (props.index === 0 ? "1px dashed #c58bf2" : null)};
`;

export const DeleteButton = styled.button`
  position: absolute;
  display: flex;
  top: 0px;
  left: 80%;
  border: none;
  background: none;
`;

export const ConnectButton = styled.button<{
  calcColor: string | undefined;
}>`
  position: absolute;
  width: 100%;
  bottom: 0px;
  border: none;
  background-color: ${(props) => `${props.calcColor}`};
`;

export const TextWrapper = styled.div<{
  calcColor: string | undefined;
}>`
  text-align: center;
  color: ${(props) => `${props.calcColor}`};
`;

export const AdminScheduleLeftDiv = styled.div`
  display: flex;
`;

export const AdminScherduleInputButtonWrapper = styled.div`
  width: 100px;
  background-color: #eaeffe;
  border-radius: 16px;
  height: 50px;
  margin-right: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;

export const AdminScherduleInputWrapper = styled.div`
  width: 250px;
  height: 45px;
`;

export const AdminScheduleInput = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  border: 1px solid #bfbfbf;
  background-color: #f7f8f8;
`;

export const AdminSheduleSelect = styled.select`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  border: 1px solid #bfbfbf;
  background-color: #f7f8f8;
  text-align: center;
`;

export const AdminScheduleAddButton = styled(ButtonBlue)`
  width: 100px;
  height: 50px;
  border-radius: 20px;
  margin-top: 50px;
  font-size: large;
  font-weight: bold;
`;

export const AdminScheduleAddText = styled.div`
  font-size: xx-large;
  font-weight: bolder;
  margin-bottom: 35px;
  background: ${palette.main_grBlue};
  color: transparent;
  -webkit-background-clip: text;
`;

export const AdminScheduleErrorText = styled.div`
  color: #ed8687;
  font-weight: bolder;
`;

export const AdminSheduleDeleteButton = styled(AdminScheduleAddButton)`
  margin-right: 15px;
  margin-left: 15px;
  margin-top: 250px;
`;

export const ClassCheckDiv = styled.div`
  font-size: xx-large;
  font-weight: bolder;
  margin-bottom: 5vh;
  margin-top: 3vh;
`;

export const ClassCheckWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
