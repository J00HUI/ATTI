import styled, { keyframes } from "styled-components";
import { CHATTING, QnA } from "./OpenViduTest";
import { palette } from "../../styles/palette";

const BigslideBox = keyframes`
  0%{
    height: 5vh;
  }

  100%{
    height:90vh
  }
`;
export const PeopleBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: 0px;
  width: 450px;
  height: 90vh;
  background-color: #474a57;
  margin-left: auto;
  border-radius: 5px;
  align-items: center;
  animation: ${BigslideBox} 1s 0s 1;
`;

export const ScreenText = styled.div`
  color: white;
`;

export const OpenviduBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const VideoBox = styled.div`
  /* min-height: 1vh; */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: fit-content;
  justify-content: center;
  /* margin-left: auto; */
  /* background-color: #333333; */
`;
export const QnAWrapper = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const QnABox = styled.div`
  width: 90%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: #fffce1;
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
`;

export const QnATitle = styled.div`
  margin-top: 7px;
  margin-left: 15px;
  height: 10%;
`;

export const QnAButtonWrapper = styled.span`
  display: flex;
`;

export const QnAMessage = styled.div`
  margin-top: 7px;
  margin-left: 3px;
  min-height: 50%;
`;
export const QnAButton = styled.button`
  margin-left: auto;
  margin-right: 5px;
  margin-top: auto;
  background-color: #d9d9d9;
  border: none;
  width: 45%;
  height: 25px;
  border-radius: 3px;
`;

export const ChatBox = styled.div`
  width: 100%;
  height: ${(props) => (props.QnAState !== undefined ? "40%" : "85%")};
  background-color: white;
  margin-top: 5px;
  margin-bottom: 15px;
  border-radius: 10px;
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
`;
export const MeetingRoom = styled.div`
  background-color: #333333;
  width: 100%;
  min-height: 100vh;
`;

export const SubStream = styled.div`
  /* width: ${(props) => (props.mainStream ? null : "100%")}; */
  width: 100%;
  display: flex;
  flex-direction: row;
  /* flex-wrap: wrap; */
  min-height: ${(props) => (props.mainStream ? null : "80vh")};
  overflow-x: ${(props) => (props.mainStream ? "scroll" : null)};
  overflow-y: hidden;
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
`;
export const MeetingButtonControl = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ChattingInputBox = styled.div`
  padding-left: 5px;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  width: 100%;
  height: 30%;
  background: ${(props) =>
    props.chattingSelect === QnA
      ? "#FFFCE0"
      : props.chattingSelect === CHATTING
      ? "white"
      : `#F6CEEC`};
  align-items: center;
`;
export const ChattingName = styled.div`
  display: flex;
  margin-left: 10px;
`;
export const ChattingInput = styled.textarea`
  width: 95%;
  height: 45%;
  border-radius: 10px;
  border: none;
  background-color: ${(props) =>
    props.chattingSelect === QnA
      ? "#FFFCE0"
      : props.chattingSelect === CHATTING
      ? "white"
      : `#F6CEEC`};
`;

export const ChattinBoxgWrapper = styled.div`
  padding-top: 10px;
  width: 100%;
  height: 70%;
  background-color: white;
  margin-top: 5px;
  margin-bottom: 15px;
  border-radius: 5px;
`;

export const ChattingSendButton = styled.button`
  border-radius: 5px;
  margin-left: auto;
  background-color: #dbeafe;
  border: none;
  width: 50px;
  height: 35px;
  margin-right: 15px;
  margin-top: auto;
  margin-bottom: 4px;
`;

export const ChattingAndCancleButtonWrapper = styled.span`
  margin-left: auto;
  margin-top: auto;
`;
export const ChattingAndQnAWrapper = styled.div`
  margin-top: 5px;
  width: 100%;
`;
export const ChattingAndQnASelect = styled.select`
  margin-right: auto;
  margin-left: 5px;
  border: none;
  width: 30%;
  border-bottom: 1px solid;
  background-color: ${(props) =>
    props.chattingSelect === QnA ? "#FFFCE0" : "white"};
