import styled from "styled-components";

export const AdminAttendModalWrapper = styled.div`
  display: flex;
`;

export const AdminAttendLeftWrapper = styled.div`
  display: flex;
`;

export const AdminAttendTimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AdminAttendClassLi = styled.li`
  width: 150px;
  height: 60px;
  list-style: none;
  border-bottom: 1px solid;
`;

export const AdminAttendButton = styled.button<{
  extendsHeight: number;
  calcColor: string | undefined;
}>`
  width: 100%;
  border: none;
  background-color: ${(props) => `${props.calcColor}`};
  height: ${(props) => `${props.extendsHeight * 60}px`};
`;

export const AdminAttendClassUl = styled.ul`
  padding: 0px;
  border-top: 1px solid;
  text-align: center;
  margin-right: 3vw;
`;

export const AdminAttendTemp = styled.div`
  width: 100%;
  height: 100%;
`;

export const AdminAttendTime = styled.div`
  height: 60px;
  margin-right: 5px;
`;
export const AdminAttendTimerWrapper = styled.div`
  margin-top: 10px;
`;

export const AdminTableWrapper = styled.table`
  width: 25vw;
  border-collapse: collapse;
`;

export const AdminTableTh = styled.th<{ widthLength: number }>`
  width: ${(props) => `${props.widthLength}px`};
  height: 45px;
  text-align: center;
  padding-left: 1%;
`;
export const CourseNameWrapper = styled.div`
  width: 150px;
  height: 40px;
`;

export const AdminAttednTableTd = styled.td<{ widthLength: number }>`
  width: ${(props) => `${props.widthLength}px`};
  height: 30px;
  text-align: center;
  border-right: 1px dashed;
`;

export const AdminAttendTableTr = styled.tr`
  text-align: center;
  border-bottom: 1.2px solid #ada4a5;
  height: 4vh;
`;
