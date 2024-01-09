export default function Input(props) {
  return (
    <>
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      <input
        className={props.className}
        type={props.type}
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
      />
    </>
  )
}
