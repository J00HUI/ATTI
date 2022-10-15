import * as React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { SvgIconComponent } from "@mui/icons-material";
import SvgIcon from "@mui/material/SvgIcon";
import {
  alpha,
  FormControl,
  FormHelperText,
  InputAdornment,
  OutlinedInputProps,
} from "@mui/material";
import styled from "styled-components";
import { palette } from "../styles/palette";

// 두개가 함께 있을땐 상단 (그 사이) 에 여백을 준다
const Wrapper = styled.div`
  & + & {
    margin-top: 0.1rem;
  }
`;

interface inputInfo {
  name: string;
  placeholder: string;
  icon?: SvgIconComponent;
  type?: string;
  value?: string | number | readonly string[] | undefined;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
  textBool?: boolean;
  helperText?: string;
  sizeBool?:boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

const InputStyle = styled(TextField)(({ theme }) => ({
  backgroundColor: palette.gray_1,
}));

const RedditTextField = styled((props: TextFieldProps) => (
  <TextField
    InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiFilledInput-root": {
    border: "1px solid #e2e2e1",
    borderRadius: 4,
    backgroundColor: palette.gray_1,
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.Mui-focused": {
      backgroundColor: "transparent",
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

// rest 쪽에는 onChange, type, name, value, placeholder 등의 input 에서 사용 하는 값들을 넣어줄수 있다.
const InputWithIcon = ({
  icon,
  placeholder,
  textBool,
  helperText,
  rows,
  sizeBool,
  ...rest
}: inputInfo) => (
  <Wrapper>
    <FormControl sx={{ width: "100%", height: "100%" }}>
      <InputStyle
        InputProps={{
          startAdornment: icon && (
            <InputAdornment position="start">
              <SvgIcon component={icon} inheritViewBox />
            </InputAdornment>
          ),
        }}
        size={sizeBool?"medium":"small"}
        placeholder={placeholder}
        {...rest}
        rows={rows}
        // helperText={helperText ? helperText : " "}
      />
    </FormControl>
    {textBool &&
      (helperText ? (
        <FormHelperText disabled variant="filled">
          {helperText}
        </FormHelperText>
      ) : (
        <p style={{ margin: `21px` }}/>
      ))}
  </Wrapper>
);

export default InputWithIcon;
