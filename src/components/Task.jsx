export default function Task({ task, handleClick, updateHandler }) {
  function handleChange(evt) {
    const isChecked = evt.target.checked
    updateHandler(task.$id, isChecked)
  }

  const completed = task.completed ? 'task-container__text-completed' : null

  return (
    <div className="task-container-inner">
      <h1 className={completed}>{task.title}</h1>
      <p className={completed}> {task.description}</p>
      <p className={completed}>{task.completed ? 'Completed' : 'Complete'} </p>
      <div className="update-task-elem-container">
        <input
          className="complete-task-checkbox"
          type="checkbox"
          onChange={handleChange}
          defaultChecked={task.completed ? true : false}
        />
        <button
          className="delete-button"
          onClick={() => handleClick(task.$id)}
          type="button"
        >
          Delete Task
        </button>
      </div>
    </div>
  )
}
