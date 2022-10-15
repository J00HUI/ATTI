import React, { useEffect, useState } from "react";
import moment from "moment";
import styled from "styled-components";
import Modal from "../../Modal";
import InputSchedule from "./InputSchedule";
import {
  AddClassButton,
  AdminScheduleAddButton,
  AdminScheduleAddText,
  AdminSheduleDeleteButton,
  ConnectButton,
  DeleteButton,
  ExistenceClass,
  LeftBar,
  ScheduleLi,
  ScheduleUl,
  TempDiv,
  TextWrapper,
} from "./SchedulePageStyle";
import { useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import { palette } from "../../../styles/palette";
import { api } from "../../../utils/api";
import { useDispatch } from "react-redux";
import { setStudentList } from "../../../store/classMeeting/studentList";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useLocation } from "react-router-dom";
import ClassCheckModal from "./classCheckModal";

export interface weekClassSchedule {
  courseId: string | null;
  courseName: string;
  courseTeacherName: string;
  courseStartTime: string;
  courseEndTime: string;
  courseDate: string;
  weekName: string | null | undefined;
  activate: boolean;
}

const SchedulePage = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
const LeftWrapper = styled.div`
  display: flex;
  width: 80px;
  flex-direction: column;
  margin-top: 3.7vh;
`;
const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const WeekStringWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 3vh;
`;

const WeekString = styled.div`
  margin-left: 6%;
  margin-right: 8%;
  margin-bottom: 1%;
`;

const DayScheduleList = styled.div`
  display: flex;
  /* flex-direction: column; */
