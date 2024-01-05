import * as yup from 'yup'

const validationSchema = yup.object().shape({
  taskTitle: yup.string().required('taskTitle Task title is required'),
  taskDescription: yup
    .string()
    .required('taskDescription Task Description is required'),
})

export default validationSchema
