import * as React from "react";

import styled from "styled-components";
import { palette } from "../../styles/palette";

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number
// ) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("", 0, 0, 0, 0),
// ];

function AdminContactHistory() {
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // const handleChangePage = (event: unknown, newPage: number) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  return (
    <Main>
      <Grid>
        <SpanStyle>No.</SpanStyle>
        <SpanStyle>채널</SpanStyle>
        <SpanStyle>이름</SpanStyle>
        <SpanStyle>제목</SpanStyle>
        <SpanStyle>답변여부</SpanStyle>
      </Grid>
      <Hr /> 
      <Grid>
        <Tddd>1</Tddd>
        <Tddd>SSAFY</Tddd>
        <Tddd>범수 박</Tddd>
        <Tddd>운영진들 해위~~~</Tddd>
        <Tddd>답변완료</Tddd>
      </Grid>
      <Hr /> 
      <Grid>
        <Tddd>2</Tddd>
        <Tddd>SSAFY</Tddd>
        <Tddd>범수 박</Tddd>
        <Tddd>이 사이트 이용하고 하버드 합격했...</Tddd>
        <Tddd>대기중</Tddd>
      </Grid>
      <Hr /> 
      <Grid>
        <Tddd>3</Tddd>
        <Tddd>SSAFY</Tddd>
        <Tddd>범수 박</Tddd>
        <Tddd>이 사이트 이용하고 하버드 합격했...</Tddd>
        <Tddd>대기중</Tddd>
      </Grid>
      <Hr /> 
    </Main>
  );
}

const Hr = styled.hr`
  border: 0;
  width: 80%;
  height: 0.5px;
  background:${palette.gray_3};
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.3fr 1fr 5fr 1fr;
  /* grid-template-rows: repeat(12, 1fr); */
  column-gap: 10px;
  align-items: stretch;
  width: 80%;
  /* border-bottom: 1px solid; */
`;

const SpanStyle = styled.span`
  padding: 12px 0px;
  width: 100%;
  border-radius: 8px;
  font-weight: bold;
  background: ${palette.blue_1};
  color: black;
  border: 0px solid;
  font-size: 1rem;
  text-align: center;
`;

const Tddd = styled.span`
  padding: 12px 0px;
  width: 100%;
  border-radius: 8px;
  color: black;
  border: 0px solid;
  font-size: 0.75rem;
  text-align: center;
`;

const Td = styled.td`
  border-bottom: 1px solid #444444;
  border-left: 1px solid #444444;
  padding: 10px;

  &:first-child {
    border-left: none;
  }
`;

export default AdminContactHistory;
