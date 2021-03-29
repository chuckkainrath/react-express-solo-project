'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    ownerId: {
      type: DataTypes.NUMBER,
      allowNull: false
    }
  }, {});
  Group.associate = function(models) {
    // associations can be defined here
  };
  return Group;
};
