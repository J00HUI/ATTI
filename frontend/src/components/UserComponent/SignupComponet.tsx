import { api } from "../../utils/api/index";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SnacbarTell from "../SnacbarTell";
import InputWithLabel from "../InputWithLabel";
import InputPassword from "../account/InputPassword";
import InputWithPhone from "../account/InputWithPhone";
import { ButtonBlue } from "../ButtonStyled";
import { palette } from "../../styles/palette";
import { FormControl, FormHelperText, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function SignupComponent() {
  const navigate = useNavigate();
  const now = new Date();

  //이름, 아이디, 비밀번호, 비밀번호 확인, 생일, 이메일, 폰번호
  const [name, setName] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [birthState, setBirth] = useState({
    yy: now.getFullYear() - 14,
    mm: now.getMonth().toString(),
    dd: now.getDay().toString(),
  });
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  //오류메시지 상태저장
  const [nameMessage, setNameMessage] = useState<string>("");
  const [idMessage, setIdMessage] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    useState<string>("");
  const [emailMessage, setEmailMessage] = useState<string>("");
  //const [phoneNumberMessage, setPhoneNumberMessage] = useState<string>("");

  // 유효성 검사
  const [isName, setIsName] = useState<boolean>(false);
  const [isId, setIsId] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isPhoneNumber, setIsPhoneNumber] = useState<boolean>(false);

  // 회원가입 성공여부
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    const regex = /^[a-z|A-Z|가-힣|ㄱ-ㅎ|ㅏ-ㅣ][^0-9\s/g]{1,24}$/;
    if (!regex.test(e.target.value)) {
      setNameMessage(
        "영어와 한글을 조합한 2글자 이상 24글자 미만으로 입력해주세요."
      );
      setIsName(false);
    } else setIsName(true);
  };

  const onChangeId = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
    const regex = /^[a-z0-9][^\s]{5,16}$/;
    if (!regex.test(e.target.value)) {
      setIdMessage("ID는 영소문자, 숫자를 조합한 6~16자만 가능합니다.");
      setIsId(false);
    } else {
      api
        .get("/user/idcheck", {
          params: {
            ckid: e.target.value,
          },
        })
        .then(function (response) {
          let data: boolean = response.data;
          if (data) setIsId(true);
          else {
            setIdMessage("중복된 ID입니다");
            setIsId(false);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\~!@#$%^&*])[^\s]{6,12}$/;
    if (!regex.test(e.target.value)) {
      setPasswordMessage(
        "영어 대문자, 영어 소문자, 숫자, 특수문자 각 1개 이상을 포함한 비밀번호 6~12자만 가능합니다."
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

  const onChangeBirth = (e: SelectChangeEvent) => {
    setBirth({
      ...birthState,
      [e.target.name]: e.target.value,
    });
  };

  let years = [];
  for (let y = now.getFullYear() - 14; y >= now.getFullYear() - 35; y -= 1) {
    years.push(y.toString());
  }

  let month = [];
  for (let m = 1; m <= 12; m += 1) {
    if (m < 10) month.push("0" + m.toString());
    else month.push(m.toString());
  }
  let days = [];
  let date = new Date(birthState.yy, 1, 0).getDate();
  for (let d = 1; d <= date; d += 1) {
    if (d < 10) days.push("0" + d.toString());
    else days.push(d.toString());
  }

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex =
      /^[0-9a-zA-Z]([_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    setEmail(e.target.value);
    if (!regex.test(e.target.value)) {
      setEmailMessage("이메일 형식이 아닙니다");
      setIsEmail(false);
    } else setIsEmail(true);
  };

  const onChangePhonNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setPhoneNumber(
      value
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
        .replace(/(\-{1,2})$/g, "")
        
    );
  };

  const InputStyle = styled(FormControl)(({ theme }) => ({
    backgroundColor: palette.gray_1,
  }));

  // 회원가입 성공 알림
  const [open, setOpen] = useState(false);

  const signSubmit = async (e: any) => {
    e.preventDefault();
    let date = ("" + birthState.yy + birthState.mm + birthState.dd).replace(
      /[^0-9]/g,
      ""
    );

    await api
      .post("/user/signup/normal", {
        userId: id,
        password: password,
        userName: name,
        email: email,
        birth: date,
        phone: phoneNumber,
        social: "none",
        uid: 1111111,
        userDeleteInfo: false,
        userRole: "STUDENT",
      })
      .then(function (response) {
        console.log("response:", response);
        if (response.status === 200) {
          setOpen(true);
          navigate("/login");
        }
      })
      .catch(function (error) {
        if (error?.status === 500) {
          console.log("ID중복 오류 입니다.");
        }
      });
  };

  return (
    <>
      <SnacbarTell
        open={open}
        setOpen={setOpen}
        message="회원가입 되었습니다."
        type="success"
      />
      <StyledContent>
        <>
          <InputAll>
            <InputWithLabel
              name="name"
              placeholder="이름"
              value={name}
              onChange={onChangeName}
            />
            <InputWithLabel
              name="id"
              placeholder="아이디"
              value={id}
              onChange={onChangeId}
            />
            <InputPassword
              name="password"
              placeholder="비밀번호"
              value={password}
              onChange={onChangePassword}
            />
            <InputWithLabel
              name="password2"
              placeholder="비밀번호 확인"
              type="password"
              value={passwordConfirm}
              onChange={onChangePasswordConfirm}
            />
          </InputAll>
          <div>
            <InputStyle sx={{ width: 122, mr: 2 }} size="small">
              <Select
              name="yy"
                value={birthState.yy.toString()}
                onChange={onChangeBirth}
                displayEmpty
              >
                <MenuItem>
                  <em>생년</em>
                </MenuItem>
                {years.map((item) => (
                  <MenuItem value={item} key={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </InputStyle>
            <InputStyle sx={{ width: 122, mr: 2 }} size="small">
              <Select
                name="mm"
                value={birthState.mm.toString()}
                onChange={onChangeBirth}
                displayEmpty
              >
                <MenuItem>
                  <em>월</em>
                </MenuItem>
                {month.map((item) => (
                  <MenuItem value={item} key={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </InputStyle>
            <InputStyle sx={{ width: 122 }} size="small">
              <Select
                name="dd"
                value={birthState.dd.toString()}
                onChange={onChangeBirth}
                displayEmpty
              >
                <MenuItem value="">
                  <em>일</em>
                </MenuItem>
                {days.map((item) => (
                  <MenuItem value={item} key={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </InputStyle>
          </div>
          <div style={{ width: "400px", margin: "15px 0px" }}>
            <InputWithLabel
              name="email"
              placeholder="이메일"
              type="email"
              value={email}
              onChange={onChangeEmail}
            />
          </div>
          <div style={{ width: "400px", height: "90px", marginTop: "5px" }}>
            <InputWithPhone
              name="phoneNumber"
              placeholder="폰 번호"
              phonNumber={phoneNumber}
              onChange={onChangePhonNumber}
              isCertifiedSuccess={setIsPhoneNumber}
            />
          </div>
          <NameHelperText>
            {name.length > 0 && !isName && (
              <FormHelperText disabled variant="filled">
                {nameMessage}{" "}
              </FormHelperText>
            )}
          </NameHelperText>
          <IdHelperText>
            {id.length > 0 && !isId && (
              <FormHelperText disabled variant="filled">
                {idMessage}{" "}
              </FormHelperText>
            )}
          </IdHelperText>
          <PwHelperText>
            {password.length > 0 && !isPassword && (
              <FormHelperText disabled variant="filled">
                {passwordMessage}
              </FormHelperText>
            )}
          </PwHelperText>
          <PwCheckHelperText>
            {passwordConfirm.length > 0 && !isPasswordConfirm && (
              <FormHelperText disabled variant="filled">
                {passwordConfirmMessage}
              </FormHelperText>
            )}
          </PwCheckHelperText>
          <EmailHelperText>
            {email.length > 0 && !isEmail && (
              <FormHelperText disabled variant="filled">
                {emailMessage}
              </FormHelperText>
            )}
          </EmailHelperText>
          {!(
            isName &&
            isId &&
            isPassword &&
            isPasswordConfirm &&
            isEmail &&
            isPhoneNumber
          ) ? (
            <p style={{ color: `${palette.red}` }}>
              회원가입하려면 모두 입력해주세요.
            </p>
          ):(<p style={{height:"20px"}}> </p>)}
          <ButtonBlue
            onClick={signSubmit}
            disabled={
              !(
                isName &&
                isId &&
                isPassword &&
                isPasswordConfirm &&
                isEmail &&
                isPhoneNumber
              )
            }
          >
            가입하기
          </ButtonBlue>
        </>
      </StyledContent>
    </>
  );
}

const StyledContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: auto;
  justify-content: center;
  text-align: center;
  height: 100%;
`;

const InputAll = styled.div`
  display: grid;
  grid-auto-rows: minmax(78px, auto);
  width: 400px;
`;

const NameHelperText = styled.span`
  width: 405px;
  position: absolute;
  top: 232px;
`;

const IdHelperText = styled.span`
  width: 400px;
  position: absolute;
  top: 310px;
`;

const PwHelperText = styled.span`
  width: 410px;
  position: absolute;
  top: 386px;
`;

const PwCheckHelperText = styled.span`
  width: 403px;
  position: absolute;
  top: 467px;
`;

const EmailHelperText = styled.span`
  width: 400px;
  position: absolute;
  top: 599px;
`;

export default SignupComponent;