`;

export const ChattingBox = styled.div`
  width: 95%;
  height: ${(props) => (props.openAttentList ? "45%" : "80%")};
`;
export const MeetingButtonWrapper = styled.div`
  position: fixed;
  bottom: 1%;
  left: 20%;
`;
export const MeetingButtons = styled.div`
  display: flex;
  width: fit-content;
  justify-content: center;
`;

export const LayoutButton = styled.button`
  position: fixed;
  width: 180px;
  height: 50px;
  border-radius: 10px;
  background: #333333;
  color: white;
  border-color: white;
  bottom: 10px;
  z-index: 1;
  left: 10px;
`;
const ScreenModeButton = styled.button`
  position: fixed;
  width: 180px;
  height: 50px;
  border-radius: 10px;
  color: white;
  border-color: white;
  z-index: 1;
  left: 10px;
`;
export const FullscreenButton = styled(ScreenModeButton)`
  bottom: 65px;
  background: ${(props) =>
    props.fullScreenLayoutMode ? "#DBEAFE" : "#333333"};
  color: ${(props) => (props.fullScreenLayoutMode ? "black" : "white")};
`;
export const NotFullScreenButton = styled(ScreenModeButton)`
  background: ${(props) =>
    props.fullScreenLayoutMode ? "#333333" : "#DBEAFE"};
  bottom: 120px;
  color: ${(props) => (props.fullScreenLayoutMode ? "white" : "black")};
`;
export const MeetingButton = styled.button`
  border-color: white;
  background: #333333;
  border-radius: 15px;
  color: white;
  width: 160px;
  height: 50px;
  margin-right: 5px;
  margin-left: 3px;
`;
export const MeetingAttendAndChattingWrapper = styled.span`
  width: 100%;
  height: 6%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const MeetingAttendAndChattingButton = styled.button`
  border: none;
  border-radius: 8px;
  /* background-color: #cfd1dc; */
  color: black;
  text-align: center;
  width: 40%;
  height: 60%;
  margin-right: 3px;
  margin-left: 3px;
  background-color: ${(props) => (props.isClick ? "#DBEAFE" : "#7A7C87")};
  /*  inset,0px 0px 5px rgba(200,200,200,0.5);  */
`;

export const AllMicAndCamOff = styled.button`
  border: none;
  border-radius: 8px;
  /* background-color: #cfd1dc; */
  color: black;
  text-align: center;
  width: 40%;
  height: 60%;
  margin-right: 3px;
  margin-left: 3px;
  background-color: "#7A7C87";
`;

export const ReactionButton = styled.button`
  border: none;
  border-right: 2px solid;
  border-left: 2px solid;
  background: none;
`;

export const ReactionWrapper = styled.div`
  position: fixed;
  background-color: #dbeafe;

  top: ${(props) => `${props.y}px`};
  left: ${(props) => `${props.x}px`};
`;
const slideBox = keyframes`
  0%{
    height: 90vh;
  }

  100%{
    height:5vh
  }
`;

export const SmallPeopleBoxWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  width: 360px;
  height: 5vh;
  background-color: #474a57;
  right: 0;
  bottom: 0;
  border-radius: 25px;
  align-items: center;
  animation: ${slideBox} 1s 0s 1;
`;

const slideButton = keyframes`
  0%{
    opacity: 0%;
  }
  70%{
    opacity: 0%;
  }
  100%{
    opacity: 100%;
  }
`;

export const SmallMeetingAttendAndChattingWrapper = styled.span`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SmallMeetingAttendAndChattingButton = styled(
  MeetingAttendAndChattingButton
)`
  animation: ${slideButton} 1.3s 0s 1;
`;

export const AttendsListConnection = styled.div`
  padding-top: 10px;
  margin-bottom: 5px;
  margin-left: 5px;
`;

export const AttendsListNotConnection = styled(AttendsListConnection)`
  border-top: 2px solid #d3d3d3;
`;

export const AttendsListConnectionDiv = styled.div`
  margin-left: 10px;
  font-size: small;
`;

export const QestionAnswerCommentInput = styled.input`
  width: 90%;
  height: 25px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid;
  background-color: none;
  background: none;
`;
