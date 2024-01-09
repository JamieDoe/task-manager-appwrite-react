import { Link } from 'react-router-dom'

import { Form, Input, Button } from '../../components'
import { useAuth } from '../../userContextProvider'

export default function RegisterAccountPage() {
  const { registerUser } = useAuth()

  async function handleSubmit(evt) {
    evt.preventDefault()
    const formData = new FormData(evt.target)
    const formObject = Object.fromEntries(formData)
    try {
      await registerUser(formObject)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="form-container login-container">
      <h1>Register an Account</h1>
      <Form className={'task-form'} handleSubmit={handleSubmit}>
        <Input
          className={'task-input'}
          type={'text'}
          id={'nameInput'}
          name={'nameInput'}
          placeholder={'Your Name'}
          // label={'Password'}
        />
        <Input
          className={'task-input'}
          type={'email'}
          id={'emailInput'}
          name={'emailInput'}
          placeholder={'Your Email'}
          // label={'Password'}
        />
        <Input
          className={'task-input'}
          type={'password'}
          id={'passwordInput'}
          name={'passwordInput'}
          placeholder={'Enter Password'}
          // label={'Password'}
        />
        <Input
          className={'task-input'}
          type={'password'}
          id={'cpasswordInput'}
          name={'cpasswordInput'}
          placeholder={'Confirm Your Password'}
          // label={'Password'}
        />
        <Button className={'submit-button'}>Register</Button>
      </Form>
      <Link to="/login">Already have an Account? Login</Link>
    </div>
  )
}
