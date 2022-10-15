import React, { PropsWithChildren, useState, useCallback } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import ReactHtmlParser from "react-html-parser";

import PostDetail from "./PostDetail";
import PostEditor from "./PostEditor";
import Modal from "../Modal";
import SearchBar from "./SearchBar";
import { ButtonBlue } from "../ButtonStyled";
import { palette } from "../../styles/palette";

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

 export function NormalPostList() {
    const dummyPost = {
      post: [
        {
            user_id : '이현태',
            post_id : 1,
            post_title : "아아아아아아아아아아",
            post_content : "222222222222222222222222",
            post_req_date : "2022-07-28 11:14",
            post_upd_date : "2022-07-28 11:15",
            post_ano_info : 0,
            post_com_ban_info : 0,
        },
        {
            user_id : '정진',
            post_id : 2,
            post_title : "오오오오오옹오옹오오오옹오",
            post_content : "3333333333333333333333333333",
            post_req_date : "2022-07-28 11:14",
            post_upd_date : "2022-07-28 11:15",
            post_ano_info : 0,
            post_com_ban_info : 0,
        },
        {
            user_id : '김연수',
            post_id : 3,
            post_title : "이이이잉이이이이이이이이이이이이이이",
            post_content : "44444444444444444444444444444",
            post_req_date : "2022-07-28 11:14",
            post_upd_date : "2022-07-28 11:15",
            post_ano_info : 0,
            post_com_ban_info : 0,
        },
        {
          user_id : '김연수',
          post_id : 3,
          post_title : "이이이잉이이이이이이이이이이이이이이",
          post_content : "44444444444444444444444444444",
          post_req_date : "2022-07-28 11:14",
          post_upd_date : "2022-07-28 11:15",
          post_ano_info : 0,
          post_com_ban_info : 0,
      }
      ],
    };
  
    const postTitle = useSelector((state) => state.normalPost.post_title);
    const postContent = useSelector((state) => state.normalPost.post_content);
    const postUpdDate = useSelector((state) => state.normalPost.post_upd_date);
  
    dummyPost.post.push({
      post_title: postTitle,
      post_content: postContent,
      post_upd_date: postUpdDate,
    });
  
    const Rendering = () => {
      const result = [];
      const postStyle = {
        borderRadius: "30px",
        backgroundColor: palette.gray_1,
        width: "1150px",
        height: "90px",
        margin: "15px 0 0 50px",
        boxShadow: "2px 2px 2px grey"
      };
  
      for (let i = 0; i < dummyPost.post.length; i++) {
        result.push(
          <IndividualPost>
            <div key={i} style={postStyle} onClick={onClickToggleModal2}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  padding: "10px 20px 0 "
                }}
              >
                <div style={{fontSize: "20px", fontWeight: "bold"}}>
                  작성자: 이현태
                </div>
                {dummyPost.post[i]["post_upd_date"]}
              </div>
              <hr style={{width: "95%"}} />
  
              <div style={{display: "flex",justifyContent: "space-between", alignItems: "center", padding: "0 20px" }}>
                <div style={{fontSize: "20px", fontWeight: "bold"}}>
                  {dummyPost.post[i]["post_title"]}   
                </div>
                <div>
                <FavoriteBorderIcon/> 24
                &nbsp; &nbsp; &nbsp;
                <ChatBubbleOutlineIcon/> 20
                </div>
              
              </div>
              
            </div>
          </IndividualPost>
          
        );
      }
      return result;
    };
    return (
      <>
        {Rendering()}
      </>
    );
  }