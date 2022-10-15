import React, { useEffect, useState } from "react";
import { classStudentList, studentAttendState } from "./AdminCalendarModal";
import {
  AdminAttednTableTd,
  AdminAttendTableTr,
  AdminTableTh,
  AdminTableWrapper,
  CourseNameWrapper,
} from "./adminStyle/AdminCalendarModalInputstyled";
import {
  AdminSelect,
  AdminTableHeadDiv,
} from "./adminStyle/AdminMemberTableStyle";
import { api } from "../../../utils/api";

const AdminAttendStudentList = ({
  courseName,
  courseId,
}: {
  courseName: string;
  courseId: number;
}) => {
  const [studentList, setStudentList] = useState<studentAttendState[]>([
    {
      userId: "",
      userName: "",
      attend: "",
    },
  ]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (courseId !== 0) {
      api
        .get("/admin/getAttendanceList/" + courseId)
        .then((e) => {
          console.log(e.data.courseResList);
          // e.data.courseResList
          let temp = e.data.courseResList.map((element: any) => {
            return { ...element, attend: element.attendancedContent };
          });
          console.log(temp);
          setStudentList(temp);
          setLoading(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [courseId]);
  const onChange = (e: any) => {
    console.log(e.target.id, e.target.value);
    api
      .put("/course/changeAttendance", {
        courseId,
        userId: e.target.id,
        attendancedContent: e.target.value,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      {courseName === "" ? (
        <CourseNameWrapper></CourseNameWrapper>
      ) : (
        <CourseNameWrapper>{courseName}</CourseNameWrapper>
      )}
      <AdminTableWrapper>
        <thead>
          <tr>
            <AdminTableTh widthLength={60}>
              <AdminTableHeadDiv>No.</AdminTableHeadDiv>
            </AdminTableTh>
            <AdminTableTh widthLength={150}>
              <AdminTableHeadDiv>Name</AdminTableHeadDiv>
            </AdminTableTh>
            <AdminTableTh widthLength={150}>
              <AdminTableHeadDiv>출결 변경</AdminTableHeadDiv>
            </AdminTableTh>
          </tr>
        </thead>
        {loading &&
          Object.keys(studentList).map((e: any, i: number) => (
            <tbody key={i}>
              <AdminAttendTableTr>
                <AdminAttednTableTd widthLength={60}>{i}</AdminAttednTableTd>
                <AdminAttednTableTd widthLength={150}>
                  {studentList[e].userName}
                </AdminAttednTableTd>
                <td>
                  <AdminSelect
                    id={studentList[e].userId}
                    onChange={onChange}
                    defaultValue={studentList[e].attend}
                  >
                    <option key="출석" value="출석">
                      출석
                    </option>
                    <option key="지각" value="지각">
                      지각
                    </option>
                    <option key="결석" value="결석">
                      결석
                    </option>
                  </AdminSelect>
                </td>
              </AdminAttendTableTr>
            </tbody>
          ))}
      </AdminTableWrapper>
    </div>
  );
};

export default AdminAttendStudentList;
