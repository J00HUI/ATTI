import React, { useCallback, useState } from "react";
import moment from "moment";
import styled from "styled-components";
import {
  AdminCalendarAttendChange,
  AdminCalendarAttendMonthDiv,
  AdminCalendarAttendMonthSpan,
  AdminCalendarChangeButton,
  AdminCalendarTableWrapperDiv,
} from "./adminStyle/AdminCalendarPageStyle";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const CalTableHead = styled.table`
  width: 85%;
  height: 60vh;
`;
const CalTableBody = styled.tbody`
  width: 100%;
  height: 60vh;
`;

const CalTableTR = styled.tr`
  width: 100%;
`;

const AdminPageAttendCalendar = ({ handlerModal, handlerPickDay }) => {
  const [getMoment, setMoment] = useState(() => moment());

  const today = getMoment;
  const firstWeek = today.clone().startOf("month").week();
  const lastWeek =
    today.clone().endOf("month").week() === 1
      ? 53
      : today.clone().endOf("month").week();

  const calendarArr = ({ handlerModal, handlerPickDay }) => {
    let result = [];
    let week = firstWeek;
    for (week; week <= lastWeek; week++) {
      result.push(
        <CalTableTR key={week}>
          {Array(7)
            .fill(0)
            // eslint-disable-next-line no-loop-func
            .map((data, index) => {
              let days = today
                .clone()
                .startOf("year")
                .week(week)
                .startOf("week")
                .add(index, "day"); //d로해도되지만 직관성
              // console.log(days);
              if (days.format("MM") < moment().format("MM")) {
                if (days.format("MM") !== today.format("MM")) {
                  return (
                    <td key={index} style={{ backgroundColor: "gray" }}>
                      <span>{days.format("D")}</span>
                    </td>
                  );
                } else {
                  return (
                    <td key={index}>
                      <span>{days.format("D")}</span>
                      <AdminCalendarAttendChange
                        onClick={() => {
                          handlerPickDay(days.format("YYYY-MM-DD"));
                          handlerModal();
                        }}
                      >
                        출석변경
                      </AdminCalendarAttendChange>
                    </td>
                  );
                }
              } else if (days.format("MM") > moment().format("MM")) {
                if (days.format("MM") !== today.format("MM")) {
                  return (
                    <td key={index} style={{ backgroundColor: "gray" }}>
                      <span>{days.format("D")}</span>
                    </td>
                  );
                } else {
                  return (
                    <td key={index}>
                      <span>{days.format("D")}</span>
                    </td>
                  );
                }
              } else {
                if (days.format("MM") !== today.format("MM")) {
                  return (
                    <td key={index} style={{ backgroundColor: "gray" }}>
                      <span>{days.format("D")}</span>
                    </td>
                  );
                } else {
                  return (
                    <td key={index}>
                      <span>{days.format("D")}</span>
                      {Number(days.format("D")) <=
                        Number(today.format("D")) && (
                        <AdminCalendarAttendChange
                          onClick={() => {
                            console.log(days.format());
                            handlerPickDay(days.format("YYYY-MM-DD"));
                            handlerModal();
                          }}
                        >
                          출석변경
                        </AdminCalendarAttendChange>
                      )}
                    </td>
                  );
                }
              }
            })}
        </CalTableTR>
      );
    }
    return result;
  };

  return (
    <div>
      <AdminCalendarAttendMonthDiv>
        <AdminCalendarChangeButton
          onClick={() => {
            setMoment(getMoment.clone().subtract(1, "month"));
          }}
        >
          <ArrowBackIosNewIcon />
        </AdminCalendarChangeButton>
        <AdminCalendarAttendMonthSpan>
          {today.format("YYYY 년 MM 월")}
        </AdminCalendarAttendMonthSpan>
        <AdminCalendarChangeButton
          onClick={() => {
            setMoment(getMoment.clone().add(1, "month"));
          }}
        >
          <ArrowForwardIosIcon />
        </AdminCalendarChangeButton>
      </AdminCalendarAttendMonthDiv>
      <AdminCalendarTableWrapperDiv>
        <CalTableHead>
          <thead>
            <tr>
              <th>일</th>
              <th>월</th>
              <th>화</th>
              <th>수</th>
              <th>목</th>
              <th>금</th>
              <th>토</th>
            </tr>
          </thead>
          <CalTableBody>
            {calendarArr({ handlerModal, handlerPickDay })}
          </CalTableBody>
        </CalTableHead>
      </AdminCalendarTableWrapperDiv>
    </div>
  );
};

export default AdminPageAttendCalendar;
