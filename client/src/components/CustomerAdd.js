import React, { useState, useCallback } from "react";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  hidden: {
    display: "none",
  },
}));

const CustomerAdd = ({ stateRefresh }) => {
  const classes = useStyles();
  const [user, setUser] = useState({
    file: null,
    fileName: "",
    name: "",
    birthday: "",
    gender: "",
    job: "",
    open: false,
  });

  const handleClickOpen = () => {
    setUser((prev) => ({ ...prev, open: true }));
  };

  const handleClickClose = () => {
    setUser({
      file: null,
      fileName: "",
      name: "",
      birthday: "",
      gender: "",
      job: "",
      open: false,
    });
  };

  const addCustomer = useCallback(() => {
    const url = "/api/customers";
    const formData = new FormData();
    formData.append("image", user.file);
    formData.append("name", user.name);
    formData.append("birthday", user.birthday);
    formData.append("gender", user.gender);
    formData.append("job", user.job);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return axios.post(url, formData, config);
  }, [user]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      addCustomer().then((resp) => {
        console.log(resp.data);
        stateRefresh();
        setUser({
          file: null,
          fileName: "",
          name: "",
          birthday: "",
          gender: "",
          job: "",
          open: false,
        });
      });
    },
    [addCustomer, stateRefresh]
  );

  const handleFileChange = useCallback((e) => {
    setUser((prev) => ({
      ...prev,
      file: e.target.files[0],
      fileName: e.target.value,
    }));
  }, []);

  const handleValueChange = useCallback((e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        고객 추가하기
      </Button>
      <Dialog open={user.open} onClose={handleClickClose}>
        <DialogTitle>고객 추가</DialogTitle>
        <DialogContent>
          <input
            className={classes.hidden}
            accept="image/*"
            id="raised-button-file"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="raised-button-file">
            <Button
              variant="contained"
              color="primary"
              component="span"
              name="file"
            >
              {user.fileName === "" ? "프로필 이미지 선택" : user.fileName}
            </Button>
          </label>
          <br />
          <TextField
            label="이름"
            type="text"
            name="name"
            value={user.name}
            onChange={handleValueChange}
          />
          <br />
          <TextField
            label="생년월일"
            type="text"
            name="birthday"
            value={user.birthday}
            onChange={handleValueChange}
          />
          <br />
          <TextField
            label="성별"
            type="text"
            name="gender"
            value={user.gender}
            onChange={handleValueChange}
          />
          <br />
          <TextField
            label="직업"
            type="text"
            name="job"
            value={user.job}
            onChange={handleValueChange}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={onSubmit}>
            추가
          </Button>
          <Button variant="outlined" color="primary" onClick={handleClickClose}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomerAdd;
