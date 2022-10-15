import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';
import BestChip from './BestChip';
import moment from "moment";

import { CountActions } from '../../store/community/Count';
import { reRenderingActions } from '../../store/community/ReRendering';
import { palette } from '../../styles/palette';
import apiAcc, {api} from '../../utils/api';
import { CommentOutlined } from '@material-ui/icons';


function CommentList({comments, postId}){
    const { id } = useSelector(state => state.userInfo)
    const [commentList, setCommentList] = useState(comments)
    const currentSetPost = useSelector(state => state.reRendering.setPost)
    const updateSetPost = !currentSetPost
    const myCommentLike = useSelector(state => state.count.myCommentLike)
    const dispatch = useDispatch()
    // 단일 comment 지우기
    const commentDelete = (commentId) => {
        api.delete(`/post/comment/delete/${commentId}`
        )
        .then((res) => {
            console.log("댓글 지우기:", res);
            console.log("-----------------")
            dispatch(reRenderingActions.saveSetPost(
                {setPost: updateSetPost }))

        });
    }
    useEffect(() => {
        
        api.get(`post/comment/read/${postId}/${id}`)
        .then((res) => {
            console.log("댓글들: ", res.data)
            commentList = res.data
            dispatch(CountActions.savecommentMyLike(
                {
                    commentMyLike: res.data.myCommentLike
                }
            ))
        })
    }, [currentSetPost])

    // // 단일 comment 좋아요
    const [commentLikeCount, setCommentLikeCount] = useState([])
    const commentLikeCountLength = useSelector(state => state.count.commentLikeCount)
    const commentLike = (commentId) => {
        api.get(`/post/comment/likeBtn/${commentId}/${id}`
        ).then((res) => {
            console.log("댓글 좋아요: ", res.data )
            setCommentLikeCount(res.data)
            dispatch(CountActions.saveCommentLikeCount(
                {
                    commentLikeCount: res.data
                }
            ))
            dispatch(reRenderingActions.saveSetPost(
                {setPost: updateSetPost }
            ))
        })
    }
    // useEffect((e.commentId) => {
    //     commentLike(e.commentId)
    // }, [commentLikeCount]);


     const hrStyle = {
        height: "0.1px",
        backgroundColor: "gray",
        width: "100%",
        margin: "-10px 0 0 0"
    }
    // function timeForToday(value) {
    //     const today = new Date();
    //     const timeValue = new Date(value);
      
    //     const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    //     if (betweenTime < 1) return '방금 전';
    //     if (betweenTime < 60) {
    //         return `${betweenTime}분 전`;
    //     }
      
    //     const betweenTimeHour = Math.floor(betweenTime / 60);
    //     if (betweenTimeHour < 24) {
    //         return `${betweenTimeHour}시간 전`;
    //     }
      
    //     const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    //     if (betweenTimeDay < 365) {
    //         return `${betweenTimeDay}일 전`;
    //     }
      
    //     return `${Math.floor(betweenTimeDay / 365)}년 전`;
    //   }
    console.log("뭐가 들어있지?:", commentList)
    if(comments.length === 0){
        return(
            <div></div>
        )
    }
    else{
        return(
            <CommentDiv>
                {comments.map((e,i) => (
                    <>
                    {console.log("eeeeeee,", e)}
                    <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "space-between"}}>
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <div style={{display: "flex", flexDirection: "row", height: "40px"}}>
                                <Avatar sx={{ width: 30, height: 30 }} style={{margin: "11px 10px 0 11px"}}>{id.substring(0,1)}</Avatar>
                                <p>{e.userId}</p>
                                {/* <BestChip/> */}
                            </div>
                            <div style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-end", margin: "10px 10px 0 0"}}>
                                <div>
                                   {moment(e.commentRegDate).format('YYYY-MM-DD HH:mm')}
                                </div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    {/* <span style={{margin: "10px 0 0 0"}}>답글</span> */}
                                    {myCommentLike === true? (<Checkbox  onClick={() => {commentLike(e.commentId)}} style={{width: "24px", height: "45px"}}icon={<Favorite />} checkedIcon={<FavoriteBorder/>}/>  )
                                    :( <Checkbox  onClick={() => {commentLike(e.commentId)}} style={{width: "24px", height: "45px"}}icon={<FavoriteBorder />} checkedIcon={<Favorite />}/> )}
                                    &nbsp; &nbsp;
                                    <span style={{margin: "10px 0 0 -10px"}}>{e.commentLikeCount}</span>

                                    <CustomDeleteIcon onClick={()=>{commentDelete(e.commentId)}}/>
                                </div>
                            </div>
                        </div>
                            <div style={{margin: "-15px 0 0 15px"}}>
                                <p style={{wordBreak: "break-all", width: "880px"}}>{e.commentContent}</p>
                            </div>
                        
                    </div>
                    <Hr/>
                    </>
                ))}
            </CommentDiv>
        )
    }
}

const CustomDeleteIcon = styled(DeleteIcon)`
margin: 10px 0 0 5px;
&:hover{
    cursor: pointer;
}
`;

const CommentDiv = styled.div`
width: 950px;
height: 210px;
margin: -20px 0 0 25px;
overflow: auto;
overflow-x: hidden;
&::-webkit-scrollbar {
    width: 8px;
    background: ${palette.white};
  }
&::-webkit-scrollbar-thumb {
border-radius: 10px;
background: ${palette.main_grBlue};
}
`;

const Hr = styled.hr`
height: 0.1px;
backgroundColor: gray;
width: 100%;
margin: -10px 0 0 0;
`;


export default CommentList