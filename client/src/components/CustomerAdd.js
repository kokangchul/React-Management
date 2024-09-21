import React, { useState, useCallback } from "react";
import axios from "axios";

const CustomerAdd = ({ stateRefresh }) => {
  const [user, setUser] = useState({
    file: null,
    fileName: "",
    name: "",
    birthday: "",
    gender: "",
    job: "",
  });
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
    <form onSubmit={onSubmit}>
      <h1>고객추가</h1>
      프로필 이미지:
      <input type="file" name="file" onChange={handleFileChange} />
      <br />
      이름:
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleValueChange}
      />
      <br />
      생년월일:
      <input
        type="text"
        name="birthday"
        value={user.birthday}
        onChange={handleValueChange}
      />
      <br />
      성별:
      <input
        type="text"
        name="gender"
        value={user.gender}
        onChange={handleValueChange}
      />
      <br />
      직업:
      <input
        type="text"
        name="job"
        value={user.job}
        onChange={handleValueChange}
      />
      <br />
      <button type="submit">추가하기</button>
    </form>
  );
};

export default CustomerAdd;
