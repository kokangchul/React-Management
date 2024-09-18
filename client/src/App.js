import React, { useEffect, useState } from "react";
import Customer from "./components/Customer";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

const callApi = async () => {
  const resp = await fetch("/api/customers");
  if (!resp.ok) {
    throw new Error("Network response was not ok");
  }
  const body = await resp.json();
  return body;
};

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 5
      );
    }, 100);
    callApi()
      .then((res) => {
        setCustomers(res);
        clearInterval(intervalId);
        setLoading(false);
      })
      .catch((err) => {
        clearInterval(intervalId);
        setLoading(false);
      });

    return () => clearInterval(intervalId);
  }, []);

  return (
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
          {!loading ? (
            customers.map((c) => (
              <Customer
                key={c.id}
                id={c.id}
                image={c.image}
                name={c.name}
                birthday={c.birthday}
                gender={c.gender}
                job={c.job}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6}>
                <Stack
                  spacing={2}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ height: "100px" }}
                >
                  <CircularProgress variant="determinate" value={progress} />
                </Stack>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default App;
