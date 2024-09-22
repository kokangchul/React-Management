import React, { useEffect, useState } from "react";
import Customer from "./components/Customer";
import CustomerAdd from "./components/CustomerAdd";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@mui/styles";

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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minWidth: 1080,
  },
  paper: {
    marginLeft: 18,
    marginRight: 18,
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: "flex",
    justifyContent: "center",
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const App = () => {
  const classes = useStyles();
  const [customers, setCustomers] = useState([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const cellList = [
    "번호",
    "이미지",
    "이름",
    "생년월일",
    "성별",
    "직업",
    "설정",
  ];

  const stateRefresh = () => {
    setCustomers([]);
    setSearchKeyword("");
    setProgress(0);
    setLoading(true);
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
  };

  const handleValueChange = (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);
  };

  useEffect(() => {
    stateRefresh();
  }, []);

  const filteredComponents = (data) => {
    data = data.filter((c) => c.name.indexOf(searchKeyword) > -1);
    return data.map((c) => {
      return (
        <Customer
          stateRefresh={stateRefresh}
          key={c.id}
          id={c.id}
          image={c.image}
          name={c.name}
          birthday={c.birthday}
          gender={c.gender}
          job={c.job}
        />
      );
    });
  };

  return (
    <div sx={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            고객 관리 시스템
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="검색하기"
              inputProps={{ "aria-label": "search" }}
              name="searchKeyword"
              value={searchKeyword}
              onChange={handleValueChange}
            />
          </Search>
        </Toolbar>
      </AppBar>
      <div className={classes.menu}>
        <CustomerAdd stateRefresh={stateRefresh} />
      </div>
      <Paper className={classes.paper}>
        <Table sx={{ minWidth: 1080 }}>
          <TableHead>
            <TableRow>
              {cellList.map((c) => {
                return <TableCell className={classes.tableHead}>{c}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading ? (
              filteredComponents(customers)
            ) : (
              <TableRow>
                <TableCell colSpan={7}>
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
    </div>
  );
};

export default App;
