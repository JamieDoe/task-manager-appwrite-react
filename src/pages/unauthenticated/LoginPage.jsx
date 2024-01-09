import { Link } from 'react-router-dom'
import { Button, Form, Input, Header } from '../../components'
import { useAuth } from '../../userContextProvider'

// import { motion, useScroll } from 'framer-motion'

export default function LoginPage() {
  // const { scrollYProgress } = useScroll()
  const { loginUser } = useAuth()

  async function handleSubmit(evt) {
    evt.preventDefault()
    const formData = new FormData(evt.target)
    const formObject = Object.fromEntries(formData)
    try {
      await loginUser(formObject)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Header className="page-header">
        <div className="logo">
          <h3>TaskManager</h3>
        </div>
      </Header>
      <div className="login-page-container">
        {/* <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      /> */}
        <div
          className="form-container login-container"
          style={{ padding: '0 20px' }}
        >
          <h1>Login</h1>
          <Form className={'task-form'} handleSubmit={handleSubmit}>
            <Input
              className={'task-input'}
              type={'email'}
              id={'emailInput'}
              name={'emailInput'}
              placeholder={'Email'}
              // label={'Email'}
            />
            <Input
              className={'task-input'}
              type={'password'}
              id={'passwordInput'}
              name={'passwordInput'}
              placeholder={'Password'}
              // label={'Password'}
            />
            <Button className={'submit-button'}>Login</Button>
          </Form>
          <Link to="/register">Register </Link>
        </div>
      </div>
    </>
  )
}
