import React from "react";
import styled from "styled-components";
import { memberInterface } from "./AdminMember";
import {
  AdminSelect,
  AdminTableHeadBorder,
  AdminTableHeadDiv,
  AdminTableTd,
  AdminTableTR,
  AdminTableWrapperDiv,
} from "./adminStyle/AdminMemberTableStyle";

const Table = styled.table`
  margin-top: 5%;
  width: 95%;
  height: 100%;
  border-collapse: collapse;
`;

const AdminMemberTable = ({
  memberData,
  handlerSetMemberData,
}: {
  memberData: memberInterface[];
  handlerSetMemberData: ({
    index,
    role,
  }: {
    index: number;
    role: string;
  }) => void;
}) => {
  const onChange = (e: any) => {
    handlerSetMemberData({ index: e.target.name, role: e.target.value });
  };
  return (
    <AdminTableWrapperDiv>
      <Table>
        <thead>
          <tr>
            <AdminTableHeadBorder widthLength={6} heightLenth={4}>
              <AdminTableHeadDiv>No.</AdminTableHeadDiv>
            </AdminTableHeadBorder>
            <AdminTableHeadBorder widthLength={10} heightLenth={4}>
              <AdminTableHeadDiv>채널</AdminTableHeadDiv>
            </AdminTableHeadBorder>
            <AdminTableHeadBorder widthLength={8} heightLenth={4}>
              <AdminTableHeadDiv>Name</AdminTableHeadDiv>
            </AdminTableHeadBorder>
            <AdminTableHeadBorder widthLength={15} heightLenth={4}>
              <AdminTableHeadDiv>Email</AdminTableHeadDiv>
            </AdminTableHeadBorder>
            <AdminTableHeadBorder widthLength={10} heightLenth={4}>
              <AdminTableHeadDiv>Birth</AdminTableHeadDiv>
            </AdminTableHeadBorder>
            <AdminTableHeadBorder widthLength={7} heightLenth={4}>
              <AdminTableHeadDiv>출석률</AdminTableHeadDiv>
            </AdminTableHeadBorder>
            <AdminTableHeadBorder widthLength={6} heightLenth={4}>
              <AdminTableHeadDiv>역할</AdminTableHeadDiv>
            </AdminTableHeadBorder>
          </tr>
        </thead>
        <tbody>
          {memberData.map((e, i) => (
            <AdminTableTR key={i}>
              <AdminTableTd>{i + 1}</AdminTableTd>
              <AdminTableTd>{e.Team}</AdminTableTd>
              <AdminTableTd>{e.Name}</AdminTableTd>
              <AdminTableTd>{e.Email}</AdminTableTd>
              <AdminTableTd>{e.Birth}</AdminTableTd>
              <AdminTableTd>{e.출석률}</AdminTableTd>
              <td>
                <AdminSelect
                  key={e.역할}
                  defaultValue={e.역할}
                  name={i.toString()}
                  onChange={onChange}
                >
                  <option value="관리자">관리자</option>
                  <option value="학생">학생</option>
                </AdminSelect>
              </td>
            </AdminTableTR>
          ))}
        </tbody>
      </Table>
    </AdminTableWrapperDiv>
  );
};

export default AdminMemberTable;
