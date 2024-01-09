import { Link, Navigate } from 'react-router-dom'
import { Button, Form, Input } from '../../components'
import { useAuth } from '../../userContextProvider'

import { motion, useScroll } from 'framer-motion'

export default function LoginPage() {
  const { scrollYProgress } = useScroll()
  const { loginUser, isAuth } = useAuth()

  if (isAuth) {
    return <Navigate to="/" />
  }

  async function handleSubmit(evt) {
    evt.preventDefault()
    const formData = new FormData(evt.target)
    const formObject = Object.fromEntries(formData)
    try {
      await loginUser(formObject)
      return <Navigate to="/" />
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="login-page-container">
      <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />
      <div className="form-container login-container">
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
          <Button className={'submit-button'} text={'Login'} />
        </Form>
        <Link to="/register">Register </Link>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eaque
          cumque cupiditate a molestias iste illo consequatur quos ratione odit
          obcaecati perferendis, facere alias soluta beatae aperiam debitis
          excepturi dolorem.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eaque
          cumque cupiditate a molestias iste illo consequatur quos ratione odit
          obcaecati perferendis, facere alias soluta beatae aperiam debitis
          excepturi dolorem.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eaque
          cumque cupiditate a molestias iste illo consequatur quos ratione odit
          obcaecati perferendis, facere alias soluta beatae aperiam debitis
          excepturi dolorem.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eaque
          cumque cupiditate a molestias iste illo consequatur quos ratione odit
          obcaecati perferendis, facere alias soluta beatae aperiam debitis
          excepturi dolorem.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eaque
          cumque cupiditate a molestias iste illo consequatur quos ratione odit
          obcaecati perferendis, facere alias soluta beatae aperiam debitis
          excepturi dolorem.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eaque
          cumque cupiditate a molestias iste illo consequatur quos ratione odit
          obcaecati perferendis, facere alias soluta beatae aperiam debitis
          excepturi dolorem.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eaque
          cumque cupiditate a molestias iste illo consequatur quos ratione odit
          obcaecati perferendis, facere alias soluta beatae aperiam debitis
          excepturi dolorem.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eaque
          cumque cupiditate a molestias iste illo consequatur quos ratione odit
          obcaecati perferendis, facere alias soluta beatae aperiam debitis
          excepturi dolorem.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eaque
          cumque cupiditate a molestias iste illo consequatur quos ratione odit
          obcaecati perferendis, facere alias soluta beatae aperiam debitis
          excepturi dolorem.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eaque
          cumque cupiditate a molestias iste illo consequatur quos ratione odit
          obcaecati perferendis, facere alias soluta beatae aperiam debitis
          excepturi dolorem.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eaque
          cumque cupiditate a molestias iste illo consequatur quos ratione odit
          obcaecati perferendis, facere alias soluta beatae aperiam debitis
          excepturi dolorem.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eaque
          cumque cupiditate a molestias iste illo consequatur quos ratione odit
          obcaecati perferendis, facere alias soluta beatae aperiam debitis
          excepturi dolorem.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eaque
          cumque cupiditate a molestias iste illo consequatur quos ratione odit
          obcaecati perferendis, facere alias soluta beatae aperiam debitis
          excepturi dolorem.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eaque
          cumque cupiditate a molestias iste illo consequatur quos ratione odit
          obcaecati perferendis, facere alias soluta beatae aperiam debitis
          excepturi dolorem.
        </p>
      </div>
    </div>
  )
}
