'use strict';
module.exports = (sequelize, DataTypes) => {
  const Invitation = sequelize.define('Invitation', {
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Groups' }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users' }
    }
  }, {});
  Invitation.associate = function(models) {
    Invitation.belongsTo(models.User, { foreignKey: 'userId' });
    Invitation.belongsTo(models.Group, { foreignKey: 'groupId' });
  };
  return Invitation;
};
