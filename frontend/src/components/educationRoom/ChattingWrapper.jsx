import React, { useEffect, useState, useRef } from "react";
import Chatting from "./chatting";
import styled from "styled-components";
import { ChatBox } from "./OpenViduTestStyled";

const ChattingWrapper = ({ chatList, anonymouseMode, QnAState }) => {
  const [chatting, setChatting] = useState([]);
  // console.log(chatList);
  const chattingScroll = useRef(null);
  useEffect(() => {
    setChatting((prev) => {
      return [...prev, chatList];
    });
  }, [chatList]);
  useEffect(() => {
    chattingScroll.current.scrollTop = chattingScroll.current.scrollHeight;
    console.log(chattingScroll.current.scrollTop);
  }, [chatting]);
  console.log(chatting);
  return (
    <ChatBox ref={chattingScroll} QnAState={QnAState}>
      {chatting.map((e, i) => (
        <div key={i}>
          <Chatting
            type={e.type}
            nickname={e.from}
            data={e.message}
            anonymouseMode={anonymouseMode}
          />
        </div>
      ))}
    </ChatBox>
  );
};

export default ChattingWrapper;
