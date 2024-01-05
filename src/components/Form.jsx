import Button from './Button'

export default function Form({ handleSubmit, children }) {
  return (
    <form className="task-form" onSubmit={handleSubmit}>
      {children}
    </form>
  )
}
