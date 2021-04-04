// import { User, Group, TodoGroup, TodoItem, Schedule, MessageBoard, MessageReply } from '../../../backend/db/models';

export const flattenGroups = groups => {
  const flattenedGroups = {
    groups: [],
    schedules: [],
    messageBoards: [],
    messageReplies: [],
    todoGroups: [],
    todoItems: []
  };
  groups.forEach(group => {
    const groupData = {name: group.name, ownerId: group.ownerId, id: group.id};
    flattenedGroups.groups.push(groupData);
    const schedules = [];
    // WORK ON SCHEDULES LATER
    flattenedGroups.schedules.push(schedules);
    const todoGroups = [];
    const todoItems = [];
    group.TodoGroups.forEach(todoGroup => {
      const todoGrp = {
        id: todoGroup.id,
        completed: todoGroup.completed,
        groupId: todoGroup.groupId,
        title: todoGroup.title,
      };
      todoGroups.push(todoGrp);
      const todoItms = [];
      todoGroup.TodoItems.forEach(item => {
        const todoItm = {
          completed: item.completed,
          id: item.id,
          task: item.task,
          todoGroupId: item.todoGroupId,
        }
        todoItms.push(todoItm);
      });
      todoItems.push(todoItms);
    });
    flattenedGroups.todoGroups.push(todoGroups);
    flattenedGroups.todoItems.push(todoItems);
    const messageBoards = [];
    const messageReplies = [];
    group.MessageBoards.forEach(msgBoard => {
      const msg = {
        id: msgBoard.id,
        groupId: msgBoard.groupId,
        message: msgBoard.message,
        userId: msgBoard.userId,
        username: msgBoard.User.username,
        title: msgBoard.title
      };
      messageBoards.push(msg);
      const msgReplies = [];
      msgBoard.MessageReplies.forEach(msgReply => {
        const reply = {
          id: msgReply.id,
          messageBoardId: msgReply.messageBoardId,
          reply: msgReply.reply,
          userId: msgReply.userId,
          username: msgReply.User.username,
        }
        msgReplies.push(reply);
      });
      messageReplies.push(msgReplies);
    });
    flattenedGroups.messageBoards.push(messageBoards);
    flattenedGroups.messageReplies.push(messageReplies);
  });
  return flattenedGroups;
}
