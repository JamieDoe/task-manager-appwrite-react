export default function Textarea(props) {
  return (
    <>
      <textarea
        className={props.className}
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
      />
    </>
  )
}