`;

const SchedulePageWrapper = () => {
  const monToFri = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const [getMoment, setMoment] = useState(() => moment());
  const [weekList, setWeekList] = useState<string[]>([]);
  const [selectDay, setSelectDay] = useState<any>();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectDeleteSchedule, setSeleteDeleteSchedule] = useState<any>();
  const [weekStart, setWeekStart] = useState<string | undefined>(undefined);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [goTo, setGoto] = useState("");
  const departId = useSelector((store: RootState) => store.depart.departId);
  const [adminPageCheck, setAdminPageCheck] = useState(false);
  const [classCheckOpenModal, setClassCheckOpenModal] = useState(false);
  const [classCheck, setClassCheck] = useState("");

  const [insertSchedule, setInsertSchedule] = useState<weekClassSchedule>({
    courseId: "",
    courseName: "",
    courseTeacherName: "",
    courseStartTime: "",
    courseEndTime: "",
    courseDate: "",
    weekName: undefined,
    activate: false,
  });
  const [week, setWeek] = useState<weekClassSchedule[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const userInfo = useSelector((store: RootState) => store.userInfo);
  const location = useLocation();

  useEffect(() => {
    console.log(location);
    if (
      location.pathname.includes(
        "%EA%B4%80%EB%A6%AC%EC%9E%90%ED%8E%98%EC%9D%B4%EC%A7%80"
      )
    ) {
      setAdminPageCheck(true);
    }
  }, [location]);

  const [weekClassState, setWeekClassState] = useState<any>([
    {
      courseId: "",
      courseName: "",
      courseTeacherName: "",
      courseStartTime: "",
      courseEndTime: "",
      courseDate: "",
      weekName: undefined,
      activate: false,
    },
  ]);
  const navigate = useNavigate();

  async function connectMeeting(e: any) {
    await api
      .put("/course/enterCourse", {
        courseId: e.target.value,
        // courseId: 537845,
        userId: userInfo.id,
        clickDate: moment().format("YYYY-MM-DD HH:mm"),
        // clickDate: "2022-08-16 14:35",
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.message !== undefined && res.data.message === "출석") {
          setClassCheck("정상 출석입니다.");
          setClassCheckOpenModal(true);
        } else if (
          res.data.message !== undefined &&
          res.data.message === "지각"
        ) {
          setClassCheck("지각 입니다.");
          setClassCheckOpenModal(true);
        }
      });
    await api
      .get("/course/attendence/" + departId)
      .then((res) => {
        console.log(res.data);
        dispatch(setStudentList({ userList: [...res.data.attendenceList] }));
        setGoto(e.target.value);
        setLoading(true);
      })
      .catch((e) => {
        console.log(e);
      });
    // navigate("/classmeeting?courseId=" + e.target.value);
  }

  // useEffect(() => {
  //   if (loading && goTo !== "") {
  //   }
  // }, [loading]);

  const time = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];
  const handlerInserSchedule = (element: weekClassSchedule) => {
    // startTime,endTime 년-월-일 시간:분 으로 할것 (띄어쓰기 잊기 말기)
    api
      .post("/course/create", {
        departId: departId,
        courseName: element.courseName,
        courseTeacherName: element.courseTeacherName,
        courseStartTime: element.courseStartTime,
        courseEndTime: element.courseEndTime,
        courseDate: element.courseDate,
      })
      .then((res) => {
        element.courseDate = weekList[selectDay.weekIndex];
        const tempStart = moment(
          element.courseStartTime,
          "YYYY-MM-DD HH:mm"
        ).format("HH:mm");
        const tempEnd = moment(
          element.courseEndTime,
          "YYYY-MM-DD HH:mm"
        ).format("HH:mm");
        const now = moment().format("YYYY-MM-DD HH:mm");

        console.log(now);

        const tempActivate = moment(now).isAfter(element.courseEndTime);
        var e;
        if (tempActivate) {
          e = {
            ...element,
            courseId: res.data.courseId,
            courseStartTime: tempStart,
            courseEndTime: tempEnd,
            activate: false,
          };
        } else {
          e = {
            ...element,
            courseId: res.data.courseId,
            courseStartTime: tempStart,
            courseEndTime: tempEnd,
            activate: true,
          };
        }
        setInsertSchedule(e);
        let tempWeek = week;
        tempWeek?.push(e);
        let weekSchedule = weekClassState;
        setWeek(tempWeek);
        setIsOpenModal(false);
        let weekClass = tempWeek;
        for (let i = 0; i < monToFri.length; i++) {
          for (let j = 0; j < weekClass.length; j++) {
            if (weekClass[j].weekName === monToFri[i]) {
              for (let k = 0; k < time.length; k++) {
                if (time[k] === weekClass[j].courseStartTime) {
                  weekSchedule[i][k] = weekClass[j];
                }
              }
            }
          }
        }
        setWeekClassState(weekSchedule);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteSchedule = (element: weekClassSchedule) => {
    console.log(element.courseId);
    api
      .delete("/course/delete/" + element.courseId)
      .then((res) => {
        let tempWeek = week;
        let weekClass = tempWeek.filter((e: weekClassSchedule) => {
          return e.courseId === element.courseId;
        });
        let weekSchedule = weekClassState;
        for (let i = 0; i < monToFri.length; i++) {
          for (let j = 0; j < weekClass.length; j++) {
            if (weekClass[j].weekName === monToFri[i]) {
              for (let k = 0; k < time.length; k++) {
                if (time[k] === weekClass[j].courseStartTime) {
                  weekSchedule[i][k] = {
                    ...weekSchedule[i][k],
                    courseId: "",
                    courseName: "",
                    courseTeacherName: "",
                    courseStartTime: "",
                    courseEndTime: "",
                  };
                }
              }
            }
          }
        }
        let result = tempWeek.filter((e) => {
          return e.courseId !== element.courseId;
        });
        setWeek(result);
        setWeekClassState(weekSchedule);
        setIsOpenDeleteModal(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  let daySchedule: any = new Array(10).fill({
    courseId: "",
    courseName: "",
    courseTeacherName: "",
    courseStartTime: "",
    courseEndTime: "",
    courseDate: "",
    weekName: undefined,
  });
  let weekSchedule: any = [];
  useEffect(() => {
    setWeekStart(moment().day(0).format("YYYY-MM-DD"));
  }, []);
  useEffect(() => {
    if (weekStart !== undefined) {
      api
        .post("/course", {
          departId: departId,
          weekStartDate: weekStart,
        })
        .then((res) => {
          if (res.data.courseResList !== null) {
            let weekClass = res.data.courseResList.map((e: any) => {
              const weekName = moment(e.courseDate, "YYYY-MM-DD").format(
                "dddd"
              );
              const courseStartTime = moment(
                e.courseStartTime,
                "YYYY-MM-DD HH:mm"
              ).format("HH:mm");

              const courseEndTime = moment(
                e.courseEndTime,
                "YYYY-MM-DD HH:mm"
              ).format("HH:mm");
              const now = moment().format("YYYY-MM-DD HH:mm");
              let testFire = moment(now).isAfter(e.courseEndTime);

              let temp = {};
              if (testFire) {
                temp = {
                  ...e,
                  weekName,
                  courseStartTime,
                  courseEndTime,
                  activate: false,
                };
              } else {
                temp = {
                  ...e,
                  weekName,
                  courseStartTime,
                  courseEndTime,
                  activate: true,
                };
              }

              return temp;
            });

            monToFri.forEach((e: any) => {
              weekSchedule.push(daySchedule.slice(0, daySchedule.length - 1));
            });
            console.log(weekSchedule);
            console.log(daySchedule);
            for (let i = 0; i < monToFri.length; i++) {
              const startWeek = moment()
                .day(i + 1)
                .format("YYYY-MM-DD");
              for (let j = 0; j < weekClass.length; j++) {
                if (weekClass[j].weekName === monToFri[i]) {
                  for (let k = 0; k < time.length; k++) {
                    if (time[k] === weekClass[j].courseStartTime) {
                      weekSchedule[i][k] = weekClass[j];
                    }
                  }
                }
              }
              let tempWeekList = weekList;
              if (tempWeekList.length < 5) {
                tempWeekList.push(startWeek);
                setWeekList(tempWeekList);
              }
            }
            setWeekClassState(weekSchedule);
            setWeek(weekClass);
          } else {
            monToFri.forEach((e: any) => {
              weekSchedule.push(daySchedule.slice());
            });
            for (let i = 0; i < monToFri.length; i++) {
              const startWeek = moment()
                .day(i + 1)
                .format("YYYY-MM-DD");

              let tempWeekList = weekList;
              if (tempWeekList.length < 5) {
                tempWeekList.push(startWeek);
                setWeekList(tempWeekList);
              }
            }
            setWeekClassState(weekSchedule);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [weekStart]);
  function onClickAddSchedule(e: any) {
    setSelectDay({
      weekIndex: e.target.id,
      timeIndex: e.target.value,
      time: time[e.target.value],
      weekString: monToFri[e.target.id],
    });
    setIsOpenModal(true);
  }
  function calcColor(index: number) {
    const result = index % 5;
    if (result === 0) {
      return palette.pink_1;
    } else if (result === 1) {
      return palette.blue_1;
    } else if (result === 2) {
      return palette.green_1;
    } else if (result === 3) {
      return palette.purple_1;
    } else if (result === 4) {
      return palette.yellow_1;
    }
  }

  function calcColor3(index: number) {
    const result = index % 5;
    if (result === 0) {
      return palette.pink_3;
    } else if (result === 1) {
      return palette.blue_3;
    } else if (result === 2) {
      return palette.green_3;
    } else if (result === 3) {
      return palette.purlue_3;
    } else if (result === 4) {
      return palette.yellow_3;
    }
  }
  function calcColor4(index: number) {
    const result = index % 5;
    if (result === 0) {
      return palette.pink_4;
    } else if (result === 1) {
      return palette.blue_4;
    } else if (result === 2) {
      return palette.green_4;
    } else if (result === 3) {
      return palette.purlue_4;
    } else if (result === 4) {
      return palette.yellow_4;
    }
  }
  const handlerClassCheckModal = () => {
    setClassCheckOpenModal(false);
    setClassCheck("");
    navigate("/classmeeting?courseId=" + goTo);
  };
  return (
    <SchedulePage>
      {classCheckOpenModal && (
        <Modal
          onClickToggleModal={() => {
            setClassCheckOpenModal(false);
          }}
          height="28vh"
          width="23vw"
        >
          <ClassCheckModal
            classCheck={classCheck}
            handlerClassCheckModal={handlerClassCheckModal}
          />
        </Modal>
      )}
      {isOpenModal && (
        <Modal
          onClickToggleModal={() => {
            setIsOpenModal(false);
          }}
          height="55vh"
        >
          <InputSchedule
            weekList={selectDay}
            week={week}
            oneWeek={weekList}
            handlerInserSchedule={handlerInserSchedule}
          />
        </Modal>
      )}
      {isOpenDeleteModal && (
        <Modal
          onClickToggleModal={() => {
            setIsOpenDeleteModal(false);
          }}
        >
          {
            <AdminScheduleAddText>
              삭제하시겠습니까?
              <div>
                <div>
                  <AdminSheduleDeleteButton
                    onClick={() => {
                      deleteSchedule(selectDeleteSchedule);
                    }}
                  >
                    네
                  </AdminSheduleDeleteButton>
                  <AdminSheduleDeleteButton
                    onClick={() => {
                      setIsOpenDeleteModal(false);
                    }}
                  >
                    아니오
                  </AdminSheduleDeleteButton>
                </div>
              </div>
            </AdminScheduleAddText>
          }
        </Modal>
      )}
      <LeftWrapper>
        <div>
          <TempDiv />
          {Object.keys(time).map((e: any, i) => (
            <LeftBar key={i}>{time[e]}</LeftBar>
          ))}
        </div>
      </LeftWrapper>
      <RightWrapper>
        <WeekStringWrapper>
          {Object.keys(monToFri).map((e: any, i: number) => (
            <WeekString key={i}>{monToFri[e]}</WeekString>
          ))}
        </WeekStringWrapper>
        <DayScheduleList>
          {Object.keys(weekClassState).map((e: any, i: number) => (
            <ScheduleUl key={i} index={i}>
              {weekClassState[0].courseName !== "" && (
                <div>
                  {weekClassState[e].map((el: any, index: number) => (
                    <ScheduleLi key={index}>
                      {el.courseName !== "" ? (
                        <>
                          <ExistenceClass
                            extendsHeight={
                              Number(el.courseEndTime.substring(0, 2)) -
                              Number(el.courseStartTime.substring(0, 2))
                            }
                            calcColor={calcColor(index)}
                          >
                            <TextWrapper calcColor={calcColor4(index)}>
                              <div style={{ fontSize: "1.3em" }}>
                                {el.courseName}
                              </div>
                              <div style={{ fontSize: "0.9em" }}>
                                {el.courseTeacherName}
                              </div>
                              <div style={{ fontSize: "0.8em" }}>
                                {el.courseStartTime} ~ {el.courseEndTime}
                              </div>
                            </TextWrapper>
                            {!userInfo.admin ? null : adminPageCheck ? (
                              <DeleteButton
                                onClick={() => {
                                  setSeleteDeleteSchedule(el);
                                  setIsOpenDeleteModal(true);
                                }}
                              >
                                <ClearIcon />
                              </DeleteButton>
                            ) : null}

                            <ConnectButton
                              onClick={connectMeeting}
                              value={el.courseId}
                              calcColor={calcColor3(index)}
                              disabled={!el.activate}
                            >
                              접속하기
                            </ConnectButton>
                          </ExistenceClass>
                        </>
                      ) : (
                        <AddClassButton
                          disabled={!userInfo.admin || !adminPageCheck}
                          onClick={onClickAddSchedule}
                          id={i.toString()}
                          value={index}
                          adminPage={adminPageCheck}
                        ></AddClassButton>
                      )}
                    </ScheduleLi>
                  ))}
                </div>
              )}
            </ScheduleUl>
          ))}
        </DayScheduleList>
      </RightWrapper>
    </SchedulePage>
  );
};

export default SchedulePageWrapper;
