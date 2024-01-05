export default function Input(props) {
  return (
    <>
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
