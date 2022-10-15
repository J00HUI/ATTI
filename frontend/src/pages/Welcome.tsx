import styled from 'styled-components';
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import apiAcc, {api} from '../utils/api';
import CommunityBg from '../assets/images/communityBG.png'
import DepartCreate from '../components/Community/DepartCreate';
import Modal from '../components/Modal';
import { ButtonBlue } from '../components/ButtonStyled';
import { palette } from '../styles/palette';
import { useNavigate } from 'react-router-dom';
import { departActions } from '../store/community/Depart';
import { categoryActions } from '../store/community/Category';
import { reRenderingActions } from '../store/community/ReRendering';


function Welcome(){
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const departList  = useSelector((state: RootState) => state.depart.departList)
  const currentCider = useSelector((state: RootState) => state.reRendering.cider) // 리렌더링을 위해 사용
  const updateCider = !currentCider
  const [isOpenModal4, setOpenModal4] = useState(false);
  const [newDepartCreate, setNewDepartCreate] = useState(false);
    const onClickToggleModal4 = useCallback(() => {
      setOpenModal4(!isOpenModal4);
      }, [isOpenModal4]);

    const handleModal4 = () => {
      setOpenModal4((prev) => {
        return !prev}
      );
    }
    const [newDepart, setNewDepart] = useState([])
    const getValue = (e: any) => {
      const {value} = e.target;
      setNewDepart(value)
  };

     // 채널 입장: route 이용해서 페이지 이동시켜할듯!
    const {id} = useSelector((state: RootState) => state.userInfo)
    const departNew = () => {
        api.get(`/depart/${newDepart}/${id}`,
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
    
  return(
    <>
    <WelcomeDiv>
      <Main>
        <Container>     
          <Title>
            <p>아띠(ATTI) 에 오신 것을 환영합니다!</p>
          </Title>
          <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            <Title>
              <p>채널을 생성하여 다양한 기능을 누려보세요!</p>
            </Title>
            <CustomButtonBlue onClick={handleModal4}> 채널 생성</CustomButtonBlue>
          </div>
          <div>
            <Title>
              <p>혹은 참여 코드를 입력하여 채널에 입장하세요!</p>
            </Title>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
              <CustomInputWithIcon onChange={getValue} />
              
              <CustomButtonBlue onClick={() => {departNew()}}> 채널 입장</CustomButtonBlue>

            </div>

          </div>

        </Container>
  
      </Main>

    </WelcomeDiv>


      {isOpenModal4 && (
        <Modal
          onClickToggleModal={onClickToggleModal4}
          width="800px"
          height="400px"
        >
          <DepartCreate  handleModal4={handleModal4} setNewDepartCreate={setNewDepartCreate} newDepartCreate={newDepartCreate} />
        </Modal>
      )}

    </>
  );
}

const WelcomeDiv = styled.div`
  overflow: hidden;
`;

const Container = styled.div`
  overflow: hidden;
  width: 80vw;
  height: 879px;
  border-radius: 20px;
  background-color: white;
  margin: 20px 50px 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: flex-end;
  margin: 0;
  background: url('${CommunityBg}') no-repeat;
  background-size: cover !important; 
  background-position: center !important;
  `;

const Title = styled.div`
    font-size: 40px; 
    font-weight: bold;
    margin: 0 0 0 50px;
`;
const CustomButtonBlue = styled(ButtonBlue)`
    width: 220px;
    height: 60px;
    margin: 0 250px 0 0;
    font-size: 25px;
`;
const CustomInputWithIcon = styled.input`
  width: 800px;
  height: 100px;
  border: 2px solid ${palette.blue_3};
  border-radius: 20px;
  margin: 0 0 0 50px;
  font-size: 45px;
  font-weight: bold;
  outline: none;
`;
  export default Welcome;
  