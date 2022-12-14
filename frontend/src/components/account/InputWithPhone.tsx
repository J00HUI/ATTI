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
          console.log("??????????????? ????????? ?????? ??????");
          initialTime.current=300;
          // console.log(response);
        })
        .catch(function (error) {
          console.log("???????????? : " + error);
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
          // console.log("?????? ??????!");
          setIsSuccessMessage("??????????????? ?????? ???????????????.");
          isCertifiedSuccess(true);
          clearInterval(countdown.current);
        })
        .catch(function (error) {
          console.log("???????????? : " + error);
        });
    } else {
      setIsSuccessMessage("??????????????? ?????? ??????????????????.");
    }
    } else {
      setIsSuccessMessage("?????? ?????????????????????. ????????? ????????????");
    }
  };

  return (
    <div>
      <FormControl sx={{width: "100%"}}>
        <OutlinedInput
          type="text"
          endAdornment={
            <InputAdornment position="end">
              <ButtonPurple onClick={accreditPhone}>??????</ButtonPurple>
            </InputAdornment>
          }
          size={sizeBool?"medium":"small"}
          placeholder={placeholder}
          value={phonNumber}
          {...rest}
          sx={{bgcolor:`${palette.gray_1}`}}
        />
        {!phoneNumberMessage && (
          <FormHelperText error>????????? ?????? ????????? ?????????</FormHelperText>
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
                  <ButtonPurple onClick={accreditCode}>??????</ButtonPurple>
                </InputAdornment>
              }
              size="small"
              placeholder="????????????"
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
