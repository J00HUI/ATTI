import styled from "styled-components";

export const AdminTableHeadBorder = styled.th<{
  widthLength: number;
  heightLenth: number;
}>`
  width: ${(props) => `${props.widthLength}%`};
  height: ${(props) => `${props.heightLenth}vh`};
  padding-left: 1%;
`;

export const AdminTableWrapperDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AdminTableHeadDiv = styled.div`
  width: 95%;
  background-color: #eaeffe;
  border-radius: 8px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AdminTableTR = styled.tr`
  text-align: center;
  border-bottom: 1.2px solid #ada4a5;
  height: 6vh;
`;

export const AdminTableTd = styled.td`
  border-right: 1px dashed;
`;

export const AdminSelect = styled.select`
  border: none;
  background-color: white;
  width: 90%;
  text-align: center;
`;
