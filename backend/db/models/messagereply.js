'use strict';
module.exports = (sequelize, DataTypes) => {
  const MessageReply = sequelize.define('MessageReply', {
    messageBoardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'MessageBoards' }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users' }
    },
    reply: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  MessageReply.associate = function(models) {
    MessageReply.belongsTo(models.MessageBoard, { foreignKey: 'messageBoardId', onDelete: 'CASCADE' });
    MessageReply.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return MessageReply;
};
