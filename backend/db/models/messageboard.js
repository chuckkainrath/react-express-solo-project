'use strict';
module.exports = (sequelize, DataTypes) => {
  const MessageBoard = sequelize.define('MessageBoard', {
    groupId: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    userId: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  MessageBoard.associate = function(models) {
    MessageBoard.belongsTo(models.Group, { foreignKey: 'groupId' });
    MessageBoard.hasMany(models.MessageReply, { foreignKey: 'messageBoardId' });
    MessageBoard.belongsTo(models.User, { foriegnKey: 'userId' });
  };
  return MessageBoard;
};
