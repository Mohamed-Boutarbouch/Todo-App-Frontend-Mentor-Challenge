/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from 'react';
import FilterButtons from './FilterButtons';

const TaskController = ({ tasks, setList, setFilteredTasks }) => {
  const [taskCounter, setTaskCounter] = useState(tasks.length);
  const [taskStatus, setTaskStatus] = useState('All');

  const activeTasks = tasks.filter((task) => !task?.isChecked);
  const completedTasks = tasks.filter((task) => task.isChecked);

  const filterHandler = () => {
    if (taskStatus === 'Active') {
      return setFilteredTasks(activeTasks);
    }
    if (taskStatus === 'Completed') {
      return setFilteredTasks(completedTasks);
    }

    return setFilteredTasks(tasks);
  };

  useEffect(() => {
    filterHandler();
  }, [tasks, taskStatus]);

  const statusHandler = (e) => {
    setTaskStatus(e.target.outerText);
  };

  const deleteCompletedHandler = () => {
    const uncheckedTasks = tasks.filter((task) => !task?.isChecked);

    setList(uncheckedTasks);
  };

  useEffect(() => {
    const itemsLeft = tasks.filter((task) => !task?.isChecked).length;

    setTaskCounter(itemsLeft);
  }, [tasks]);

  return (
    <div className="control">
      <div className="task-counter">
        <p>
          <span>{taskCounter}&nbsp;</span>
          {taskCounter === 1 ? 'item left' : 'items left'}
        </p>
      </div>
      <FilterButtons statusHandler={statusHandler} />
      <div className="delete-completed">
        <button className="delete-btn" onClick={deleteCompletedHandler}>
          clear completed
        </button>
      </div>
    </div>
  );
};

export default TaskController;
