import { useEffect, useState } from 'react'

import {
  postToDatabase,
  getTasksFromDatabase,
  deleteTaskFromDatabase,
  updateTaskFromDatabase,
} from './api/databaseActions'
import Task from './components/Task'
import './style.scss'
import Loader from './components/Loader'
import Form from './components/Form'
import Input from './components/Input'
import Textarea from './components/Textarea'
import Button from './components/Button'

function App() {
  const [tasks, setTasks] = useState([])
  const [formErrors, setFormErrors] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchTasks() {
      setIsLoading(true)
      const response = await getTasksFromDatabase()
      setTasks(response)
      setIsLoading(false)
    }

    fetchTasks()
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
      await postToDatabase(formObject)
      setFormErrors([])
      const response = await getTasksFromDatabase()
      setTasks(response)
      evt.target.reset()
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setFormErrors(error)
    }
  }

  async function handleClick(taskId) {
    setIsLoading(true)
    const response = await deleteTaskFromDatabase(taskId)
    setTasks(response)
    setIsLoading(false)
  }

  async function updateHandler(taskId, isChecked) {
    setIsLoading(true)
    const response = await updateTaskFromDatabase(taskId, isChecked)
    setTasks(response)
    setIsLoading(false)
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className="form-container">
        <Form handleSubmit={handleSubmit}>
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
          <Button type="submit" className="submit-button" text="Add Task" />
        </Form>
      </div>
      <div className="task-container">
        {tasks.length > 0 &&
          tasks.map((task) => {
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

export default App
