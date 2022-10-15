import React, { PropsWithChildren, useState, useCallback , Component, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import axios from 'axios';
import moment from "moment";
import { api } from "../../utils/api";
import { BACKEND_URL } from "../../constant";
import PostUpdate  from "./PostUpdate";
import PostDetail from "./PostDetail";
import PostEditor from "./PostEditor";
import DepartCreate from "./DepartCreate";
import DepartJoin from "./DepartJoin";
import Modal from "../Modal";
import SearchBar from "./SearchBar";
import { ButtonBlue } from "../ButtonStyled";
import { ButtonPurple } from "../ButtonStyled";
import { palette } from "../../styles/palette";
import Pagination from "./pagenation";
import MyPageComponent from "../MyPage/MyPageComponent";
import AdminPageWrapper from "./adminpage/AdminPageWrapper";

import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from "@mui/icons-material/Favorite";
import CampaignIcon from '@mui/icons-material/Campaign';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { reRenderingActions } from "../../store/community/ReRendering";
import { CountActions } from "../../store/community/Count";

const Rendering = ({ post, handleModal2, limit, length, page, getPostId}) => {
  const dispatch = useDispatch()
  const offset = (page - 1) * limit;
  const postStyle = {
    borderRadius: "10px",
    backgroundColor: palette.white,
    width: "90%",
    height: "110px",
    margin: "30px 0 0 80px",
    // border: "1px solid",
    boxShadow: `1px 1px 2px 2px gray` 
  };
 function TwoFunctions(e){
  handleModal2()
  getPostId(e.postId)
  dispatch(CountActions.savePostLikeCount(
    {
      postLikeCount: e.likeCount
    }
  ))
  dispatch(CountActions.saveMyLike(
    {
      myLike: e.myLike
    }
  ))
  dispatch(CountActions.saveCommentCount(
    {
      commentCount: e.commentCount
    }
  ))
 }

//  function timeForToday(value) {
//   const today = new Date();
//   const timeValue = new Date(value);

//   const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
//   if (betweenTime < 1) return '방금 전';
//   if (betweenTime < 60) {
//       return `${betweenTime}분 전`;
//   }

//   const betweenTimeHour = Math.floor(betweenTime / 60);
//   if (betweenTimeHour < 24) {
//       return `${betweenTimeHour}시간 전`;
//   }

//   const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
//   if (betweenTimeDay < 365) {
//       return `${betweenTimeDay}일 전`;
//   }

//   return `${Math.floor(betweenTimeDay / 365)}년 전`;
// }
  const categoryAnoInfo = useSelector(state => state.category.categoryAnoInfo)
  console.log("카테고리 익명여부", categoryAnoInfo)
  const postAnoInfo = useSelector(state => state.post.postAnoInfo)

  if(post === null || post.length===0){
    return (
      <div></div>
    )
  }
  else{
    return (
      <>
        
        {post.slice(offset, offset + limit).map((e, i) => (
        <IndividualPost key={i}>
          {/* {console.log("e의 결과는? ", e)}
          {console.log('-----')}
          {console.log(e.postId)} */}
          {/* {console.log('postId :',  postId)} */}
          <div style={postStyle} onClick={() => {TwoFunctions(e)}}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  padding: "10px 20px "
                }}
              >
                <div style={{ fontSize: "20px", width: "900px", fontWeight: "bold", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                  {e.postTitle}   
                </div> 
                <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                  <UserIdDiv>
                    {  postAnoInfo === true  ?  (<>익명</>): (<>{e.userName}({e.userId})</>)}
                  </UserIdDiv>
                  &nbsp; &nbsp; &nbsp;
                  <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    {moment(e.postRegDate).format("YYYY-MM-DD HH:mm")}
                  </div>

                  
                </div>
              </div>
              <hr style={{width: "95%"}} />
  
              <div style={{display: "flex",justifyContent: "space-between", alignItems: "center", padding: "0px 30px", margin: "-5px 0px" }}>
                <div style={{width: "1000px", height: "50px", fontSize: "17px", fontWeight: "bold", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                  {ReactHtmlParser(e.postContent)}   
                </div>
                <div>
                  {e.myLike === true? (
                     <Favorite/>
                  ):(
                    <FavoriteBorder/>
                  )}
                {e.likeCount}
                &nbsp; &nbsp; &nbsp;
                <ChatBubbleOutlineIcon/> {e.commentCount}
                </div>
              
              </div>
              
            </div>
            
        </IndividualPost>
        ))}
      </>
      )

   }
  };

function PostList({handleModal2, limit, page, getLength,  length, getPostId}) {
  
  const categoryId = useSelector(state => state.category.categoryId)
  // console.log('카테고리, 너의 아이디는? ' , categoryId)
  const departId = useSelector(state => state.depart.departId)
  // console.log('채널, 너의 아이디는? ' , departId)
  const { id } = useSelector(state => state.userInfo)
  
  const currentSetPost = useSelector(state => state.reRendering.setPost)
  const updateSetPost = !currentSetPost
  const postList = useSelector(state => state.notice.postList )
  const [post, setPost] = useState([])
  
  async function getPosts(){
    api.get(`/depart/${departId}/category/${categoryId}/user/${id}`
    ).then((res) => {
      console.log("글 랜더링 결과: ", res)
      setPost(res.data)
      getLength(res.data.length)
    })
  }
  useEffect(() => {
    setPost(postList)
  }, []);
  
  // console.log("노말 포스트 프레임입니다. ", currentSetPost);
  useEffect(() => {
    // console.log('확인중입니다')
    getPosts();
  },[currentSetPost, categoryId, departId]);
  
  return (
    <>
      <Rendering post={post} handleModal2={handleModal2} length={length} limit={limit} page={page} getPostId={getPostId} />
    </>
  );
  
};


function NormalPostFrame({changeState}) {

  const { id } = useSelector(state => state.userInfo)
  const dispatch = useDispatch()
  const [isOpenModal1, setOpenModal1] = useState(false);
  const onClickToggleModal1 = useCallback(() => {
    setOpenModal1(!isOpenModal1);
  }, [isOpenModal1]);
  const handleModal1 = () => {
    setOpenModal1((prev) => {
      return !prev
    }
    );
  }
  const [isOpenModal2, setOpenModal2] = useState(false);
  const onClickToggleModal2 = useCallback(() => {
    setOpenModal2(!isOpenModal2);
    }, [isOpenModal2]);
    
  const handleModal2 = () => {
    setOpenModal2((prev) => {
      return !prev
    }
    );
  }
  const [isOpenModal3, setOpenModal3] = useState(false);
  const onClickToggleModal3 = useCallback(() => {
    setOpenModal3(!isOpenModal3);
  }, [isOpenModal3]);
  const handleModal3 = () => {
    setOpenModal3((prev) => {
      return !prev
    }
    );
  }

  const [length,setLength] = useState([])
  const getLength = (length) => {
    setLength(length)
  }
  const [postId, setPostId] = useState(null)
  const getPostId = (postId) => {
    setPostId(postId)
  }

   // 글 좋아요 부분
   const postLike = () => {
       console.log(postId)
       api.get(`/post/likeBtn/${postId}/${id}`
       )
       .then((res) => {
           dispatch(reRenderingActions.saveSetPost(
            { 
              setPost: updateSetPost
            }
          ))
       });
   }

   const currentSetPost = useSelector(state => state.reRendering.setPost)

  // 글 전체 삭제 부분
  const updateSetPost = !currentSetPost
  const categoryId = useSelector(state => state.category.categoryId)
  const categoryUserId = useSelector(state => state.category.userId)
  const categoryCType = useSelector(state => state.category.cType)
  console.log("타입타입", categoryCType)
  const allDelete = () => {
    api.delete(`/post/delete/category/${categoryId}`)
    .then((res) => {  
      dispatch(reRenderingActions.saveSetPost(
        { 
          setPost: updateSetPost
        }
      ))
    })
  }
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  
  const [singlePost, setSinglePost] = useState([])


  const myPage = useSelector(state => state.reRendering.setMyPage)
  const adminPage = useSelector(state => state.reRendering.setAdminPage)
  const classPage = useSelector(state => state.reRendering.setClass)
  const categoryName = useSelector(state => state.category.categoryName)
  const buttonList = [<CampaignIcon/>, <ContactSupportOutlinedIcon/>,<FolderOutlinedIcon/>,<ArticleOutlinedIcon/>, <VideocamOutlinedIcon/>, <span/>, <span/>, <span/>, <span/>, <span/>, <span/> ]
  function selectTitle(){
    if(categoryName === "공지사항"){
      return <Title><CampaignIcon/>&nbsp; {categoryName}</Title>
    }
    else if(categoryName === "질문") {
      return <Title><ContactSupportOutlinedIcon/>&nbsp; {categoryName}</Title>
    }
    else if(categoryName === "자료실"){
      return <Title><FolderOutlinedIcon/>&nbsp; {categoryName}</Title>
    }
    else if(categoryName === "자유게시판"){
      return <Title><ArticleOutlinedIcon/>&nbsp; {categoryName}</Title>
    }
    else if(categoryName === "수업실"){
      return <Title><VideocamOutlinedIcon/>&nbsp; {categoryName}</Title>
    }
    else{
      return <Title>{categoryName}</Title>
    }
  }
  function selectButton(){
    if(categoryUserId !== id && categoryCType !== "NOTICE"){
      return <WriteButton onClick={onClickToggleModal1}>글쓰기</WriteButton>      
    }
    else if(categoryUserId === id && categoryCType !== "NOTICE"){
      return <div><AllDeleteButton onClick={allDelete}>전체 삭제</AllDeleteButton>
      <WriteButton onClick={onClickToggleModal1}>글쓰기</WriteButton></div>
    }
    else if(categoryUserId !== id && categoryCType === "NOTICE"){
      return  <></>
    }
    else{
      return <div><AllDeleteButton onClick={allDelete}>전체 삭제</AllDeleteButton>
      <WriteButton onClick={onClickToggleModal1}>글쓰기</WriteButton></div>
    }
  }
  if(myPage === true){
    return(
      <>
        <PostContainer>
          <MyPageComponent/>
        </PostContainer>
      </>
    )
  }
  else if(adminPage === true) {
    return(
      <>
        <PostContainer>
          <AdminPageWrapper/>
        </PostContainer>
      </>
    )
  }
  else{
    return (
      <>
        <PostContainer>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {selectTitle()}
              <div style={{ display: "flex", flexDirection: "row",  alignItems: "center", margin: "20px 80px 0 0" }}>
                {/* <SearchBar /> */}
   
                {selectButton()}
              </div>
            </div>
            <div>
              <PostList handleModal2={handleModal2} limit={limit} page={page} length={length} getLength={getLength} getPostId={getPostId} />
            </div>
          </div>
          {length === 0? (<></>): (
          <StickyFooter>
          <Pagination
            total={length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </StickyFooter>
          )}
        {isOpenModal1 && (
          <Modal
            onClickToggleModal={onClickToggleModal1}
            width="65vw"
            height="800px"
          >
            <PostEditor handleModal1={handleModal1} />
          </Modal>
        )}
        </PostContainer>
  
        {isOpenModal2 && (
          <Modal
            onClickToggleModal={onClickToggleModal2}
            width="1000px"
            height="680px"
          >
            <PostDetail postId={postId} postLike={postLike} onClickToggleModal2={onClickToggleModal2} onClickToggleModal3={onClickToggleModal3} setSinglePost={setSinglePost} />
          </Modal>
        )}
        {isOpenModal3 && (
          <Modal
            onClickToggleModal={onClickToggleModal3}
            width="1000px"
            height="680px"
          >
            <PostUpdate singlePost={singlePost} handleModal3={handleModal3} />
          </Modal>
        )}
        {console.log('postId : ' , postId)}
      </>
    );

  }
}

const UserIdDiv = styled.div`
font-size: 20px;
font-weight: bold;
background: ${palette.main_grBlue};
color: transparent;
-webkit-background-clip: text;
`;
const PostContainer = styled.div`
  width: 84vw;
  height: 863px;
  margin: 25px 60px 25px 0;
  border-radius: 20px;
  background-color: white;
  /* display: flex;
  flex-direction: column;
  justify-content: space-around; */
`;

// pagenation 버튼 위치 조작하는 곳
const StickyFooter = styled.footer`
/* position: fixed; 
bottom: 0; 
width: 83%;  */
`

const Title = styled.p`
  font-size: 30px;
  font-weight: bold;
  margin: 30px 0 0 40px;
`;
const IndividualPost = styled.div`
&:hover{  
  cursor: pointer
 }
`
const WriteButton = styled(ButtonBlue)`
width: 110px;
height: 50px;
padding: 0;
border-radius: 10px;
`
const AllDeleteButton = styled(ButtonPurple)`
width: 110px;
height: 50px;
padding: 0;
border-radius: 10px;
margin-right: 30px;
`

export default NormalPostFrame;
