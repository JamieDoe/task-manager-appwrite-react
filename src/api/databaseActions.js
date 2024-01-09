import { ID, Query } from 'appwrite'

import validationSchema from '../schemas/validationSchema'
import { useAppwriteUtils } from '../utils/appwriteConfig'

const { database, DATABASE_ID, COLLECTION_ID } = useAppwriteUtils()

const postToDatabase = async (formData, userId) => {
  try {
    validationSchema.validateSync(formData, { abortEarly: false })
    await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
      completed: false,
      description: formData.taskDescription,
      title: formData.taskTitle,
      userId: userId,
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

const getTasksFromDatabase = async (userId) => {
  try {
    const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('userId', [userId]),
    ])
    return response.documents
  } catch (error) {
    console.log(error)
  }
}

const deleteTaskFromDatabase = async (taskId, userId) => {
  try {
    await database.deleteDocument(DATABASE_ID, COLLECTION_ID, taskId)
    return await getTasksFromDatabase(userId)
  } catch (error) {
    console.log(error)
  }
}

const updateTaskFromDatabase = async (taskId, checked, userId) => {
  try {
    await database.updateDocument(DATABASE_ID, COLLECTION_ID, taskId, {
      completed: checked,
    })
    return await getTasksFromDatabase(userId)
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
