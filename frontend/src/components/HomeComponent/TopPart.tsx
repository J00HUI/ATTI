import * as React from "react";

import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Logo from "../../assets/images/logoCircle.png";
import { ButtonBlue, ButtonPurple } from "../ButtonStyled";
//import mainBG from "../../assets/images/mainBG.png";
import mainBG from "../../assets/images/HomeBG.png";
import SnowAnimation from "./SnowAnimation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";


function TopPort() {
  const [isTextTyping, setIsTextTyping] = useState<boolean>(false);

  const content = "커뮤니티와 화상수업의 공간\nEducation Platform\n\"ATTI\"";
  const text = document.querySelector(".text") as HTMLParagraphElement;
  let i = 0;

  function typing() {
    if (i < content.length) {
      let txt = content.charAt(i);
      text.innerHTML += txt === "\n" ? "<br/>" : txt;
      i++;
    } else setIsTextTyping(false);
  }
  {
    isTextTyping && setInterval(typing, 200);
  }

  const navigate = useNavigate();

  useEffect(() => {
    //   navigate("/");
    const text = document.querySelector(".text") as HTMLParagraphElement;
    text.innerHTML = "";
    setIsTextTyping(true);
  }, []);

  
  // 데이터 받아오기
  const { auth } = useSelector((state: RootState) => state.userInfo);
  const  departList:any[] = useSelector((state: RootState) => state.depart.departList);
  const  categoryList:any[] = useSelector((state: RootState) => state.category.categoryList);


  // const { randomColor } = useSelector((state: RootState) => state.userInfo);

  const signSubmit = async (e: any) => {
    e.preventDefault();
    // 로그인 안했으면
    if(!auth) navigate("/login");
    else if(departList==null) navigate("/welcome"); // 채널가입된게 없다면
    else navigate(`/community/${departList[0].departId}/${categoryList[0].categoryId}`); // 채널가입된게 있다면✨✨✨✨ //   : `/community/${departList[0].departId}/${categoryList[0].categoryId}`
  };


  return (
    <>
      <Main>
        <SnowAnimation />
        <Grid>
          <Textbox>
            <span className="text"></span>
            {isTextTyping && <BlinkSpan className="blink">|</BlinkSpan>}
          </Textbox>
          <StyledContent>
            <LogoImg src={Logo} alt="Logo Cumputer Img" />
          <GoButton onClick={signSubmit}>
            채널 입장하기
            {/* 지금 사용해보기 */}
          </GoButton>
          </StyledContent>
        </Grid>
      </Main>
    </>
  );
}

const Main = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  width: 100%;
  max-width: 1600px;
  height: 850px;
  margin-bottom: 50px;
  text-align: center;
  
::after {
    width: 100%;
    height: 900px;
    content: "";
    background: url(${mainBG});
    /* background-size: cover; */
    background-size: 100% 900px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -2;
    opacity: 0.5;
    filter: blur(1px);
  }
  &__content {
    position: relative;
    align-self: center;
    padding: 3rem 0;
  }
`;

const blink = keyframes`
   to {
    opacity: 0;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 100px;
`;

const Textbox = styled.div`
  font-size: 4.5rem;
  text-align: left;
  font-weight: 600;
  line-height: 7.5rem;
  margin-top:60px;
`;
const BlinkSpan = styled.span`
  animation: ${blink} 1.5s infinite;
  animation-fill-mode: forwards;
  font-size: 3.5rem;
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 450px;
  height: auto;
  /* border: 1px solid; */
`;

const LogoImg = styled.img`
  width: 100%;
  /* max-width: 400px; */
  height: auto;
  padding-bottom: 60px;
  filter: drop-shadow(5px 5px 5px #67676761);
`;

const LogoText = styled.div`
  width: 100%;
  border-radius: 1rem;
  font-size: 1rem; //텍스트 크기
  font-weight: bold; //텍스트 굵기
  background: rgba(255, 255, 255, 0.7);
  margin-bottom: 40px;
`;

const GoButton = styled(ButtonPurple)`
  padding: 10px 20px;
  font-size: 1.8rem; //텍스트 크기
  font-weight: bold; //텍스트 굵기
  min-width:300px;
  width: 15%;
  height: 100%;
  opacity: 0.8;
`;

export default TopPort;
