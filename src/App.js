import React from "react";
import Customer from "./components/Customer";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 1080,
  },
});

const customers = [
  {
    id: 1,
    image: "https://placeimg.com/64/64/1",
    name: "이상엽",
    birthday: "860212",
    gender: "남자",
    job: "대학생",
  },
  {
    id: 2,
    image: "https://placeimg.com/64/64/2",
    name: "나동빈",
    birthday: "960212",
    gender: "여자",
    job: "프로그래머",
  },
  {
    id: 3,
    image: "https://placeimg.com/64/64/3",
    name: "하하",
    birthday: "960212",
    gender: "남자",
    job: "백수",
  },
];

const App = () => (
  <Paper sx={{ width: "100%", marginTop: 3, overflowX: "auto" }}>
    <Table sx={{ minWidth: 1080 }}>
      <TableHead>
        <TableRow>
          <TableCell>번호</TableCell>
          <TableCell>이미지</TableCell>
          <TableCell>이름</TableCell>
          <TableCell>생년월일</TableCell>
          <TableCell>성별</TableCell>
          <TableCell>직업</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {customers.map((c) => (
          <Customer
            key={c.id}
            id={c.id}
            image={c.image}
            name={c.name}
            birthday={c.birthday}
            gender={c.gender}
            job={c.job}
          />
        ))}
      </TableBody>
    </Table>
  </Paper>
);

export default App;
