import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Video = styled.video`
  width: 100%;
  /* width: ${(props) => (props.main ? `100%` : "360px")}; */
  position: relative;
`;

export default function OpenViduVideoComponent(props) {
  const videoRef = useRef();
  const [main, setMain] = useState(false);
  const [screenMode, setScreenMode] = useState(960);
  console.log(props.fullScreenLayoutMode);
  useEffect(() => {
    if (props && !!videoRef) {
      props.streamManager.addVideoElement(videoRef.current);
    }
    if (props.main === "main") {
      setMain(true);
    }
    if (props.fullScreenLayoutMode === true) {
      console.log(props.fullScreenLayoutMode);
      setScreenMode(1920);
    } else {
      setScreenMode(960);
    }
  }, [props]);
  return (
    <Video autoPlay={true} ref={videoRef} main={main} screenMode={screenMode} />
  );
}
