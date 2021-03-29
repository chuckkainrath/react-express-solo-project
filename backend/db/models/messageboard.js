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
    // associations can be defined here
  };
  return MessageBoard;
};
