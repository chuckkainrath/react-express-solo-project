import { csrfFetch } from './csrf';
import { flattenGroups } from './utils';
import cloneDeep from 'clone-deep';

const GROUPS_EMPTY = 'GROUPS_EMPTY';
const GROUP_CREATE = 'GROUP_CREATE';
const GROUP_GET_ALL = 'GROUP_GET_ALL';
const TODO_GROUP_CREATE = 'TODO_GROUP_CREATE';
const TODO_TASK_CREATE = 'TODO_TASK_CREATE';
const TODO_TASK_EDIT = 'TODO_TASK_EDIT';
const TODO_TASK_DELETE = 'TODO_TASK_DELETE';
const TODO_GROUP_DELETE = 'TODO_GROUP_DELETE';
const MSG_REPLY_CREATE = 'MSG_REPLY_CREATE';
const MSG_CREATE = 'MSG_CREATE';


export const emptyGroups = () => ({
  type: GROUPS_EMPTY,
})

const createMessageAction = (message, groupIdx) => ({
  type: MSG_CREATE,
  message,
  groupIdx
})

const createMessageReplyAction = (reply, groupIdx, messageIdx) => ({
  type: MSG_REPLY_CREATE,
  reply,
  messageIdx,
  groupIdx,
});

const deleteTaskGroupAction = (todoGroupId, groupIdx) => ({
  type: TODO_GROUP_DELETE,
  groupIdx,
  todoGroupId
});

const createGroupAction = group => ({
  type: GROUP_CREATE,
  group
});

const getGroupsAction = groups => ({
  type: GROUP_GET_ALL,
  groups
});

const createTodoGroup = (todoGroup, groupIdx) => ({
  type: TODO_GROUP_CREATE,
  todoGroup,
  groupIdx,
})

const createTodoTask = (task, groupIdx) => ({
  type: TODO_TASK_CREATE,
  task,
  groupIdx,
});

const editTaskComplete = (task, groupIdx) => ({
  type: TODO_TASK_EDIT,
  task,
  groupIdx
});

const deleteTaskAction = (task, groupIdx) => ({
  type: TODO_TASK_DELETE,
  task,
  groupIdx
});

export const createMessage = ({groupIdx, groupId, message, title}) => async dispatch => {
  const options = {
    method: 'POST',
    body: JSON.stringify({groupId, message, title})
  }
  const res = await csrfFetch('/api/message-boards', options);
  const msgRes = await res.json();
  const newMsg = {
    id: msgRes.message.id,
    userId: msgRes.message.userId,
    groupId: msgRes.message.groupId,
    title: msgRes.message.title,
    message: msgRes.message.message
  };
  dispatch(createMessageAction(newMsg, groupIdx));
}

export const createMessageReply = ({messageBoardId, reply, groupIdx, messageIdx}) => async dispatch => {
  const options = {
    method: 'POST',
    body: JSON.stringify({messageBoardId, reply})
  };
  const res = await csrfFetch('/api/message-replies', options);
  const replyRes = await res.json();
  const newReply = {
    id: replyRes.reply.id,
    userId: replyRes.reply.userId,
    messageBoardId: replyRes.reply.messageBoardId,
    reply: replyRes.reply.reply,
  }
  dispatch(createMessageReplyAction(newReply, groupIdx, messageIdx));
}

export const createGroup = ({ groupName }) => async dispatch => {
  const options = {
    method: 'POST',
    body: JSON.stringify({name: groupName})
  };
  const res = await csrfFetch('/api/groups', options);
  const groupRes = await res.json();
  const group = { name: groupRes.group.name, ownerId: groupRes.group.ownerId, id: groupRes.group.id };
  dispatch(createGroupAction(group));
}

export const getGroups = () => async dispatch => {
  const res = await csrfFetch('/api/groups');
  const groupsRes = await res.json();
  const groups = flattenGroups(groupsRes);
  console.log('GETTING GROUPs ', groups);
  dispatch(getGroupsAction(groups));
  return groups;
}

export const addTodoGroup = ({title, groupId, groupIdx}) => async dispatch => {
  const options = {
    method: 'POST',
    body: JSON.stringify({title, groupId})
  }
  const res = await csrfFetch('/api/todo-groups', options);
  const todoRes = await res.json();
  // Flatten todoGroup before dispatching
  const todoGroup = {
    id: todoRes.todoGroup.id,
    completed: false,
    groupId: todoRes.todoGroup.groupId,
    title: todoRes.todoGroup.title
  }
  dispatch(createTodoGroup(todoGroup, groupIdx));
  return todoGroup;
}

export const addTodoTask = ({todoGroupId, groupId, groupIdx, task}) => async dispatch => {
  const options = {
    method: 'POST',
    body: JSON.stringify({todoGroupId, groupId, task})
  };
  const res = await csrfFetch('/api/todo-items', options);
  const taskRes = await res.json();
  const newTask = {
    id: taskRes.todoItem.id,
    todoGroupId: taskRes.todoItem.todoGroupId,
    completed: false,
    task: taskRes.todoItem.task
  }
  dispatch(createTodoTask(newTask, groupIdx))
}

