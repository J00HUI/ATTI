import styled from "styled-components"
import React, { useMemo, useState, useEffect } from "react";
import ClassTable from './ClassTable';

export default function Class(){
  // const time = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]
  // const dummyClass = [
  //       {
  //         cousrseId: "1",
  //         courseName: "",
  //         courseProf: "",
  //         userId: "",
  //         courseStartTime: "",
  //         courseEndTime: "",
  //         courseDate: "",
  //       },
  //       {
  //         cousrseId: "2",
  //         courseName: "",
  //         courseProf: "",
  //         userId: "",
  //         courseStartTime: "",
  //         courseEndTime: "",
  //         courseDate: "",
  //       },
  //       {
  //         cousrseId: "3",
  //         courseName: "",
  //         courseProf: "",
  //         userId: "",
  //         courseStartTime: "",
  //         courseEndTime: "",
  //         courseDate: "",
  //       },
  //       {
  //         cousrseId: "4",
  //         courseName: "",
  //         courseProf: "",
  //         userId: "",
  //         courseStartTime: "",
  //         courseEndTime: "",
  //         courseDate: "",
  //       },
  //     ]
  // return(
  //   <ClassContainer>
  //     <TimeDiv>
  //       {time.map((e,i) => (
  //         <GridDiv key={i}>
  //           {e}
  //         </GridDiv>
  //       ))}
  //     </TimeDiv>
  //     <div>
  //         <Timediv>
            
  //         </Timediv>
  //     </div>
  //     <div>

  //     </div>
  //     <div>

  //     </div>
  //     <div>

  //     </div>
  //     <div>

  //     </div>
  //     <div>

  //     </div>
  //     <div>

  //     </div>
  //   </ClassContainer>
  // )
  }

const ClassContainer = styled.div`
  width: 1300px;
  height: 671px;
  margin: 15px 0;
  border-radius: 20px;
  background-color: white;
  display: flex;
  flex-direction: row;
`
const TimeDiv = styled.div`
  
`
const GridDiv = styled.div`
  width: 60px;
  height: 50px;
  border: 1px solid;
`
// const [time, setTime] = useState(9)

//   useEffect(() => {
//     if (time >= 18) return;
//     setTime((prev) => {
//       return prev + 1
//     })
//   }, [time])

//   const columns = useMemo(
//     () => [
//       {
//         accessor: "time",
//         Header: "Time",
//       },
//       {
//         accessor: "mon",
//         Header: "Mon",
//       },
//       {
//         accessor: "tue",
//         Header: "Tue",
//       },
//       {
//         accessor: "wed",
//         Header: "Wed",
//       },
//       {
//         accessor: "thr",
//         Header: "Thr",
//       },
//       {
//         accessor: "Fri",
//         Header: "Fri",
//       },
//       {
//         accessor: "sat",
//         Header: "Sat",
//       },
//       {
//         accessor: "sun",
//         Header: "Sun",
//       },
//     ],
//     []
//   );
//   const dummyClass = [
//     {
//       cousrseId: "1",
//       courseName: "",
//       courseProf: "",
//       userId: "",
//       courseStartTime: "",
//       courseEndTime: "",
//       courseDate: "",
//     },
//     {
//       cousrseId: "2",
//       courseName: "",
//       courseProf: "",
//       userId: "",
//       courseStartTime: "",
//       courseEndTime: "",
//       courseDate: "",
//     },
//     {
//       cousrseId: "3",
//       courseName: "",
//       courseProf: "",
//       userId: "",
//       courseStartTime: "",
//       courseEndTime: "",
//       courseDate: "",
//     },
//     {
//       cousrseId: "4",
//       courseName: "",
//       courseProf: "",
//       userId: "",
//       courseStartTime: "",
//       courseEndTime: "",
//       courseDate: "",
//     },
//     {
//       cousrseId: "5",
//       courseName: "",
//       courseProf: "",
//       userId: "",
//       courseStartTime: "",
//       courseEndTime: "",
//       courseDate: "",
//     },
//     {
//       cousrseId: "6",
//       courseName: "",
//       courseProf: "",
//       userId: "",
//       courseStartTime: "",
//       courseEndTime: "",
//       courseDate: "",
//     },
//     {
//       cousrseId: "7",
//       courseName: "",
//       courseProf: "",
//       userId: "",
//       courseStartTime: "",
//       courseEndTime: "",
//       courseDate: "",
//     },
//     {
//       cousrseId: "8",
//       courseName: "",
//       courseProf: "",
//       userId: "",
//       courseStartTime: "",
//       courseEndTime: "",
//       courseDate: "",
//     },
//     {
//       cousrseId: "9",
//       courseName: "",
//       courseProf: "",
//       userId: "",
//       courseStartTime: "",
//       courseEndTime: "",
//       courseDate: "",
//     },
//     {
//       cousrseId: "10",
//       courseName: "",
//       courseProf: "",
//       userId: "",
//       courseStartTime: "",
//       courseEndTime: "",
//       courseDate: "",
//     },
  
//   ]
//   const data = useMemo(
//     () =>
//       dummyClass
//         .map(() => ({
//           // name: faker.name.lastName() + faker.name.firstName(),
//           // email: faker.internet.email(),
//           // phone: faker.phone.phoneNumber(),
//           time: time,
//           mon: 1,
//           tue: 0,
//           wed: 0,
//           thr: 0,
//           fri: 0,
//           sat: 0,
//           sun: 0
//         })),
//     []
//   );
  
//   return (
//   <ClassContainer>
//     <ClassTable columns={columns} data={data} />;

//   </ClassContainer>
// )