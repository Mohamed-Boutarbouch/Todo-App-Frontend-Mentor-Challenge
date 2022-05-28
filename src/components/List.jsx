/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */

const List = ({ tasks, setList, filteredTasks }) => {
  const deleteTask = (id) => {
    const gg = tasks.filter((task) => task.id !== id);

    setList(gg);
  };

  const checkHandler = (e) => {
    const { name, checked } = e.target;

    const checkTask = tasks.map((task) =>
      task.taskName === name ? { ...task, isChecked: checked } : task,
    );
    setList(checkTask);
  };

  return (
    <section className="todo-list">
      {filteredTasks.map((task) => {
        const { id, taskName } = task;
        return (
          <article key={id} className="todo-item">
            <div className="item-control">
              <input
                className="task-checkbox"
                id="checkbox"
                type="checkbox"
                name={taskName}
                checked={task?.isChecked || false}
                onChange={checkHandler}
              />
              <label htmlFor="checkbox" className="task-name">
                {taskName}
              </label>
            </div>
            <button className="delete hover-reveal" onClick={() => deleteTask(id)}>
              <svg width="18" height="18">
                <path
                  fill="#494C6B"
                  d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
                />
              </svg>
            </button>
          </article>
        );
      })}

    </section>
  );
};

export default List;
