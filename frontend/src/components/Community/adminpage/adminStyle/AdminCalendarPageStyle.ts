import styled from "styled-components";

export const AdminCalendarAttendChange = styled.button`
  border: none;
  background-color: #16a34a;
  color: #ffffff;
  text-align: center;
  border-radius: 8px;
  width: 100px;
  height: 30px;
  margin-left: 10px;
  :hover {
    cursor: pointer;
  }
`;

export const AdminCalendarAttendMonthDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 40px;
  align-items: center;
`;

export const AdminCalendarAttendMonthSpan = styled.span`
  width: 20%;
  text-align: center;
`;

export const AdminCalendarChangeButton = styled.button`
  border: none;
  background-color: white;
  :hover {
    cursor: pointer;
  }
`;

export const AdminCalendarTableWrapperDiv = styled.div`
  display: flex;
  justify-content: center;
`;
