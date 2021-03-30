'use strict';
module.exports = (sequelize, DataTypes) => {
  const TodoGroup = sequelize.define('TodoGroup', {
    groupId: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false
    }
  }, {});
  TodoGroup.associate = function(models) {
    TodoGroup.belongsTo(models.Group, { foreignKey: 'groupId' });
    TodoGroup.hasMany(models.TodoItems, { foreignKey: 'todoGroupId' });
  };
  return TodoGroup;
};
