import { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import LowPart from "../components/HomeComponent/LowerPart";
import TopPart from "../components/HomeComponent/TopPart";
import { api } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginActions } from "../store/LoginStore";
import { departActions } from "../store/community/Depart";
import { categoryActions } from "../store/community/Category";
import { noticeActions } from "../store/community/Notice";
import MouseOutlinedIcon from "@mui/icons-material/MouseOutlined";
import useMoveScrool from "../components/HomeComponent/UseMoveScrool";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import Footer from "../components/HomeComponent/Footer";

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    //console.log(token);
    {
      userId &&
        api
          .post("/auth/auto", {
            userId: userId,
          })
          .then(async function (response) {
            console.log("response:", response.data);
            if (response.status === 200) {
              // console.log("response:", response.data);
              dispatch(
                loginActions.login({
                  id: response.data.userId,
                  userName: response.data.userName,
                  accessToken: response.data.accessToken,
                  admin: response.data.admin,
                  // categoryList: response.data.categoryList,
                  // departList: response.data.departList,
                  // postList: response.data.postList,
                })
              );
              dispatch(departActions.saveDepartList(
                {
                  departList: response.data.departList
                }
              ))
             
            }
            dispatch( // 로그인 후 첫번째 채널 공시사항 게시글 저장하기
            noticeActions.savePostList({
              postList: response.data.postList
            })
          )
          dispatch( // 첫번째 채널의 카테고리 리스트들을 저장하는 디스패치
            categoryActions.saveCategoryList({
              categoryList: response.data.categoryList
            })
          )
          dispatch(departActions.saveDepartList(
            {
              departList: response.data.departList
            }
          ))
          if(response.data.departList==null) navigate("/welcome");     
          else{
            dispatch(departActions.initialSaveDepart({
              departId: response.data.departList[0].departId,
              departName: response.data.departList[0].departName
          }))
           navigate(`/community/${response.data.departList[0].departId}/${response.data.categoryList[0].categoryId}`);
        }

          })
          .catch(function (error) {
            console.log("Error", error);
          });
    }
  }, []);


  const {element, onMoveToElement} = useMoveScrool();

  return (
      <Main> 
        <TopPart />
        <BoxStyle onClick={onMoveToElement}>
          {/* <MouseOutlinedIcon color="action" sx={{ fontSize: 45}} style={{transform: `rotate(180deg)`, cursor:"pointer"}}/> */}
          <span>
scroll!</span>
          <KeyboardDoubleArrowDownIcon color="action" sx={{ fontSize: 45}} style={{cursor:"pointer"}}/>
        </BoxStyle>
        <LowEmelent  ref={element}>
        <LowPart/>
        </LowEmelent>
        <Footer/>
      </Main>
  );
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* min-height: 100vh; */
  position: relative;
  -ms-overflow-style:none /* IE and Edge */
  scrollbar-width:none /* Firefox */
  &::-webkit-scrollbar {
    display: none;
    width: 0;
  }
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
  border-radius: 100%;
  transform: scaleY(-1);
  animation: ${floating} 2s ease infinite;
  position: absolute;
  top: 800px;
  z-index: 5;
`;

const LowEmelent = styled.div`
 width: 100%;
`;

export default HomePage;
