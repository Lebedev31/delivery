import "./InputComponent.scss";

interface PropsStyleInput {
  props?: {
    [key: string]: string;
  };
  placeholder?: string;
  id?: string;
}

function InputComponent({
  props = {},
  placeholder = "",
  id = "",
}: PropsStyleInput) {
  return (
    <>
      <input
        type="text"
        className="input__style"
        placeholder={placeholder}
        style={props}
        id={id}
      />
    </>
  );
}

export default InputComponent;
