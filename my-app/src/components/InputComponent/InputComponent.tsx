import "./InputComponent.scss";

interface PropsStyleInput {
  props?: {
    [key: string]: string;
  };
  placeholder?: string;
  id?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string
}

function InputComponent({
  props = {},
  placeholder = "",
  id = "",
  className = "",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange = () => {},
  value = "",

}: PropsStyleInput) {
  return (
    <>
      <input
        type="text"
        className={`input__style ${className}`}
        placeholder={placeholder}
        style={props}
        id={id}
        onChange={onChange}
        value={value}
      />
    </>
  );
}

export default InputComponent;
