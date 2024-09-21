const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express();
const { sequelize } = require("./database");
const customerController = require("./controller/customer.controller");
const port = process.env.PORT || 5000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Not an image! Please upload an image file."), false);
    }
  },
});

async function launchServer() {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/image", express.static("./upload"));

  app.get("/api/customers", (req, res) => {
    setTimeout(() => {
      customerController.getAll(req, res);
    }, 3000);
  });
  app.post("/api/customers", upload.single("image"), (req, res) => {
    console.log(req.body);
    customerController.insert(req, res);
  });

  try {
    await sequelize.sync();
    console.log("Database is ready!");
  } catch (error) {
    console.log("Unable to connect to the database: ");
    console.log(error);
    process.exit(1);
  }

  app.listen(port, () => console.log(`Listening on port ${port}`));
}

launchServer();
