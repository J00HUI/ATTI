import React, { useEffect, useState } from "react";
import AdminPageAttendCalendar from "./AdminPageAttendCalendar";
import Modal from "../../Modal";
import AdminCalendarModal from "./AdminCalendarModal";

export interface weekClassAttend {
  courseId: string | null;
  courseName: string;
  courseProf: string;
  courseStartTime: string;
  courseEndTime: string;
  courseDate: string;
}

function AdminAttendance() {
  const [pickDay, setPickDay] = useState<string>("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handlerModal = () => {
    setIsOpenModal((prev) => {
      return !prev;
    });
  };
  const handlerPickDay = (element: string) => {
    setPickDay(element);
  };
  return (
    <div>
      {isOpenModal && (
        <Modal
          onClickToggleModal={() => {
            setIsOpenModal(false);
          }}
          height="75vh"
        >
          <div>
            <div>{pickDay}</div>
            <div>
              <AdminCalendarModal pickDay={pickDay} />
            </div>
          </div>
        </Modal>
      )}
      <AdminPageAttendCalendar
        handlerPickDay={handlerPickDay}
        handlerModal={handlerModal}
      />
    </div>
  );
}

export default AdminAttendance;
