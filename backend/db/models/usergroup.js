'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserGroup = sequelize.define('UserGroup', {
    userId: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    groupId: {
      type: DataTypes.NUMBER,
      allowNull: false
    }
  }, {});
  UserGroup.associate = function(models) {
    // associations can be defined here
  };
  return UserGroup;
};
