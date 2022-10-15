import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface userListState {
  userId: string;
  userName: string;
}

interface userListInterface {
  userList: userListState[];
}

const initialState: userListInterface = {
  userList: [
    {
      userId: "",
      userName: "",
    },
  ],
};

export const studentListSlice = createSlice({
  name: "studentList",
  initialState,
  reducers: {
    setStudentList: (
      state,
      action: PayloadAction<{ userList: userListState[] }>
    ) => {
      console.log(action.payload);
      state.userList = action.payload.userList;
    },
    setSessionExit: (state) => {
      state = initialState;
    },
  },
});

export const { setStudentList, setSessionExit } = studentListSlice.actions;

export const studentListState = (state: RootState) => state.studentList;

export default studentListSlice.reducer;
