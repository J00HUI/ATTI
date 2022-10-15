import * as React from "react";
import { Alert, Snackbar } from "@mui/material";

interface inputInfo {
  message: string;
  open: boolean;
  type: "error"|"success";
  setOpen: (value: React.SetStateAction<boolean>) => void;
}

const SnacbarTell = ({ message, open, setOpen, type }: inputInfo) => {
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        key={1}
      >
        <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default SnacbarTell;
