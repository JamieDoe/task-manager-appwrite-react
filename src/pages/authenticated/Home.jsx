import { useEffect, useState } from 'react'

import {
  postToDatabase,
  getTasksFromDatabase,
  deleteTaskFromDatabase,
  updateTaskFromDatabase,
} from '../../api/databaseActions'
import {
  Task,
  Loader,
  Form,
  Input,
  Textarea,
  Button,
  Header,
} from '../../components'
import { useAuth } from '../../userContextProvider'

export default function Home() {
  const { user, logoutUser } = useAuth()

  const [tasks, setTasks] = useState([])
  const [formErrors, setFormErrors] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchTasks() {
      setIsLoading(true)
      try {
        const response = await getTasksFromDatabase(user.$id)
        setTasks(response)
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false)
    }

    fetchTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleSubmit(evt) {
    evt.preventDefault()
    const formData = new FormData(evt.target)

    const formObject = {}
    formData.forEach((value, key) => {
      formObject[key] = value
    })
    try {
      setIsLoading(true)
      const response = await postToDatabase(formObject, user.$id)
      setTasks(response)
      setFormErrors([])
      evt.target.reset()
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setFormErrors(error)
    }
  }

  async function handleClick(taskId) {
    setIsLoading(true)
    const response = await deleteTaskFromDatabase(taskId, user.$id)
    setTasks(response)
    setIsLoading(false)
  }

  async function updateHandler(taskId, isChecked) {
    setIsLoading(true)
    const response = await updateTaskFromDatabase(taskId, isChecked, user.$id)
    setTasks(response)
    setIsLoading(false)
  }

  async function logoutHandler() {
    logoutUser()
  }

  return (
    <>
      {isLoading && <Loader />}
      <Header className="page-header">
        <div className="logo">
          <h3>TaskManager</h3>
        </div>
        <Button
          className="logout-button"
          onClick={logoutHandler}
          type={'button'}
        >
          Logout
        </Button>
      </Header>
      <div className="form-container">
        <div>
          <h1>Add a Task</h1>
        </div>
        <Form className={'task-form'} handleSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="titleInput">Enter Task Title</label>
            <Input
              className={'task-input'}
              type={'text'}
              id={'titleInput'}
              name={'taskTitle'}
              placeholder={'Task Title'}
              labelText={'Enter Task Title'}
              errors={formErrors}
            />
          </div>
          <div className="input-container">
            <label htmlFor="taskInput">Enter Task Description</label>
            <Textarea
              className={'task-input'}
              id={'taskInput'}
              name={'taskDescription'}
              placeholder={'Task Description'}
              labelText={'Enter Task Description'}
              errors={formErrors}
            />
          </div>
          <Button type="submit" className="submit-button">
            Add Task
          </Button>
        </Form>
        <div>
          <div className="divider" />
        </div>
      </div>
      <div className="task-container">
        {tasks.length > 0 && <h1>Your Tasks</h1>}
        {tasks.map((task) => {
          return (
            <Task
              key={task.$id}
              handleClick={handleClick}
              updateHandler={updateHandler}
              task={task}
            />
          )
        })}
      </div>
    </>
  )
}
