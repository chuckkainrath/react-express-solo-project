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

  const userGroupMapping = {
    through: 'UserGroup',
    otherKey: 'userId',
    foreignKey: 'groupid'
  };

  const inviteMapping = {
    through: 'Invitation',
    otherKey: 'userId',
    foreignKey: 'groupId'
  };

  Group.associate = function(models) {
    Group.belongsToMany(models.User, userGroupMapping);
    Group.belongsToMany(models.User, inviteMapping);
    Group.hasMany(models.Schedule, { foreignKey: 'groupId' });
    Group.hasMany(models.TodoGroup, { foreignKey: 'groupId' });
    Group.hasMany(models.MessageBoard, { foreignKey: 'groupId' });
  };
  return Group;
};
