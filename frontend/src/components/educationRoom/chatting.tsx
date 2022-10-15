import styled from "styled-components";

interface chatProps {
  type: string;
  nickname: string;
  data: string;
}

const ChattingDiv = styled.div`
  margin-top: 5px;
  margin-bottom: 10px;
  border-bottom: 1px solid;
  margin-left: 3px;
  margin-right: 3px;
  background: white;
  height: 100%;
  width: 100%;
`;

const PrivateChattingDiv = styled(ChattingDiv)`
  background: rgba(238, 164, 206, 0.25);
`;

export const QnAResultDiv = styled(ChattingDiv)`
  background: #fffce1;
`;

const Chatting = ({ type, nickname, data }: chatProps) => {
  return (
    <div>
      <div>
        {type === "public" && (
          <ChattingDiv>
            <span>{nickname}님</span>
            <div>
              <span>{data}</span>
            </div>
          </ChattingDiv>
        )}
        {type === "private" && (
          <PrivateChattingDiv>
            <span>{nickname}님 (1:1)</span>
            <div>
              <span>{data}</span>
            </div>
          </PrivateChattingDiv>
        )}
        {type === "QnAResult" && (
          <QnAResultDiv>
            <span>{nickname}님 (QnA 답변)</span>
            <div>
              <span>{data}</span>
            </div>
          </QnAResultDiv>
        )}
      </div>
    </div>
  );
};

export default Chatting;
