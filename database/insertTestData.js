const { sequelize, Customer } = require("./index");

// 테스트 데이터
const customersData = [
  {
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "John Doe",
    birthday: "1990-01-01",
    gender: "male",
    job: "engineer",
  },
  {
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Jane Doe",
    birthday: "1985-02-02",
    gender: "female",
    job: "doctor",
  },
  {
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    name: "Alice Smith",
    birthday: "1992-03-03",
    gender: "female",
    job: "teacher",
  },
  {
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    name: "Alice Smith",
    birthday: "1999-03-03",
    gender: "male",
    job: "programer",
  },
];

// Sequelize 동기화 및 테스트 데이터 저장
async function insertTestData() {
  try {
    // 데이터베이스 연결 확인 및 모델 동기화
    await sequelize.sync({ force: false }); // force: true를 사용하면 기존 테이블이 삭제 후 재생성됨

    // Customer 모델에 테스트 데이터 삽입
    await Customer.bulkCreate(customersData);

    console.log("Test data inserted successfully!");
  } catch (error) {
    console.error("Error inserting test data:", error);
  } finally {
    await sequelize.close(); // DB 연결 종료
  }
}

insertTestData();
