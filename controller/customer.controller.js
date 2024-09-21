const { Customer } = require("../database");
const { wrapWithErrorHandler } = require("../util");

async function getAll(req, res) {
  const result = await Customer.findAll({ where: { isDeleted: 0 } });
  res.status(200).json(result);
}

async function insert(req, res) {
  const { name, birthday, gender, job } = req.body;
  const imagePath = req.file ? "/image/" + req.file.filename : null;

  await Customer.create({
    name: name,
    birthday: birthday,
    gender: gender,
    job: job,
    image: imagePath,
    isDeleted: 0,
    createdDate: new Date(),
  });

  res.status(200).json({ result: "successs" });
}

async function remove(req, res) {
  const customerId = req.params.id;
  await Customer.destroy({ where: { id: customerId } });
  res.status(200).json({ result: "successs" });
}

module.exports = wrapWithErrorHandler({
  getAll,
  insert,
  remove,
});
