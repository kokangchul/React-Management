const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/customers", (req, res) => {
  setTimeout(() => {
    res.send([
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
    ]);
  }, 3000);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
