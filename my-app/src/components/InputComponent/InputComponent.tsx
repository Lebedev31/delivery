import './InputComponent.scss';

interface PropsStyleInput {
  props?: {
    [key: string]: string;
  };
  placeholder?: string;
}

function InputComponent({
  props = {},
  placeholder = 'Иван Иваныч Иванов проснулся с петухами',
}: PropsStyleInput) {
  return (
    <>
      <input
        type="text"
        className="input__style"
        placeholder={placeholder}
        style={props}
      />
    </>
  );
}

export default InputComponent;
