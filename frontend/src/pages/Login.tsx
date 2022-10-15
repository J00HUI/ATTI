import styled from "styled-components";
import LoginComponent from "../components/UserComponent/LoginComponent";
import mainBG from "../assets/images/mainBG.png"
import Logo from "../assets/images/logoCircle.png"
import { palette } from "../styles/palette";

function LoginPage() {
  return (
    <Main>
       <HeaderDiv>로그인</HeaderDiv>
       <Content>
      <WhiteGrid>
        <LeftDiv>
        <LogoImg src={Logo} alt="Logo Cumputer Img" />
        <LogoText>
        🚀 커뮤니티와 화상채팅의 공간 ATTI 🚀
        </LogoText>
        </LeftDiv>
        <Vline/>
        <div>
        <LoginComponent/>
        </div>
      </WhiteGrid>
    </Content>
      
    </Main>
  );
}
const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  -ms-overflow-style:none /* IE and Edge */
  scrollbar-width:none /* Firefox */
  &::-webkit-scrollbar {
    display: none;
    width: 0;
  }
`;

const HeaderDiv = styled.div`
  color: white; //텍스트 색상
  font-size: 2rem; //텍스트 크기
  font-weight: bold; //텍스트 굵기
  text-align: center; //텍스트 정렬 방향
  line-height: 150px; //줄간격
  text-shadow: 2px 2px 4px gray;
  /* margin-bottom: 20px; */
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  width: 100%;
  max-width: 1500px;
  text-align: center;
  ::after {
    width: 100%;
    height: 912px;
    content: "";
    background: url(${mainBG});
    /* background-size: cover; */
    background-size: 100% 912px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0.5;
    filter: blur(1px);
  }
`;

const WhiteGrid = styled.div`
  display: grid;
  grid-template-columns : 1fr 3px 1fr;
  width: 2000px;
  padding: 1rem 0rem;
  height: 650px;
  background: rgba(255, 255, 255, 0.5);
  /* border: 1px solid; */
  border-radius: 30px;
`;

const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 650px;
  position: relative;
  justify-content: center;
`;

const LogoImg = styled.img`
  width: 40%;
  max-width: 400px;
  height: auto;
  padding-bottom: 60px;
  filter: drop-shadow(5px 5px #67676761);
`;

const LogoText = styled.div`
 background:rgba(255, 255, 255, 0.683);
 width: 80%;
 border-radius: 1.2rem;
 font-size: 1.2rem; //텍스트 크기
 font-weight: 550;
 padding: 12px 0px;
`;

const Vline = styled.div`
  border-left: 1px dashed ${palette.gray_3};
  height: 650px;
`;

export default LoginPage;