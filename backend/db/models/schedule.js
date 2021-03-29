'use strict';
module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('Schedule', {
    groupId: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {});
  Schedule.associate = function(models) {
    // associations can be defined here
  };
  return Schedule;
};