export const editTodoTask = ({task, groupIdx, completed}) => async dispatch => {
  const options = {
    method: 'PUT',
    body: JSON.stringify({task: task.task, completed})
  }
  const res = await csrfFetch(`/api/todo-items/${task.id}`, options);
  const taskRes = await res.json();
  const newTask = {
    id: taskRes.todoItem.id,
    todoGroupId: taskRes.todoItem.todoGroupId,
    completed: taskRes.todoItem.completed,
    task: taskRes.todoItem.task
  }
  console.log(newTask);
  dispatch(editTaskComplete(newTask, groupIdx))
}

export const deleteTask = ({task, groupIdx}) => async dispatch => {
  const options = {
    method: 'DELETE',
  }
  console.log(task);
  await csrfFetch(`/api/todo-items/${task.id}`, options);
  dispatch(deleteTaskAction(task, groupIdx));
}

export const deleteTaskGroup = ({taskGroupId, groupIdx}) => async dispatch => {
  const options = {
    method: 'DELETE'
  }
  await csrfFetch(`/api/todo-groups/${taskGroupId}`, options);
  dispatch(deleteTaskGroupAction(taskGroupId, groupIdx));
}

const initialState = {
  groups: [],
  schedules: [],
  messageBoards: [],
  messageReplies: [],
  todoGroups: [],
  todoItems: [],
};

const groupReducer = (state = initialState, action) => {
  let newState, todoGroups, taskGroupIdx, itemGroup, item;
  switch (action.type) {
    case GROUPS_EMPTY:
      newState = cloneDeep(initialState);
      return newState;
    case GROUP_CREATE:
      newState = cloneDeep(state);
      newState.groups.push(action.group);
      newState.schedules.push([]);
      newState.messageBoards.push([]);
      newState.messageReplies.push([]);
      newState.todoGroups.push([]);
      newState.todoItems.push([]);
      return newState;
    case GROUP_GET_ALL:
      return action.groups;
    case TODO_GROUP_CREATE:
      newState = cloneDeep(state);
      newState.todoGroups[action.groupIdx].push(action.todoGroup);
      newState.todoItems[action.groupIdx].push([]);
      return newState;
    case TODO_TASK_CREATE:
      newState = cloneDeep(state);
      todoGroups = newState.todoGroups[action.groupIdx];
      todoGroups.forEach((grp, idx) => {
        if (grp.id === action.task.todoGroupId) taskGroupIdx = idx;
      })
      newState.todoItems[action.groupIdx][taskGroupIdx].push(action.task);
      return newState;
    case TODO_TASK_EDIT:
      newState = cloneDeep(state);
      todoGroups = newState.todoGroups[action.groupIdx];
      todoGroups.forEach((grp, idx) => {
        if (grp.id === action.task.todoGroupId) taskGroupIdx = idx;
      });
      itemGroup = newState.todoItems[action.groupIdx][taskGroupIdx];
      item = itemGroup.find(itm => itm.id === action.task.id);
      item.completed = action.task.completed;
      item.task = action.task.task;
      item.id = action.task.id;
      item.todoGroupId = action.task.todoGroupId;
      return newState;
    case TODO_TASK_DELETE:
      newState = cloneDeep(state);
      todoGroups = newState.todoGroups[action.groupIdx];
      todoGroups.forEach((grp, idx) => {
        if (grp.id === action.task.todoGroupId) taskGroupIdx = idx;
      });
      itemGroup = newState.todoItems[action.groupIdx][taskGroupIdx];
      let itemIdx;
      itemGroup.forEach((itm, idx) => {
        if (itm.id === action.task.id) itemIdx = idx;
      });
      itemGroup.splice(itemIdx, 1);
      return newState;
    case TODO_GROUP_DELETE:
      newState = cloneDeep(state);
      todoGroups = newState.todoGroups[action.groupIdx];
      let todoGroupIdx;
      todoGroups.forEach((grp, idx) => {
        if (grp.id === action.todoGroupId) todoGroupIdx = idx;
      })
      todoGroups.splice(todoGroupIdx, 1);
      newState.todoItems[action.groupIdx].splice(todoGroupIdx, 1);
      return newState;
    case MSG_REPLY_CREATE:
      newState = cloneDeep(state);
      let msgReplies = newState.messageReplies[action.groupIdx][action.messageIdx];
      msgReplies.push(action.reply);
      return newState;
    case MSG_CREATE:
      newState = cloneDeep(state);
      newState.messageBoards[action.groupIdx].push(action.message);
      newState.messageReplies[action.groupIdx].push([]);
      return newState;
    default:
      return state;
  }
}

export default groupReducer;
