import { api } from "../../utils/api/index";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Logo from "../../assets/images/logoComputer.png";
import { departActions } from "../../store/community/Depart";
import { categoryActions } from "../../store/community/Category";
import { noticeActions } from "../../store/community/Notice";
import SnacbarTell from "../SnacbarTell";
import InputWithLabel from "../InputWithLabel";
import InputPassword from "../account/InputPassword";
import InputWithPhone from "../account/InputWithPhone";
import { ButtonBlue, ButtonPurple } from "../ButtonStyled";
import { palette } from "../../styles/palette";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/LoginStore";
import { KAKAO_AUTH_URL } from "../../constant";
import SwitchButton from "../SwitchButton";
import Modal from "../Modal";
import { Divider, FormHelperText } from "@mui/material";
import kakaoLoginLogo from "../../assets/images/kakao_login_button.png";

interface userLoginInfo {
  userId: string;
  password: string;
}

interface findIdInfo {
  findId_name: string;
  findId_email: string;
}

interface findPwInfo {
  findPw_Id: string;
  findPw_name: string;
  phoneNumber: string;
}

function LoginComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 로그인
  const [loginInfo, setLoginInfo] = useState<userLoginInfo>({
    userId: "",
    password: "",
  });
  const onChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setLoginInfo({
      ...loginInfo,
      [event.target.name]: event.target.value,
    });
  };
  const [isSuccessLogin, setIsSuccessLogin] = useState<string>("");

  // 일반 로그인
  const loginClick = async (event: any) => {
    event.preventDefault();
    await api
      .post("/auth/login/normal", {
        userId: loginInfo.userId,
        password: loginInfo.password,
      })
      .then(async function (response) {
        if (response.status === 200) {
          console.log("response:", response.data);
          if (isLoiginAuto) {
            localStorage.setItem("AccessToken", response.data.accessToken);
            localStorage.setItem("userId", loginInfo.userId);
          }
          dispatch(
            loginActions.login({
              id: loginInfo.userId,
              userName: response.data.userName,
              accessToken: response.data.accessToken,
              admin: response.data.admin,
              // categoryList: response.data.categoryList,
              // departList: response.data.departList,
              // postList: response.data.postList,
            })
          );
        }
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

      })
      .catch(function (error) {
        console.log("Error", error);
        console.log("Error", "로그인 실패!");
        setIsSuccessLogin("로그인에 실패하였습니다.");
      });
  };

  // 카카오 로그인
  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;

    let AuthorizationCode = new URL(window.location.href).searchParams.get(
      "code"
    );
    console.log(AuthorizationCode);
  };

  //아이디 찾기
  const [findIdInfo, setfindIdInfo] = useState<findIdInfo>({
    findId_name: "",
    findId_email: "",
  });

  const onChangeFindID = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setfindIdInfo({
      ...findIdInfo,
      [event.target.name]: event.target.value,
    });
  };

  const clickFindId = async (e: any) => {
    e.preventDefault();
    await api
      .post("/user/findId", {
        name: findIdInfo.findId_name,
        email: findIdInfo.findId_email,
      })
      .then(function (response) {
        setFindID('는 "' + response.data.userId + '" 입니다.');
      })
      .catch(function (error) {
        setFindID("가 존재하지 않습니다");
      });
  };

  // 비밀번호 찾기
  const [findPwInfo, setFindPwInfo] = useState<findPwInfo>({
    findPw_name: "",
    findPw_Id: "",
    phoneNumber: "",
  });
  const [isPhoneNumber, setIsPhoneNumber] = useState<boolean>(false);
  const onChangePhonNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setFindPwInfo({
      ...findPwInfo,
      phoneNumber: value
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
        .replace(/(\-{1,2})$/g, ""),
    });
  };

  const onChangeFindPW = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFindPwInfo({
      ...findPwInfo,
      [event.target.name]: event.target.value,
    });
  };

  const clickFindPw = async (e: any) => {
    e.preventDefault();
    await api
      .post("/user/findPassword", {
        userId: findPwInfo.findPw_Id,
        usesrName: findPwInfo.findPw_name,
        phoneNumber: findPwInfo.phoneNumber,
      })
      .then(function (response) {
        setFindPwInfo({
          ...findPwInfo,
          findPw_name: "",
          findPw_Id: "",
          phoneNumber: "",
        });
        setOpen(true);
        setIsPhoneNumber(false);
        setNewPasswordOpen(true);
      })
      .catch(function (error) {
        setFindPW("회원정보가 없습니다");
      });
  };

  // 새 비밀번호
  const [isNewPasswordModal, setNewPasswordOpen] = useState<boolean>(false);
  /* 값 받아오기 */
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  /* 오류메세지 */
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    useState<string>("");
  /* 성공여부 */
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\~!@#$%^&*])[^\s]{6,12}$/;
    if (!regex.test(e.target.value)) {
      setPasswordMessage(
        "영어 대문자, 영어 소문자, 숫자, 특수문자(~!@#$%^&*)를 모두 1개 이상을 포함한 비밀번호 6~12자만 가능합니다."
      );
      setIsPassword(false);
    } else setIsPassword(true);
  };

  const onChangePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
    if (password != e.target.value) {
      setPasswordConfirmMessage("위에 입력한 비밀번호와 일치하지 않습니다.");
      setIsPasswordConfirm(false);
    } else setIsPasswordConfirm(true);
  };

  const [open, setOpen] = useState(false);

  const updatePw = async (e: any) => {
    e.preventDefault();
    await api
      .put("/user/updatePassword", {
        userId: findPwInfo.findPw_Id,
        password: password,
      })
      .then(function (response) {
        console.log("비밀번호가 변경되었습니다.");
        setPassword("");
        setPasswordConfirm("");
        setOpen(true);
        setOpenModal(false);
        setNewPasswordOpen(false);
      })
      .catch(function (error) {
        setFindPW("error가 발생");
        console.log("Error", error);
        // ↓ 오류 해결 후 지워도 됨 ↓
        setPassword("");
        setPasswordConfirm("");
      });
  };

  // 아이디 찾기, 비밀번호 찾기
  const [findValue, setFindValue] = useState<string>("");
  const [clickFindID, setFindID] = useState<string>("");
  const [clickFindPW, setFindPW] = useState<string>("");
  //const [clickFindID] = useState<boolean>(false);

  // 모달 보이기 여부
  const [findInfoModal, setOpenModal] = useState<boolean>(false);
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!findInfoModal);
  }, [findInfoModal]);

  const setClickModal = (value: string) => {
    setFindValue(value);
    onClickToggleModal();
  };

  // 자동 로그인
  const [isLoiginAuto, setLoiginAuto] = useState<boolean>(false);

  return (
    <>
      <SnacbarTell
        open={open}
        setOpen={setOpen}
        message="비밀번호가 변경되었습니다."
        type="success"
      />
      <StyledPage>
        <div>
          {/* <div>최근에 로그인한 서비스</div>
          <img
            src={
              "https://image.rocketpunch.com/company/5466/naver_logo.png?s=50x50&t=inside"
            }
            alt="네이버로 로그인"
          />
          <hr /> */}
          <SwitchDiv>
            <span style={{paddingBottom:"6px"}}>자동 로그인</span>
            <span onClick={() => setLoiginAuto(!isLoiginAuto)}>
              <SwitchButton />
            </span>
          </SwitchDiv>

          <div>
            <InputAll>
              <InputWithLabel
                name="userId"
                placeholder="ID"
                onChange={onChangeLogin}
                sizeBool={true}
              />
              <InputWithLabel
                name="password"
                placeholder="Password"
                type="password"
                sizeBool={true}
                onChange={onChangeLogin}
              />
            </InputAll>

            <ButtonSpanGrid>
            <DialogButton
                onClick={(e) => {
                  setClickModal("findID");
                  setFindID("");
                }}
              >
                아이디 찾기
              </DialogButton>
             <div style={{borderLeft: `1px solid ${palette.gray_3}`, height: `auto`}}/>
             <DialogButton
                onClick={(e) => {
                  setClickModal("findPW");
                }}
              >
                비밀번호 찾기
              </DialogButton>
            </ButtonSpanGrid>
          </div>

          <LoginButton onClick={loginClick}>로그인</LoginButton>
          {isSuccessLogin && <p style={{ color: "red" }}>{isSuccessLogin}</p>}
          <Divider>다른 서비스를 이용한 로그인</Divider>
        
            <KakaoButton
              src={kakaoLoginLogo}
              alt="카카오로 로그인"
              onClick={kakaoLogin}
            />
  
        </div>

        {/* 모달 생성 */}
        {findInfoModal && (
          <Modal
            onClickToggleModal={onClickToggleModal}
            width="600px"
            height="auto"
          >
            <ModalDiv>
              <ModalButtonGrid>
                  <TextSpan
                    onClick={(e) => {
                      setFindValue("findID");
                      setFindID("");
                    }}
                  >
                    아이디 찾기
                  </TextSpan>
                <Vline/>
                  <TextSpan
                    onClick={(e) => {
                      setFindValue("findPW");
                      setFindPW("");
                    }}
                  >
                    비밀번호 찾기
                  </TextSpan>
              </ModalButtonGrid>
              <div>
                {/*아이디 찾기 모달*/}
                {findValue == "findID" && (
                  <>
                  <InputAll>
                    <InputWithLabel
                      name="findId_name"
                      placeholder="Name"
                      onChange={onChangeFindID}
                      sizeBool={true}
                    />
                    <InputWithLabel
                      name="findId_email"
                      placeholder="email"
                      type="email"
                      onChange={onChangeFindID}
                      sizeBool={true}
                    />
                  </InputAll>
                  <p>
                    {clickFindID.length > 0&& `아이디${clickFindID}`}
                  </p>
                    <FindButton onClick={clickFindId}>찾기</FindButton>
                
                    </>)}
                {/*비밀번호 찾기 모달*/}
                {findValue == "findPW" && (
                  <>
                  <InputAll>
                    <InputWithLabel
                      name="findPw_name"
                      placeholder="이름"
                      onChange={onChangeFindPW}
                      sizeBool={true}
                    />
                    <InputWithLabel
                      name="findPw_Id"
                      placeholder="아이디"
                      onChange={onChangeFindPW}
                      sizeBool={true}
                    />
                    <InputWithPhone
                      name="phoneNumber"
                      placeholder="폰 번호"
                      phonNumber={findPwInfo.phoneNumber}
                      onChange={onChangePhonNumber}
                      isCertifiedSuccess={setIsPhoneNumber}
                      sizeBool={true}
                    />
                    </InputAll>
                    {isPhoneNumber &&
                      findPwInfo.findPw_name.length > 0 &&
                      findPwInfo.findPw_Id.length > 0 && isNewPasswordModal && (
                        <NewPW>
                          <div>
                            <div style={{ padding: `1rem` }}>
                              <TextSpan>비밀번호변경</TextSpan>
                            </div>
                            <div style={{ width: `70%`, padding: `30px 15%` }}>
                              <InputPassword
                                name="password"
                                placeholder="비밀번호"
                                value={password}
                                onChange={onChangePassword}
                              />
                              {password.length > 0 && !isPassword && (
                                <FormHelperText error>
                                  {passwordMessage}
                                </FormHelperText>
                              )}
                              <InputWithLabel
                                name="password2"
                                placeholder="비밀번호 확인"
                                type="password"
                                value={passwordConfirm}
                                onChange={onChangePasswordConfirm}
                              />
                              {passwordConfirm.length > 0 &&
                                !isPasswordConfirm && (
                                  <FormHelperText error>
                                    {passwordConfirmMessage}
                                  </FormHelperText>
                                )}
                            </div>
                            <ButtonBlue onClick={updatePw}>수정</ButtonBlue>
                          </div>
                        </NewPW>
                      )}
                    {clickFindPW && <p>{clickFindPW}</p>}
                    <FindButton onClick={clickFindPw}>비밀번호 변경</FindButton>
                  </>
                )}
              </div>
            </ModalDiv>
          </Modal>
        )}
      </StyledPage>
    </>
  );
}

const StyledPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 44px;
  /* border:1px solid; */
`;
const SwitchDiv = styled.div`
  display: flex;
  justify-content: right;
  text-align: center;
  align-items: center;
`;

const InputAll = styled.div`
  display: grid;
  grid-auto-rows: minmax(90px, auto);
`;

const ButtonSpanGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  justify-items: center;
  padding: 30px 100px 50px 100px;
  width: 300px;
`;

const DialogButton = styled.button`
  width: auto;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0);
`;

const LoginButton =styled(ButtonBlue)`
  padding: 10px 20px;
  font-size: 1.1rem; //텍스트 크기
  font-weight: bold; //텍스트 굵기
  margin-bottom: 40px;
`;

const KakaoButton =styled.img`
  margin-top: 40px;
`;

const ModalDiv = styled.div`
  color: gray; //텍스트 색상
  font-size: middle; //텍스트 크기
  font-weight: bold; //텍스트 굵기
  text-align: center; //텍스트 정렬 방향
  align-items: center;
  line-height: 70px; //줄간격
  width: 80%;
`;

const ModalButtonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  justify-items: center;
  width: 100%;
  margin: 10px 0px 30px 0px; 
`;

const TextSpan = styled.span`
  font-size: 1.5em;
  cursor: pointer;
  background: ${palette.main_grBlue};
  -webkit-background-clip: text;
  color: transparent;
`;

const FindButton = styled(ButtonBlue)`
 padding: 6px 18px;
  font-size: 1.1rem; //텍스트 크기
  font-weight: bold; //텍스트 굵기
`;

const NewPW = styled.div`
  position: absolute;
  background: white;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
`;

const Vline = styled.div`
  border-left: 1px dashed ${palette.gray_3};
  height: auto;
`;

export default LoginComponent;
