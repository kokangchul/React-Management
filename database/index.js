const Sequelize = require("sequelize");
const Conf = require("./database.json");

const config = {
  host: process.env.CORONABOARD_MYSQL_HOST || Conf.host,
  port: Conf.port,
  database: Conf.database,
  user: Conf.user,
  password: process.env.CORONABOARD_MYSQL_PASSWORD || Conf.password,
};

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: "mysql",
});

module.exports = {
  sequelize,
  Customer: require("./customer.model")(sequelize),
};
