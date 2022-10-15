import * as React from "react";
import FormControl from "@mui/material/FormControl";
import { ButtonPurple } from "../ButtonStyled";
import { FormHelperText, InputAdornment, OutlinedInput } from "@mui/material";
import { api } from "../../utils/api";
import { palette } from "../../styles/palette";
import styled from "styled-components";

interface inputInfo {
  name: string;
  placeholder: string;
  value?: string | number | readonly string[] | undefined;
  disabled?: boolean;
  onClick?:React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function InputWithPhone({
  name,
  placeholder,
  value,
  onClick,
  ...rest
}: inputInfo) {
 
  // const channelOut = async () => {
  //     await api
  //       .post("채널나가기", {
  //         phoneNumber: value,
  //       })
  //       .then(function (response) {
  //         console.log("채널 나가기 성공", response);
  //       })
  //       .catch(function (error) {
  //         console.log("에러발생 : " + error);
  //       });
  // };

  return (
      <FormControl sx={{width: "100%"}}>
        <OutlinedInput
          type="text"
          endAdornment={
            <InputAdornment position="end">
              <RedButton onClick={onClick}>나가기</RedButton>
            </InputAdornment>
          }
          size="small"
          placeholder={placeholder}
          value={value}
          {...rest}
          sx={{bgcolor:`${palette.gray_1}`}}
        />
      </FormControl>
  );
}

const RedButton = styled.button`
background: ${palette.pink_1};
color: ${palette.red};
font-size: 0.8rem;
border-radius: 1rem;
border: 0px solid;
padding: 0.4rem 0.7rem;
font-weight: bold;
cursor: pointer;
&:active,
&:hover {
  filter: brightness(90%);
  background: ${palette.pink_1};
}
`;
