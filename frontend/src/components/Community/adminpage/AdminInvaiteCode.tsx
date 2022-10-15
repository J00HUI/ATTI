import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { api } from "../../../utils/api";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const MainContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ContentWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 25vh;
  /* margin-left: 25%;  */
`;

const Input = styled.input`
  width: 60%;
  font-size: x-large;
  text-align: center;
`;

function AdminInvaiteCode() {
  const [departCode, setDepartCode] = useState<string>("");
  const departId = useSelector((store: RootState) => store.depart.departId);
  const departName = useSelector((store: RootState) => store.depart.departName);
  useEffect(() => {
    api("/admin/depart/check/" + departId).then((res) => {
      setDepartCode(res.data.departCode);
    });
  }, []);
  return (
    <MainContent>
      <ContentWrapper>
        <div
          style={{
            fontSize: "xx-large",
            fontWeight: "bolder",
            marginBottom: "5vh",
          }}
        >
          초대 코드
        </div>
        <div
          style={{
            fontSize: "large",
            fontWeight: "bold",
            marginBottom: "3vh",
          }}
        >
          {departName} 채널에 입장할 수 있는 초대 코드입니다.
        </div>
        <div
          style={{
            marginBottom: "3vh",
          }}
        >
          (가입된 채널이 없을 시의 홈 화면이나 채널 추가 버튼을 클릭 시 나오는
          입력창에 입력하여 현재 채널에 입장할 수 있습니다.)
        </div>
        <Input disabled={true} value={departCode}></Input>
      </ContentWrapper>
    </MainContent>
  );
}

export default AdminInvaiteCode;
