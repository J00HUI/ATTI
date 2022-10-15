import styled from "styled-components";
import { palette } from "../../styles/palette";

function Footer() {
  return (
    <Main>
      <FinalContent>
        <Grid>
          <Text>
            {/* <span> REMO </span>
            <span>SSAFY 7기 </span>
            <span>SiWon Park | HyeonJeong Lee</span>© 2022 All Rights Reserved. */}
    <p>
           {"제작)"} SSAFY 7기 대전 B107 : 김연수 | 박범수 | 이주희 | 이현정 | 이현태 | 정 진
          <br/>{"문의)"} 카카오톡 프로필 검색 : ATTI , https://open.kakao.com/me/HelloAtti
          <br/>COPYRIGHT &copy; 2022 B107, ALL Rights Reserved
          </p>
          </Text>
        </Grid>
      </FinalContent>
    </Main>
  );
}

const Main = styled.footer`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100px;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  background: ${palette.gray_1};
  border-top: 1px solid ${palette.gray_1};

  ::after {
    width: 100%;
    opacity: 0.5%;
  }
`;
const FinalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  /* border: 1px solid; */
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  place-items: center;
  /* border: 1px solid; */
  column-gap: 100px;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
  justify-content: center;
`;

export default Footer;
