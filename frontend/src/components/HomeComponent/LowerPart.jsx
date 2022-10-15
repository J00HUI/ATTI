import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { palette } from "../../styles/palette";
import { ButtonBlue } from "../ButtonStyled";
import SouthIcon from "@mui/icons-material/South";
import Img1 from "../../assets/images/그림1.png";
import Img2 from "../../assets/images/그림2.png";
import Img3 from "../../assets/images/그림3.png";
import Img4 from "../../assets/images/그림4.png";
import Img5 from "../../assets/images/그림5.png";

function LowPort() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
  });

  // 질문을 남겨보세요 질문이 게시판에 남아있어요! 첫번째 두번째 내용이 겹침
  // 출석체크를 손쉽게 할 수 있어요. 화상미팅과
  return (
    <Main>
      {/* 1번 */}
      <WhiteContent>
        <TextDiv>
          <BigText>우리들만의 수업 채널을 만들어보세요</BigText>
          <SideText>
            채널에는 주제에 맞는 카테고리를 선택하고
            <br />반 친구들과 게시글을 통해 소통하고 공감할 수 있습니다
          </SideText>
        </TextDiv>
        <ImageDiv data-aos="zoom-in">
          <Imgs src={Img1} data-aos="zoom-in"/>
        </ImageDiv>
      </WhiteContent>
      {/* 2번 */}
      <BlueContent>
        <ImageDiv data-aos="zoom-in">
        <Imgs src={Img2} data-aos="zoom-in"/>
        
        </ImageDiv>
        <TextDiv>
          <BigText>시간표를 통해 온라인 수업에 접속해보세요</BigText>
          <SideText>
            시간표에서 화상 회의를 만들고 접속할 수 있어요
            <br />
            클릭 한번으로 출석체크를 손쉽게 확인 할 수 있습니다
          </SideText>
        </TextDiv>
      </BlueContent>
      {/* 3번 */}
      <WhiteContent>
        <TextDiv>
          <BigText>익명모드로 대화해요</BigText>
          <SideText>
            화상회의에서 발표하기 망설여진다면
            <br />
            익명모드를 요청하여 당당하게 발표 할 수 있습니다
          </SideText>
        </TextDiv>
        <ImageDiv data-aos="zoom-in">
        <Imgs src={Img3} data-aos="zoom-in"/>
        </ImageDiv>
      </WhiteContent>
      {/* 4번 */}
      <BlueContent>
        <ImageDiv data-aos="zoom-in">
        <Imgs src={Img4} data-aos="zoom-in"/>
        </ImageDiv>
        <TextDiv>
          <BigText>온라인 수업에서 질문을 남겨보세요!</BigText>
          <SideText>
            나와 친구들이 호스트에게 질문했던 질문들은
            <br />
            질문게시판에서 화상회의에 나눴던 질문을 다시 볼 수 있습니다
          </SideText>
        </TextDiv>
      </BlueContent>
      {/* Final */}
      <FinalContent>
        <FinalDiv>
          <TextDiv>
            <BigText>수업을 더 편하고 즐겁게</BigText>
            <SideText>
              초대 코드를 통해 인증된 학생들만 안전한 대화할 수 있는 익명 시스템과
              <br />
              화상회의와 시간표를 하나로 관리하고 직접 게시판을 개설하여 운영하는 커뮤니티 플랫폼
              <br /> 이제 소규모부터 대규모 학교까지 학생을 관리하고 함께 회의하고 공부해요!
            </SideText>
          </TextDiv>
          <ImageDiv data-aos="zoom-in">
          <Imgs src={Img5} data-aos="zoom-in" style={{height: "600px"}}/>
          </ImageDiv>
        </FinalDiv>
      </FinalContent>
      {/* 시작해볼까 */}
      <SideText>✨ 이제 시작해 볼까요? ✨</SideText>
      <BoxStyle>
        <span>click!</span>
        <SouthIcon color="action" sx={{ fontSize: 40 }} />
      </BoxStyle>
      <SignupButton onClick={() => navigate("/signup")}>
        회원가입하러 가기
      </SignupButton>
    </Main>
  );
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  padding-bottom: 70px;
  /* background: linear-gradient(#a0b0fd 0%, #ffffff 100%); */
`;

const WhiteContent = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 1fr;
  column-gap: 50px;
  width: 100%;
  height: auto;
  background: white;
  /* border: 1px solid ${palette.blue_1}; */
`;
const BlueContent = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 1fr;
  column-gap: 50px;
  width: 100%;
  height: auto;
  background: #f2f3fb;
  /* border: 1px solid ${palette.blue_1}; */
`;

const TextDiv = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* border: 1px solid; */
`;

const Imgs = styled.img`
    width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const ImageDiv = styled.div`
  width: 80%;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* border: 1px solid; */
`;

const BigText = styled.div`
  font-size: 3rem;
`;
const SideText = styled.div`
  font-size: 1.5rem;
`;

const FinalContent = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: 1fr;
  column-gap: 50px;
  width: 100%;
  height: 600px;
  background: linear-gradient(#f2f3fb -20%, white 100%);
  margin-bottom: 300px;
  /* border: 1px solid ${palette.blue_1}; */
`;

const FinalDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80vw;
  height: auto;
  /* border: 1px solid; */
  text-align: center;
`;

const floating = keyframes`
    0% {
        transform: translateY(0);    
    }
    50% {
        transform: translateY(-15px);
    }
    100% {
        transform: translateY(0);
    }
`;

const BoxStyle = styled.div`
  width: 50px;
  height: 50px;
  transform: scaleY(-1);
  animation: ${floating} 2s ease infinite;
  margin: 40px 0px 15px 0px;
`;

const SignupButton = styled(ButtonBlue)`
  padding: 10px 40px;
  font-size: 1.2rem;
  border-radius: 1rem;
`;

export default LowPort;
