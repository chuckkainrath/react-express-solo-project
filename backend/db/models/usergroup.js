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
    UserGroup.belongsTo(models.User, { foreignKey: 'userId' });
    UserGroup.belongsTo(models.Group, { foreignKey: 'groupId' });
  };
  return UserGroup;
};
