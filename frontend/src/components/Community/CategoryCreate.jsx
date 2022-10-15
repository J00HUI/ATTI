import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { palette } from "../../styles/palette"
import styled from "styled-components"
import { ButtonBlue } from "../ButtonStyled"
import { ButtonPurple } from "../ButtonStyled"

import { reRenderingActions } from "../../store/community/ReRendering"
import { categoryActions } from "../../store/community/Category"
import InputWithIcon from "../InputWithLabel"
import apiAcc, { api } from "../../utils/api"


function CategoryCreate({handleModal6}){

    const [newCategory, setNewCategory] = useState([])
    const dispatch = useDispatch()
    const getValue = e => {
        const {value} = e.target;
        setNewCategory(value)
    };

    const { category } = useSelector((store) => store);
    const [cType, setCType] = useState([]);
    const [categoryAnoInfo, setCategoryAnoInfo] = useState([]);
    const [categoryComInfo, setCategoryComInfo] = useState([]);
    const [categoryComAnoInfo, setCategoryComAnoInfo] = useState([]);
    console.log("11111111111111111", categoryAnoInfo)
    console.log("22222222222222222,", categoryComInfo)
    console.log("33333333333333333", categoryComAnoInfo)
    const { id } = useSelector(state => state.userInfo);
    const departId = useSelector(state => state.depart.departId);
    
    const [changeCss1, setChangeCss1] = useState(0);
    const [changeCss2, setChangeCss2] = useState(0);
    const [changeCss3, setChangeCss3] = useState(0);
    const [changeCss4, setChangeCss4] = useState(0);
    function cTypeFunction (i, j){
        setChangeCss1(i)
        setCType(j)
    }
    function categoryAnoInfoFunction(i, j){
        setChangeCss2(i)
        setCategoryAnoInfo(j)
    }
    function categoryComInfoFunction(i, j){
        setChangeCss3(i)
        setCategoryComInfo(j)
    }
    function categoryComAnoInfoFunction(i, j){
        setChangeCss4(i)
        setCategoryComAnoInfo(j)
    }
    
    const currentCider = useSelector(state => state.reRendering.cider)
    const updateCider = !currentCider
    const currentCategoryList = useSelector(state => state.category.categoryList)
    const changeCss = useSelector(state => state.category.changeCss)
    // 카테고리 생성: 로그인 쪽에서 하는 axios 재랜더링 시켜야
    const categoryCreateFunction = () => {
        api.post(`/depart/category/create`,
        {
            categoryAnoInfo: categoryAnoInfo,
            categoryComAnoInfo: categoryComAnoInfo,
            categoryComInfo: categoryComInfo,
            categoryName: newCategory,
            type: cType,
            departId: departId,
            userId: id
            }).then((res) => {
            const createCategory = {
                    categoryId : res.data,
                    categoryAnoInfo: categoryAnoInfo,
                    categoryComAnoInfo: categoryComAnoInfo,
                    categoryComInfo: categoryComInfo,
                    categoryName: newCategory,
                    type: cType,
                    departId: departId,
                    userId: id
                }
            console.log("카테고리 생성: ", res.data)
            // dispatch(reRenderingActions.saveReRendering(
            //     {cider: updateCider }
            // ))
            dispatch(categoryActions.saveChangeCss(
                {
                    changeCss: currentCategoryList.length + 1
                }
            ))
            dispatch(categoryActions.saveCategory({
                    categoryId : res.data,
                    categoryAnoInfo: categoryAnoInfo,
                    categoryComAnoInfo: categoryComAnoInfo,
                    categoryComInfo: categoryComInfo,
                    categoryName: newCategory,
                    type: cType,
                    departId: departId,
                    userId: id
                }))


                let tempCategoryList = [...category.categoryList];
                tempCategoryList.push(createCategory);
                console.log("여기서 테스트합니다. :" , tempCategoryList);
                dispatch(categoryActions.saveCategoryList({
                    categoryList: tempCategoryList,
                }))
        })
    }
    
    function categoryFunction() {
        categoryCreateFunction()
        handleModal6()
    }
    // useEffect(() => {
      
    // },
    // [currentCider]
    // )

    return(
        <div style={{width: "900px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>  
            <div style={{display: "flex", justifyContent: "center", alignItems:"center"}}>
                <Title>
                    카테고리 생성
                </Title> 
            </div>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", margin: "30px 0 0 40px"}}>
                <div style={{display: "flex", flexDirection: "column", alignItems:"flex-start"}}>
                    <Question>1. 카테고리 이름은 무엇인가요?</Question> 
                    <span style={{fontSize: "15px", color: "gray"}}>다른 사용자에게 보여질 카테고리의 이름을 지어주세요!</span>
                    <InputDiv>
                        <InputWithIcon borderRadius="20px" onChange={getValue} placeholder="ex) "/>
                    </InputDiv>
                </div>
                <div style={{display: "flex", flexDirection: "column", alignItems:"flex-start"}}>
                    <Question>2. 카테고리의 형식을 1개 선택해 주세요.</Question> 
                    <span style={{fontSize: "15px", color: "gray"}}>선택한 카테고리 형식을 배경으로 제작됩니다.</span>
                    <div style={{display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"flex-start"}}>
                        <CustomDiv>
                            {changeCss1 === 1? 
                            <ClickButton onClick={() => {cTypeFunction(0, "FREE")}} name="FREE">자유게시판</ClickButton>:
                            <NoClickButton onClick={() => {cTypeFunction(1, "FREE")}} name="FREE">자유게시판</NoClickButton>
                            }
                            {changeCss1 === 2? 
                            <ClickButton onClick={() => {cTypeFunction(0, "TIMETABLE")}} name="TIMETABLE">시간표(수업 미팅실)</ClickButton>:
                            <NoClickButton onClick={() => {cTypeFunction(2, "TIMETABLE")}} name="TIMETABLE">시간표(수업 미팅실)</NoClickButton>
                            }
                        </CustomDiv>
                        <CustomDiv>
                            {changeCss1 === 3?
                            <ClickButton onClick={() => {cTypeFunction(0, "NOTICE")}} name="NOTICE">공지사항(관리자만 작성이 가능)</ClickButton>:
                            <NoClickButton onClick={() => {cTypeFunction(3, "NOTICE")}} name="NOTICE">공지사항(관리자만 작성이 가능)</NoClickButton>
                            }
                            {changeCss1 === 4?
                            <ClickButton onClick={() => {cTypeFunction(0, "DATA")}} name="DATA">자료실(첨부파일 첨부 가능)</ClickButton>:
                            <NoClickButton onClick={() => {cTypeFunction(4, "DATA")}} name="DATA">자료실(첨부파일 첨부 가능)</NoClickButton>
                            }
                        </CustomDiv>
                    </div>
                </div>
                <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
                    <Question>3. 세부 설정을 체크해주세요!</Question> 
                    <div style={{display: "flex", flexDirection: "column", margin: "0 0 0 10px"}}>
                        <SettingDiv>
                            <CustomSpan>게시글 작성 시 익명을 허용하시겠습니까?</CustomSpan>
                            <div>
                                {changeCss2 === 5?
                                <ClickButtonCheck onClick={() => {categoryAnoInfoFunction(0, true)}}>Yes</ClickButtonCheck>:
                                <NoClickButtonCheck onClick={() => {categoryAnoInfoFunction(5, true)}}>Yes</NoClickButtonCheck>
                                }
                                {changeCss2 === 6?
                                <ClickButtonCheck onClick={() => {categoryAnoInfoFunction(0, false)}}>No</ClickButtonCheck>:
                                <NoClickButtonCheck onClick={() => {categoryAnoInfoFunction(6, false)}}>No</NoClickButtonCheck>
                                }
                            </div>
                        </SettingDiv>
                        <SettingDiv>
                            <CustomSpan>게시글에 대한 댓글 작성을 허용하시겠습니까?</CustomSpan>
                            <div>
                                {changeCss3 === 7?
                                <ClickButtonCheck onClick={() => {categoryComInfoFunction(0, false)}}>Yes</ClickButtonCheck>:
                                <NoClickButtonCheck onClick={() => {categoryComInfoFunction(7, false)}}>Yes</NoClickButtonCheck>
                                }
                                {changeCss3 === 8? 
                                <ClickButtonCheck onClick={() => {categoryComInfoFunction(0, true)}}>No</ClickButtonCheck>:
                                <NoClickButtonCheck onClick={() => {categoryComInfoFunction(8, true)}}>No</NoClickButtonCheck>
                                }
                            </div>
                        </SettingDiv>
                        <SettingDiv>
                            <CustomSpan>게시글에 대한 댓글 작성 시 익명을 허용하시겠습니까?</CustomSpan>
                            <div>
                                {changeCss4 === 9?
                                <ClickButtonCheck onClick={() => {categoryComAnoInfoFunction(0, true)}}>Yes</ClickButtonCheck>:
                                <NoClickButtonCheck onClick={() => {categoryComAnoInfoFunction(9, true)}}>Yes</NoClickButtonCheck>
                                }
                                {changeCss4 === 10?
                                <ClickButtonCheck onClick={() => {categoryComAnoInfoFunction(0, false)}}>No</ClickButtonCheck>:
                                <NoClickButtonCheck onClick={() => {categoryComAnoInfoFunction(10, false)}}>No</NoClickButtonCheck>
                                }
                            </div>
                        </SettingDiv>
                    </div>
                </div>
            </div>
                <CustomButtonBlue onClick={() => {categoryFunction()}}>
                    <span style={{fontSize: "20px"}}>작성</span></CustomButtonBlue>
        </div>
    )
}

const Title = styled.span`
    background: ${palette.main_grBlue};
    color: transparent;
    -webkit-background-clip: text;
    font-size: 40px; 
    font-weight: bold;
    text-align: center;
`
const Question = styled.span`
    font-size: 30px;
    font-weight: bold;
    margin: 10px 10px;
`

const InputDiv = styled.div`
    width: 35vw;
    height: 4vh;
    margin: 20px 0;
`
const CustomDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: space-between;
    width: 500px;
`

const NoClickButton = styled.button`
    width: 240px;
    height: 50px;
    margin: 10px;
    font-size: 14px;
    font-weight: bold;
    background: white;
    border: 1px solid;
    border-radius: 20px;
    &:hover{  
  cursor: pointer
 }
`

const ClickButton = styled.button`
    width: 240px;
    height: 50px;
    margin: 10px;
    font-size: 14px;
    font-weight: bold;
    background: ${palette.pink_1};
    border: 1px solid;
    border-radius: 20px;
    &:hover{  
  cursor: pointer
 }
`

const CustomSpan = styled.span`
    font-size: 20px;
    margin: 10px 0;
`
const SettingDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 750px;
`
const ClickButtonCheck = styled(ButtonPurple)`
    width: 50px;
    height: 30px;
    margin: 7px;
`

const NoClickButtonCheck = styled.button`
    width: 50px;
    height: 30px;
    color: black;
    border-radius: 1rem;
    border: 0px solid;
    padding: 0.3rem 1rem;
    font-size: 0.8rem;
    font-weight: bold;
    cursor: pointer;
    margin: 7px;

`

const CustomButtonBlue = styled(ButtonBlue)`
    width: 120px;
    height: 50px;
    margin: 40px 0 0 0;
    

`
export default CategoryCreate