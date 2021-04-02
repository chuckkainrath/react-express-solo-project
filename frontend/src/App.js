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
import SchedulePage from './components/FunctionalComponents/SchedulePage';
import { getGroups } from './store/group';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .then(user => {
        //return dispatch(getGroups());
        console.log('USER ', user);
        if (user) {
          console.log('Getting groups');
          return dispatch(getGroups());
        }
        return;
      })
      .then(() => setIsLoaded(true))
      .then(() => {
        const script = document.createElement('script');
        script.src = "https://kit.fontawesome.com/ad7731e00b.js";
        document.head.appendChild(script);
      });
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
          <Route path='/groups/:groupIdx/schedule'>
            <SchedulePage />
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
