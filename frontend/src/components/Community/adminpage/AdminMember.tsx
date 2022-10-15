import React, { useState, useEffect } from "react";
import AdminMemberTable from "./AdminMemberTable";
export interface memberInterface {
  Team: string;
  Name: string;
  Email: string;
  Birth: string;
  출석률: string;
  on: string;
  역할: string;
}
const mockMember = [
  {
    Team: "SSAFY",
    Name: "범수 박",
    Email: "Park@ssafy.com",
    Birth: "1995.01.01",
    출석률: "80%",
    on: "On",
    역할: "관리자",
  },
];
const dummyMember = [
  {
    Team: "SSAFY",
    Name: "범수 박",
    Email: "Park@ssafy.com",
    Birth: "1995.01.01",
    출석률: "80%",
    on: "On",
    역할: "관리자",
  },
  {
    Team: "SSAFY",
    Name: "이현태",
    Email: "Lee@ssafy.com",
    Birth: "1989.01.01",
    출석률: "80%",
    on: "On",
    역할: "학생",
  },
  {
    Team: "SSAFY",
    Name: "test",
    Email: "Park@ssafy.com",
    Birth: "1998.02.01",
    출석률: "80%",
    on: "On",
    역할: "학생",
  },
  {
    Team: "SSAFY",
    Name: "w",
    Email: "a@ssafy.com",
    Birth: "1999.01.01",
    출석률: "80%",
    on: "On",
    역할: "학생",
  },
];

function AdminMember() {
  const [memberData, setMemberData] = useState<memberInterface[]>(mockMember);
  useEffect(() => {
    //axios로 데이터 받아오기
    setMemberData(dummyMember);
  }, []);
  const handlerSetMemberData = ({
    index,
    role,
  }: {
    index: number;
    role: string;
  }) => {
    let tempMemberData = memberData;
    tempMemberData[index].역할 = role;
    console.log(index, role);
    setMemberData((prev) => {
      return tempMemberData;
    });
  };
  return (
    <div>
      <AdminMemberTable
        memberData={memberData}
        handlerSetMemberData={handlerSetMemberData}
      />
    </div>
  );
}

export default AdminMember;
