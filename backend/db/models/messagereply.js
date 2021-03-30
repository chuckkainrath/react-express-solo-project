'use strict';
module.exports = (sequelize, DataTypes) => {
  const MessageReply = sequelize.define('MessageReply', {
    messageBoardId: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    userId: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    reply: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  MessageReply.associate = function(models) {
    MessageReply.belongsTo(models.MessageBoard, { foreignKey: 'messageBoardId', onDelete: 'CASCADE' });
    MessageReply.belongsTo(models.User, { foriegnKey: 'userId' });
  };
  return MessageReply;
};
