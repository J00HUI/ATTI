import React, { useEffect, useState } from "react";
import OpenViduVideoComponent from "./OpenViduVideoComponent";
import styled from "styled-components";

const UserVideo = styled.div`
  /* width: 500px;
  height: 420px; */
  margin-top: ${(props) => (props.main ? `5px` : "3px")};
  margin-left: 3px;
  margin-right: 3px;
  margin-bottom: 3px;
  /* width: ${(props) => (props.main ? "960px" : "360px")}; */
  width: ${(props) => (props.main ? `${props.screenMode}px` : "240px")};
  /* height: ${(props) => (props.main ? "720px" : "240px")}; */
  border-radius: ${(props) => (props.main ? null : "25px")};

  /* border-radius: 25px; */
  box-shadow: 0 19px 51px 0 rgba(0, 0, 0, 0.16),
    0 14px 19px 0 rgba(0, 0, 0, 0.07);
  overflow: hidden;
  position: relative;
`;
const VideoAndNickNameParentDiv = styled.div`
  position: relative;
`;

const NickNameDiv = styled.div`
  display: inline;
  text-align: center;
  vertical-align: bottom;
  background-color: white;
  position: absolute;
  bottom: 5px;
  left: 15px;
  overflow: hidden;
`;
export default function UserVideoComponent(props) {
  const [screenMode, setScreenMode] = useState(960);
  console.log("UserVideoComponent", props);
  function getNickName() {
    return JSON.parse(props.streamManager.stream.connection.data).clientData;
  }
  const [main, setMain] = useState(false);
  useEffect(() => {
    if (props.main === "main") {
      setMain(true);
    }
    if (props.fullScreenLayoutMode === true) {
      console.log(props.fullScreenLayoutMode);
      setScreenMode(1280);
    } else {
      setScreenMode(800);
    }
  }, [props.fullScreenLayoutMode, props.main]);
  return (
    <VideoAndNickNameParentDiv>
      {props.streamManager !== undefined ? (
        <UserVideo main={main} id="aaaa" screenMode={screenMode}>
          <OpenViduVideoComponent
            streamManager={props.streamManager}
            main={props.main}
            fullScreenLayoutMode={props.fullScreenLayoutMode}
          />
          {main ? null : <NickNameDiv>{getNickName()}</NickNameDiv>}
        </UserVideo>
      ) : null}
    </VideoAndNickNameParentDiv>
  );
}
