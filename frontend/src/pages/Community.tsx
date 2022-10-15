import React, { useState, useCallback, PropsWithChildren,useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import DepartList from "../components/Community/Depart";
import NormalPostFrame from "../components/Community/NormalPostFrame";
import Category from "../components/Community/Category";
import Calendar from "../components/Community/Calendar";
import Class from "../components/Community/Class";


import CommunityBg from "../assets/images/communityBG.png";
import adminBg from "../assets/images/adminBG.png"
import { categoryState } from "../store/community/Category";
import { departState } from "../store/community/Depart";
import AdminPageWrapper from "../components/Community/adminpage/AdminPageWrapper";
import { RootState } from "../store";
import SchedulePageWrapper from "../components/Community/schedule/SchedulePageWrapper";

function Community() {
  // const departName = useSelector(categoryState => categoryState.depart.departName)
  const categoryList = useSelector((state: RootState) => state.category.categoryList);
  const categoryName = useSelector((state: RootState) => state.category.categoryName);
  const categoryUserId = useSelector((state: RootState) => state.category.userId);
  const changeCss = useSelector((state:RootState) => state.category.changeCss)
  const changeCss2 = useSelector((state: RootState) => state.category.changeCss2)
  const {id} = useSelector((state: RootState) => state.userInfo)
  const categoryType = useSelector((state: RootState) => state.category.cType)
  const [changeState, setChangeState] = useState(false);
  useEffect(() => {
    console.log("커뮤니티의 찬기를 바꿉니다.")
    setChangeState((prev) => {
      return !prev;
    })
  },[categoryList])

  const ScheduleContainer = styled.div`
  width: 84vw;
  height: 863px;
  margin: 25px 60px 25px 0;
  border-radius: 20px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`
  console.log("changeCss,,,", changeCss)
  console.log("changeCss222222,,,", changeCss2)
  return (
    <CommunityDiv>
      
      {(changeCss === 9999 && changeCss2 === 100) ? (<Main2> 
          <div>
            <DepartList />
            <Category changeState={changeState } />
          </div>
          {(categoryType === "TIMETABLE") ? (
            <ScheduleContainer>
              <SchedulePageWrapper/>
            </ScheduleContainer>
          ): (
            <NormalPostFrame changeState={changeState} />
          )
        }
        </Main2>)
      :
      (<Main> 
        <div>
          <DepartList />
          <Category changeState={changeState } />
        </div>
        {(categoryType === "TIMETABLE") ? (
          <ScheduleContainer>
            <SchedulePageWrapper/>
          </ScheduleContainer>
        ): (
          <NormalPostFrame changeState={changeState} />
        )
      }
      </Main>)}
      
    </CommunityDiv>
  );
}
const CommunityDiv = styled.div`
  overflow: hidden;
`;

const Main = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin: 0;
  ::after{
    width: 100%;
    height: 968px;
    content: "";
    background: url(${CommunityBg}) no-repeat;
    background-size: 100% 968px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -2;
  }
  /* background-size: cover !important;
  background-position: center !important; */
  z-index: -2;
`

const Main2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin: 0;
  ::after{
    width: 100%;
    height: 968px;
    content: "";
    /* background: red; */
    background: url(${adminBg}) no-repeat;
    background-size: 100% 968px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -2;
    opacity: 0.9;
    filter: blur(1px);
  }
  /* background-size: cover !important;
  background-position: center !important; */
  z-index: -2;
`;


const FlexDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default Community;
