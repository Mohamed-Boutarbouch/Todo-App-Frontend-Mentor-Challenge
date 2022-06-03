/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import List from './components/List';
import lightThemeIcon from './images/icon-sun.svg';
import darkThemeIcon from './images/icon-moon.svg';

import TaskController from './components/TaskController';

const getLocalStorage = () => {
  const list = localStorage.getItem('TASKS');
  if (list) {
    return JSON.parse(localStorage.getItem('TASKS'));
  }
  return [];
};

const getStorageTheme = () => {
  let theme = 'dark-theme';
  if (localStorage.getItem('theme')) {
    theme = localStorage.getItem('theme');
  }
  return theme;
};

const App = () => {
  const [theme, setTheme] = useState(getStorageTheme);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [list, setList] = useState(getLocalStorage());

  const toggleTheme = () => {
    if (theme === 'light-theme') {
      setTheme('dark-theme');
    } else {
      setTheme('light-theme');
    }
  };

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem('TASKS', JSON.stringify(list));
  }, [list]);

  const submitHandler = (e) => {
    e.preventDefault();

    const trimmedInput = taskName.trim();
    const trimmedInputLength = taskName.trim().length;

    if (trimmedInputLength === 0) {
      console.log('Please Enter a Valid value');
      return;
    }

    const newTask = { id: new Date().getTime().toString(), taskName: trimmedInput };

    setList([...list, newTask]);

    setTaskName('');
  };

  const tskName = (e) => {
    setTaskName(e.target.value);
  };

  return (
    <section className="section-center">
      <div className="container">
        <header className="header">
          <h1 className="logo-text">Todo</h1>
          <button className="toggle-theme" onClick={toggleTheme}>
            {theme === 'dark-theme' && <img src={lightThemeIcon} alt="light mode" />}
            {theme === 'light-theme' && <img src={darkThemeIcon} alt="light mode" />}
          </button>
        </header>
        <main>
          <form className="todo-form" onSubmit={submitHandler}>
            <div className="user-input">
              <button className="btn" />
              <input
                type="text"
                placeholder="Create a new todo..."
                className="input"
                value={taskName}
                onChange={tskName}
              />
            </div>
          </form>
          <List tasks={list} setList={setList} filteredTasks={filteredTasks} />

          <TaskController tasks={list} setList={setList} setFilteredTasks={setFilteredTasks} />
        </main>
      </div>
    </section>
  );
};

export default App;
