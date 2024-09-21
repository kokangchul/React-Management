import axios from "axios";
import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Button, TextField, Typography } from "@mui/material";

const CustomerDelete = ({ id, stateRefresh }) => {
  const [open, setOpen] = useState(false);

  function deleteCustomer(id) {
    const url = "/api/customers/" + id;
    axios.delete(url);
    stateRefresh();
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        삭제
      </Button>
      <Dialog open={open}>
        <DialogTitle onClose={handleClickClose}>삭제 경고</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>선택한 고객 정보가 삭제됩니다.</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => deleteCustomer(id)}
          >
            삭제
          </Button>
          <Button variant="outlined" color="primary" onClick={handleClickClose}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomerDelete;
