import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import apiAcc, {api} from "../../utils/api"
import { reRenderingActions } from '../../store/community/ReRendering';
import { departActions } from '../../store/community/Depart';
import { categoryActions } from '../../store/community/Category';
import DepartCreate from './DepartCreate';
import DepartJoin from './DepartJoin';
import Modal from '../Modal';
import { palette } from '../../styles/palette';

import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';


function DepartList(){
  
  const [isOpenModal4, setOpenModal4] = useState(false);
  const departList  = useSelector(state => state.depart.departList)
  const { id } = useSelector(state => state.userInfo)
  const dispatch = useDispatch()
  const newDepartId = useSelector(state => state.depart.departId)
  const newDepartName = useSelector(state => state.depart.departName)
  const [newDepartCreate, setNewDepartCreate] = useState(false);
  const [departs, setDeparts] = useState([])

  useEffect(() => {
    if (departList !== null && departList !== undefined && departList.length > 0) {
      
      setDeparts(departList);
    }
  },[departList])

    const handleClose = () => {
      setAnchorEl(null);
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    }
    const currentCider = useSelector(state => state.reRendering.cider)
    const updateCider = !currentCider

    function departFunction(i){
      handleClose()
      dispatch(departActions.saveDepart(
        {departId: departList[i].departId,
        userId: id,
        departName: departList[i].departName,
       }
       
       ))
       api.get(`/depart/getCategoryList/${departList[i].departId}`
       ).then((res) => {
        console.log("어떻게 나오나?", res.data);
        dispatch(categoryActions.saveCategoryList( // 카테고리 선택
          {
            categoryList: res.data
          }
        ))
        dispatch(reRenderingActions.saveReRendering( // 강제로 업데이트
          {cider: updateCider }
      ))
       })
    }
    const departName = useSelector(state => state.depart.departName)
    const departId = useSelector(state => state.depart.departId)
    const findId = (e) => e.departId === departId

    const onClickToggleModal4 = useCallback(() => {
      setOpenModal4(!isOpenModal4);
      }, [isOpenModal4]);

    const handleModal4 = () => {
      setOpenModal4((prev) => {
        return !prev}
      );
    }
    function departCreateFunction(){
      handleClose()
      onClickToggleModal4()
    }

    const [isOpenModal5, setOpenModal5] = useState(false);
    const onClickToggleModal5 = useCallback(() => {
      setOpenModal5(!isOpenModal5);
      }, [isOpenModal5]);

    const handleModal5 = () => {
      setOpenModal5((prev) => {
        return !prev}
      );
    }
    function departJoinFunction(){
      handleClose()
      onClickToggleModal5()
    }
    

    return (
      <>
      <DepartContainer>
         <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <span style={{ borderRadius: "10px", width: "120px", height: "40px", fontSize: "20px", color: "black", fontWeight: "bolder"}}>
          채널선택
          <ExpandMoreIcon/>
        </span>
        </Button>
        <Menu
          id="fade-menu"
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={() => {departCreateFunction()}}> <AddBoxIcon/>&nbsp; 채널생성</MenuItem>
          <MenuItem onClick={() => {departJoinFunction()}}><GroupAddIcon/>&nbsp; 채널가입</MenuItem>
         
          {departs !== null && departs.length > 0 && Object.keys(departs).map((e,i) => (
            <div>
            <MenuItem onClick={() => {departFunction(i)}} key={i}>{departs[e].departName}</MenuItem> </div>
          ))}
        </Menu>
        <div style={{display: 'flex', flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
        <Avatar sx={{ width: 42, height: 42 }} style={{margin: "11px 10px 0 11px"}}>{departName.substring(0,1)}</Avatar>
          {departName}
        </div>
      </DepartContainer>
      {isOpenModal4 && (
        <Modal
          onClickToggleModal={onClickToggleModal4}
          width="800px"
          height="400px"
        >
            <DepartCreate handleModal4={handleModal4} setNewDepartCreate={setNewDepartCreate} newDepartCreate={newDepartCreate} />
        </Modal>
      )}
       {isOpenModal5 && (
        <Modal
          onClickToggleModal={onClickToggleModal5}
          width="800px"
          height="400px"
        >
          <DepartJoin handleModal5={handleModal5} />
        </Modal>
      )}
      </>
    )
};

// function Depart(){
//     const handleClick = (event) => {
//       setAnchorEl(event.currentTarget);
//     };
//     return(
//         <CategoryContainer>
//             <Button
//         id="fade-button"
//         aria-controls={open ? 'fade-menu' : undefined}
//         aria-haspopup="true"
//         aria-expanded={open ? 'true' : undefined}
//         onClick={handleClick}
//       >
//         채널
//       </Button>
//            {DepartList(dummyDepart)}
//         </CategoryContainer>
        
//     );
// }

const DepartContainer = styled.div`
height: 100px;
/* border: solid;
border-radius: 5px; */
position: absolute;
top: 60px;
left: 10px;
margin: 0;
font-size: 20px;
font-weight: bold;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;
export default DepartList