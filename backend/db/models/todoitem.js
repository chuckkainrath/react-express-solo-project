'use strict';
module.exports = (sequelize, DataTypes) => {
  const TodoItem = sequelize.define('TodoItem', {
    todoGroupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'TodoGroups' }
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
    TodoItem.belongsTo(models.TodoGroup, { foreignKey: 'todoGroupId', onDelete: 'CASCADE' }); // Delete items when todo group is
  };
  return TodoItem;
};
