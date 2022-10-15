import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import {
  AttendsListConnection,
  AttendsListConnectionDiv,
  AttendsListNotConnection,
} from "./OpenViduTestStyled";
import MessageIcon from "@mui/icons-material/Message";
import { PRIVATE } from "./OpenViduTest";

interface peopleListInterface {
  data: string;
  connectionId: string;
  creationTime: number;
  dispose: boolean;
  remoteOptions: any;
  session: any;
  stream: any;
}
type peopleProps = {
  peopleList: [peopleListInterface];
  setChattingInfo: ({
    data,
    connectionId,
  }: {
    data: string;
    connectionId: string;
  }) => void;
  openChattingList: boolean;
  notConnectionList: any;
  nameButtonChangeChatting: (value: string) => void;
  // children: React.ReactNode;
};
interface styledProps {
  openChattingList: boolean;
}
const AttendeesWrapper = styled.div<styledProps>`
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    padding-right: 15px;
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
  width: 95%;
  height: ${(props) => (props.openChattingList ? "35%" : "85%")};
  border-radius: 5px;
`;
const AttendeesListDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  color: black;
`;
const AttendWrapper = styled.div`
  height: 25px;
  display: flex;
  width: 100%;
  align-items: center;
  /* justify-content: space-between; */
`;
const NickNameWrapper = styled.div`
  margin-left: 5px;
`;
const AudioAndVideoButton = styled.button`
  background: none;
  border: none;
`;
const NameButton = styled.button`
  background: none;
  border: none;
`;
const AudioAndVideoWrapper = styled.div`
  margin-left: auto;
  margin-right: 30px;
`;
const AttendeesList = ({
  peopleList,
  setChattingInfo,
  openChattingList,
  notConnectionList,
  nameButtonChangeChatting,
}: peopleProps) => {
  console.log(peopleList);
  const onClick = (event: any) => {
    console.log(event.target);

    setChattingInfo({
      data: event.target.value,
      connectionId: event.target.id,
    });
    nameButtonChangeChatting(PRIVATE);
  };

  return (
    <AttendeesWrapper openChattingList={openChattingList}>
      {peopleList !== undefined && peopleList.length > 0 ? (
        <AttendeesListDiv>
          <AttendsListConnection>접속자</AttendsListConnection>
          {peopleList.map((e, i) => (
            <AttendWrapper key={i}>
              <NickNameWrapper>
                <NameButton
                  id={e.connectionId}
                  value={JSON.parse(e.data).clientData}
                  onClick={onClick}
                >
                  {JSON.parse(e.data).clientData}
                </NameButton>
              </NickNameWrapper>
              {e.stream !== undefined ? (
                <AudioAndVideoWrapper>
                  <AudioAndVideoButton>
                    <MessageIcon />
                  </AudioAndVideoButton>
                  <AudioAndVideoButton>
                    {e.stream.videoActive ? (
                      <VideocamIcon></VideocamIcon>
                    ) : (
                      <VideocamOffIcon />
                    )}
                  </AudioAndVideoButton>
                  <AudioAndVideoButton>
                    {e.stream.audioActive ? <MicIcon /> : <MicOffIcon />}
                  </AudioAndVideoButton>
                </AudioAndVideoWrapper>
              ) : null}
            </AttendWrapper>
          ))}
          <AttendsListNotConnection>미접속자</AttendsListNotConnection>
          {/* <div>
            {Object.keys(notConnectionList.userList).map(
              (e: string, i: number) => (
                <AttendsListConnectionDiv key={i}>
                  {notConnectionList.userList[Number(e)].userName}
                </AttendsListConnectionDiv>
              )
            )}
          </div> */}
          <div>
            {Object.keys(notConnectionList).map((e: string, i: number) => (
              <AttendsListConnectionDiv key={i}>
                {notConnectionList[e]}
              </AttendsListConnectionDiv>
            ))}
          </div>
        </AttendeesListDiv>
      ) : null}
    </AttendeesWrapper>
  );
};

export default AttendeesList;
