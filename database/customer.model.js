const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Customer",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      image: {
        type: DataTypes.STRING(1024),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      birthday: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      job: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "Customer",
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
      timestamps: false,
    }
  );
};
