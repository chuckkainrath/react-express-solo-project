'use strict';
module.exports = (sequelize, DataTypes) => {
  const TodoItem = sequelize.define('TodoItem', {
    todoGroupId: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    task: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false
    }
  }, {});
  TodoItem.associate = function(models) {
    TodoItem.belongsTo(models.TodoGroup, { foreignKey: 'todoGroupId', onDelete: 'CASCADE' }); // Delete items when todo group is deleted.
  };
  return TodoItem;
};
