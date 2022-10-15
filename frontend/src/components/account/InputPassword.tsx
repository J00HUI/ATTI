import * as React from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { palette } from "../../styles/palette";
import { FormHelperText } from "@mui/material";

interface State {
  showPassword: boolean;
}

interface inputInfo {
  name: string;
  placeholder: string;
  value?: string | number | readonly string[] | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  textBool?: boolean;
  helperText?: string;
}

export default function InputPassword({
  placeholder,
  textBool,
  helperText,
  ...rest
}: inputInfo) {
  const [values, setValues] = React.useState<State>({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div>
      <FormControl sx={{ width: "100%" }}>
        <OutlinedInput
          type={values.showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          size="small"
          placeholder={placeholder}
          {...rest}
          sx={{ bgcolor: `${palette.gray_1}` }}
        />
        {textBool &&
          (helperText ? (
            <FormHelperText disabled variant="filled">
              {" "}
              {helperText}
            </FormHelperText>
          ) : (
            <p style={{ margin: `21px` }}> </p>
          ))}
      </FormControl>
    </div>
  );
}
