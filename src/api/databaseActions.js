import { Client, Databases, ID } from 'appwrite'

import validationSchema from '../schemas/validationSchema'

const client = new Client()
const database = new Databases(client)

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT)

const postToDatabase = async (formData) => {
  try {
    validationSchema.validateSync(formData, { abortEarly: false })
    await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
      completed: false,
      title: formData.taskTitle,
      description: formData.taskDescription,
    })
  } catch (error) {
    let formErrors = []
    if (error.name === 'ValidationError') {
      error.errors.forEach((validationError) => {
        const error = extractFieldAndError(validationError)
        formErrors.push(error)
      })
      throw formErrors
    }
  }
}

function extractFieldAndError(error) {
  const parts = error.split(' ')
  const fieldName = parts.shift()
  const cleanedErrorMessage = parts.join(' ')

  return { fieldName, errorMessage: cleanedErrorMessage }
}

const getTasksFromDatabase = async () => {
  try {
    const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID)
    return response.documents
  } catch (error) {
    console.log(error)
  }
}

const deleteTaskFromDatabase = async (taskId) => {
  try {
    await database.deleteDocument(DATABASE_ID, COLLECTION_ID, taskId)
    return await getTasksFromDatabase()
  } catch (error) {
    console.log(error)
  }
}

const updateTaskFromDatabase = async (taskId, checked) => {
  try {
    await database.updateDocument(DATABASE_ID, COLLECTION_ID, taskId, {
      completed: checked,
    })
    return await getTasksFromDatabase()
  } catch (error) {
    console.log(error)
  }
}

export {
  postToDatabase,
  getTasksFromDatabase,
  deleteTaskFromDatabase,
  updateTaskFromDatabase,
}
