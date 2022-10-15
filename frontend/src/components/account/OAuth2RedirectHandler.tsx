import { Backdrop, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginActions } from "../../store/LoginStore";
import { api } from "../../utils/api";
import { noticeActions } from "../../store/community/Notice";
import { categoryActions } from "../../store/community/Category";
import { departActions } from "../../store/community/Depart";

function OAuth2RedirectHandler() {
  // 인가코드
  let Authcode = new URL(window.location.href).searchParams.get("code");
  console.log(Authcode);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  api
    .get("/auth/login/kakao", {
      params: {
        code: Authcode,
      },
    })
    .then(async function (response) {
      if (response.status === 200) {
        // console.log("response", response.data);
        dispatch(
          loginActions.login({
            id: response.data.userId,
            userName: response.data.userName,
            accessToken: response.data.accessToken,
            admin: response.data.admin,
            // categoryList: response.data.categoryList,
            // departList: response.data.departList,
          })
        );
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
      }
    })
    .catch(function (error) {
      console.log("Error", error);
      console.log("Error", "로그인 실패!");
    });

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default OAuth2RedirectHandler;
