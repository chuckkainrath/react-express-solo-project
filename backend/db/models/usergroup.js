'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserGroup = sequelize.define('UserGroup', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users' }
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Groups' }
    }
  }, {});
  UserGroup.associate = function(models) {
    UserGroup.belongsTo(models.User, { foreignKey: 'userId' });
    UserGroup.belongsTo(models.Group, { foreignKey: 'groupId' });
  };
  return UserGroup;
};
