import * as yup from 'yup'

const registerValidationSchema = yup.object().shape({
  nameInput: yup.string().required('nameInput Your Name is required'),
  emailInput: yup
    .string()
    .email('emailInput Invalid Email')
    .required('emailInput Email is required!'),
  passwordInput: yup.string().required('passwordInput A Password is Required!'),
  cpasswordInput: yup
    .string()
    .oneOf([yup.ref('passwordInput'), null], 'Passwords must match'),
})

export default registerValidationSchema
