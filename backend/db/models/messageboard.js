'use strict';
module.exports = (sequelize, DataTypes) => {
  const MessageBoard = sequelize.define('MessageBoard', {
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Groups' }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users' }
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  MessageBoard.associate = function(models) {
    MessageBoard.belongsTo(models.Group, { foreignKey: 'groupId' });
    MessageBoard.hasMany(models.MessageReply, { foreignKey: 'messageBoardId' });
    MessageBoard.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return MessageBoard;
};
