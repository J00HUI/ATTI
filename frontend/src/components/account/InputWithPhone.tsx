import * as React from "react";
import FormControl from "@mui/material/FormControl";
import { ButtonPurple } from "../ButtonStyled";
import { FormHelperText, InputAdornment, OutlinedInput } from "@mui/material";
import { api } from "../../utils/api";
import { palette } from "../../styles/palette";

interface inputInfo {
  name: string;
  placeholder: string;
  phonNumber: string;
  isCertifiedSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  textBool?: boolean;
  helperText?: string;
  sizeBool?:boolean;
}

export default function InputWithPhone({
  placeholder,
  phonNumber,
  isCertifiedSuccess,
  sizeBool,
  ...rest
}: inputInfo) {
  const [isPhoneNumber, setIsPhoneNumber] = React.useState<boolean>(false);
  const [phoneNumberMessage, setPhoneNumberMessage] =
    React.useState<boolean>(true);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
  // const [isCertified, setIsCertified] = React.useState<boolean>(false);
  const [isSuccessMessage, setIsSuccessMessage] = React.useState<string>("");
  const [isCode, setIsCode] = React.useState<string>("");

  const [minutes, setMinutes] = React.useState(5);
  const [seconds, setSeconds] = React.useState(0);
  const initialTime = React.useRef(minutes * 60 + seconds);
  const countdown = React.useRef<NodeJS.Timer>();

  React.useEffect(() => {
    countdown.current = setInterval(() => {
      initialTime.current -= 1;
      setSeconds(initialTime.current % 60);
      setMinutes(parseInt((initialTime.current / 60).toString().padStart(2, '0')));
    }, 1000);
    return () => clearInterval(countdown.current);
  }, [minutes, seconds]);


  const accreditPhone = async () => {
    const value = phonNumber.replace(/[^0-9]/g, "");
    const regex = /^010-?([0-9]{3,4})-?([0-9]{4})$/;
    if (regex.test(value)) {
      await api
        .post("/auth/phone", {
          phoneNumber: value,
        })
        .then(function (response) {
          setPhoneNumberMessage(true);
          setIsPhoneNumber(true);
          console.log("전화번호로 메세지 전송 성공");
          initialTime.current=300;
          // console.log(response);
        })
        .catch(function (error) {
          console.log("에러발생 : " + error);
        });
    } else {
      setIsPhoneNumber(false);
      setPhoneNumberMessage(false);
    }
  };

  const onChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCode(e.target.value);
  };

  const accreditCode = async () => {
    const value = isCode.replace(/[^0-9]/g, "");
    setIsSuccess(true);
  if ((minutes*60+seconds)>0) {
    if (value.length >= 6) {
      await api
        .get("/auth/phone/authCode", {
          params: {
            code: value,
          },
        })
        .then(function (response) {
          // console.log("인증 성공!");
          setIsSuccessMessage("성공적으로 인증 되었습니다.");
          isCertifiedSuccess(true);
          clearInterval(countdown.current);
        })
        .catch(function (error) {
          console.log("에러발생 : " + error);
        });
    } else {
      setIsSuccessMessage("인증번호를 다시 확인해주세요.");
    }
    } else {
      setIsSuccessMessage("시간 초과되었습니다. 재인증 해주세요");
    }
  };

  return (
    <div>
      <FormControl sx={{width: "100%"}}>
        <OutlinedInput
          type="text"
          endAdornment={
            <InputAdornment position="end">
              <ButtonPurple onClick={accreditPhone}>인증</ButtonPurple>
            </InputAdornment>
          }
          size={sizeBool?"medium":"small"}
          placeholder={placeholder}
          value={phonNumber}
          {...rest}
          sx={{bgcolor:`${palette.gray_1}`}}
        />
        {!phoneNumberMessage && (
          <FormHelperText error>번호를 다시 확인해 주세요</FormHelperText>
        )}
      </FormControl>
      {isPhoneNumber? (
        <div>
          <FormControl sx={{ width: "100%", mt: 1 }}>
            <OutlinedInput
              type="text"
              endAdornment={
                <InputAdornment position="end">
                  <span style={{ marginRight: "12px" }}>
                    {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                  </span>
                  <ButtonPurple onClick={accreditCode}>확인</ButtonPurple>
                </InputAdornment>
              }
              size="small"
              placeholder="인증번호"
              value={isCode}
              onChange={onChangeCode}
              sx={{bgcolor:`${palette.gray_1}`}}
            />
            {isSuccess && <FormHelperText>{isSuccessMessage}</FormHelperText>}
          </FormControl>
        </div>
      ):(
        <div style={{height:"50px"}}/>
      )}
    </div>
  );
}
