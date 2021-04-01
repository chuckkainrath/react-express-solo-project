import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import Navigation from './components/Navigation';
import GroupsWrapper from './components/MainComponents/GroupsWrapper';
import GroupPage from './components/GroupPageComponents/GroupPage';
import TodoPage from './components/FunctionalComponents/TodoPage';
import * as sessionActions from './store/session';
import MessageBoardPage from './components/FunctionalComponents/MessageBoardPage';
import MessagePage from './components/FunctionalComponents/MessagePage';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path='/signup'>
            <SignUpForm />
          </Route>
          <Route exact path='/'>
            <GroupsWrapper />
          </Route>
          <Route path='/groups/:groupIdx/message-board/:messageIdx'>
            <MessagePage />
          </Route>
          <Route path='/groups/:groupIdx/message-board'>
            <MessageBoardPage />
          </Route>
          <Route path='/groups/:groupIdx/todo-list'>
            <TodoPage />
          </Route>
          <Route path='/groups/:groupIdx'>
            <GroupPage />
          </Route>
          <Route>
            <p>No route found</p>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
