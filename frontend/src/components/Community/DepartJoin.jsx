
import styled from "styled-components"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import apiAcc, {api} from "../../utils/api"
import { palette } from "../../styles/palette"
import InputWithIcon from "../InputWithLabel"
import { ButtonBlue } from "../ButtonStyled"
import { ButtonPurple } from "../ButtonStyled"
import { departActions } from "../../store/community/Depart"
import { categoryActions } from "../../store/community/Category"
import { reRenderingActions } from "../../store/community/ReRendering"

function DepartJoin({handleModal5}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useSelector(state => state.userInfo)
    const [departJoin, setDepartJoin] = useState([])
    const departList  = useSelector(state => state.depart.departList)
    const currentCider = useSelector(state => state.reRendering.cider) // 리렌더링을 위해 사용
    const updateCider = !currentCider
    const getValue = e => {
        const {value} = e.target;
        setDepartJoin(value)
        console.log(departJoin)
    };

     // 채널 입장: route 이용해서 페이지 이동시켜할듯!
    const departGo = () => {
        api.get(`/depart/${departJoin}/${id}`,
        ).then((res) => {
            console.log("채널 들어가기: ", res.data)
            dispatch(departActions.saveDepart(           // 새로운 채널의 이름,id 저장, 생성자도 저장
                {
                    userId: res.data.categoryList.userId,
                    departName: res.data.categoryList[0].departName,
                    departId: res.data.departId
                }))
            dispatch(categoryActions.saveCategoryList(   // 새로운 채널에 들어있는 기본 카테고리 저장
            {
                categoryList: res.data.categoryList
            }
            ))
            dispatch(reRenderingActions.saveReRendering( // 리렌더링을 하도록 트리거 설정
            {cider: updateCider }
            ))
            const newList = []
            newList.push({
                userId: res.data.categoryList.userId,
                departName: res.data.categoryList[0].departName,
                departId: res.data.departId
            })
            let combineList = []
            if (departList !== null ) {
    
              combineList = [...departList, ...newList];
            } else {
            combineList = [...newList];
            }
            dispatch(departActions.saveDepartList(
                {
                    departList: combineList
                }
                ))
            navigate(`/community/${res.data.categoryList.departId}/${res.data.categoryList.categoryId}`)
        })

    }
    function departJoinFunction() {
        handleModal5()
        departGo()
    }
return(
    <>
        <Title>채널 가입</Title>
        <DepartDiv>
            <span style={{fontSize: "30px", fontWeight: "bold", margin: "0 0 30px 0"}}>초대코드 입력</span>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <InputDiv>
                    <InputWithIcon onChange={getValue}/>
                </InputDiv>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <CustomButtonPurple onClick={() => {departJoinFunction()}}>가입하기</CustomButtonPurple>
            </div>
        </DepartDiv>
            <CustomButtonBlue onClick={handleModal5}>닫기</CustomButtonBlue>
    </>
)
}


const Title = styled.div`
    background: ${palette.main_grBlue};
    color: transparent;
    -webkit-background-clip: text;
    font-size: 40px; 
    font-weight: bold;
    text-align: center;
    margin: 0 0 40px 0;
`

const DepartDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

`

const DepartSearchDiv = styled.div`
    width: 34vw;
    height: 25vh;
    border: 2px solid;
    margin: 0 0 20px 0;

`

const InputDiv = styled.div`
    width: 27vw;
    height: 10vh;
`
const CustomButtonPurple = styled(ButtonPurple)`
    width: 5vw;
    height: 4vh;
`
const CustomButtonBlue = styled(ButtonBlue)`
    width: 8vw;
    height: 5vh;
`

export default DepartJoin