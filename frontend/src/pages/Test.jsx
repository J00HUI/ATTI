// import styled from 'styled-components';
// import { useSelector, useDispatch } from 'react-redux';
// import React, { Component, useState, useCallback } from 'react';

// import {reducer, action, action2} from '../store/community/index'
// import axios from 'axios'
// function Test(){

//   const [post, setPost] = useState({
//     postId : "",
//     postTitle : "",
//     postContent : "",
//     postRegDate : "",
//     postUpdDate : "",
//     user_id : "",
//     category_id : ""
// })
  
// const dispatch = useDispatch();
 
// const action = {
//   writePosts : createAsyncThunk("WRITE/POSTS", async(e) => {
//       e.preventDefault();
//       return axios.post(
//         "http://localhost:8081/post/write",
//           {
//             postId : null,
//             postTitle : "ㅎㅇ",
//             postContent : "이현태도 왔다감",
//             postRegDate : null,
//             postUpdDate : null,
//             user_id : 1234125,
//             category_id : 12351235
//           },
//           {
//             headers: {
//               "Content-type": "application/json",
//             },
//           }
//       ).then((res) => {
//         console.log("response:", res)
//       });
    
//     },
//       [
//         post.postId,
//         post.postTitle,
//         post.postContent,
//         post.postRegDate,
//         post.postUpdDate,
//         post.user_id,
//         post.category_id
//       ]
//       )
//     };

// const signSubmi2t = useCallback(
//   async (e) => {
//     e.preventDefault();
//     try {
//       await axios
//         .post(
//           "http://localhost:8081/api/user/signup/normal",
//           {
//             userId: id,
//             password: password,
//             userName: name,
//             email: email,
//             birth: birthState.yy + birthState.mm + birthState.dd,
//             phone: phoneNumber,
//             social: "none",
//             uid: 1111111,
//             userDeleteInfo: false,
//             userRole: "STUDENT",
//           },
//           {
//             headers: {
//               "Content-type": "application/json",
//             },
//           }
//         )
//         .then((res) => {
//           console.log("response:", res);
//         });
//     } 
//     catch (err) {
//       const { response } = err ;
//     }
//   },
//   [
//     id,
//     password,
//     name,
//     email,
//     birthState.yy + birthState.mm + birthState.dd,
//     phoneNumber,
//   ]
// );


// const writePosts = useCallback(
//   async (e) => {
//     e.preventDefault();
//     try {
//       await axios
//         .post(
//           "http://localhost:8081/post/write",
//           {
//             postId : post.postId,
//             postTitle : post.postTitle,
//             postContent : post.postContent,
//             postRegDate : post.postRegDate,
//             postUpdDate : post.postUpdDate,
//             user_id : post.user_id,
//             category_id : post.category_id
//           },
//           {
//             headers: {
//               "Content-type": "application/json",
//             },
//           }
//         )
//         .then((res) => {
//           console.log("response:", res);

//         });
//     } catch (err) {
//       console.log(err)
//     }
//   },
//   [
//     post.postId,
//     post.postTitle,
//     post.postContent,
//     post.postRegDate,
//     post.postUpdDate,
//     post.user_id,
//     post.category_id
//   ]
// );


// const signSubmit = useCallback(
//   async (e) => {
//     e.preventDefault();
//     try {
//       await axios
//         .post(
//           "http://localhost:8081/post/write",
//           {
//             postId : null,
//             postTitle : "ㅎㅇ",
//             postContent : "이현태도 왔다감",
//             postRegDate : null,
//             postUpdDate : null,
//             user_id : 1234125,
//             category_id : 12351235
//           },
//           {
//             headers: {
//               "Content-type": "application/json",
//             },
//           }
//         )
//         .then((res) => {
//           console.log("response:", res);

//         });
//     } catch (err) {
      
//     }
//   },
  
// );


//   return(
//      <div>
//         {/* <input type="text" name='postId'  />
//         <input type="text" name='postContent'  onChange= {getValue} />
//         <input type="text" name='categoryId' />
//         <input type="text" name='userId'  /> */}
//         <button onClick = {signSubmit} >한 번 봅시다!</button>
       
//         {postContent}
      
//      </div>
//   );
// }



//   export default Test;