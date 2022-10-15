import styled from "styled-components";
import LogoCircle from "../../assets/images/logoCircle.png";
import AttiQR from "../../assets/images/AttiAsk.png";
import { Link } from "@mui/material";
import { palette } from "../../styles/palette";

function AttiAsk() {
  return (
    <>
      <Main>
        <Content>
          <Grid>
            <LogoImg src={LogoCircle} alt="Logo Circle Img" />
            <LogoImg src={AttiQR} alt="Logo Circle Img" />
          </Grid>
          <TextSpan>
          {"<"} 오픈채팅방으로 문의하기 {">"} <br/>
          <Link underline="none" href="https://open.kakao.com/me/HelloAtti">
            https://open.kakao.com/me/HelloAtti
          </Link> 
          </TextSpan>
        </Content>
      </Main>
    </>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`;

const Content = styled.div`
  width: 800px;
  height: 470px;
  border: 2px rgba(0, 0, 0, 0.2) solid;
  box-shadow: 10px 10px 10px 2px ${palette.gray_2};
  border-radius: 50px;
  padding: 15px 40px;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  align-items: stretch;
`;

const TextSpan = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-top: 30px;
`;

const LogoImg = styled.img`
  width: 80%;
  padding: 1rem 0rem;
  margin-left: 40px;
`;

export default AttiAsk;
