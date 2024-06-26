"use strict";
const { Model } = require("sequelize");
const TypePriorityEnum = require("@root/enums/TypePriorityEnum");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsToMany(models.User, {
        through: models.TaskUser,
        sourceKey: "id_task",
        foreignKey: "id_task",
        as: "members",
      });
      Task.hasMany(models.TaskArtefact, {
        sourceKey: "id_task",
        foreignKey: "id_task",
        as: "artefacts",
      });
      Task.hasOne(models.Status, {
        sourceKey: "id_status",
        foreignKey: "id_status",
        as: "status",
      });
    }
  }
  Task.init(
    {
      id_task: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      ds_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ds_description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dh_created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      tp_priority: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: TypePriorityEnum.UNKNOW,
      },
      id_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: -1,
      },
      dh_limit: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Task",
      tableName: "tasks",
      timestamps: false,
    }
  );
  return Task;
};
