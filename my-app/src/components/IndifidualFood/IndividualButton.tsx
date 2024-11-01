import "./IndividualButton.scss";
import { BasketState } from "../../redux/types";
import { setCounterMinus, setCounterPlus } from "../../redux/basketSlice";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";

type IndividualButtonProps = {
  dataObject: BasketState;
  title: string;
  price: number;
};

function IndividualButton({ dataObject, title, price }: IndividualButtonProps) {
  const dispatch: AppDispatch = useDispatch();

  const countObject = {
    title,
    count: dataObject?.quantity,
    price,
  };

  function plusCounter() {
    if (dataObject.quantity < 30 && dataObject.quantity) {
      dispatch(setCounterPlus(countObject));
    }
  }

  function minusCounter() {
    if (dataObject.quantity > 1 && dataObject.quantity) {
      dispatch(setCounterMinus(countObject));
    }
  }

  return (
    <div className="individual__button">
      <div className="border__left"></div>
      <div className="border__right"></div>
      <div className="individual__center">
        <p onClick={plusCounter}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.3839 6.53967L0 6.53967V4.84425H11.3839L11.3839 6.53967Z"
              fill="white"
            />
            <path
              d="M6.54015 0L6.54015 11.3839L4.84473 11.3839V0H6.54015Z"
              fill="white"
            />
          </svg>
        </p>
        <p>{dataObject?.quantity} шт.</p>
        <p onClick={minusCounter}>
          <svg
            width="12"
            height="3"
            viewBox="0 0 12 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.3839 2.53966L0 2.53966V0.844238H11.3839L11.3839 2.53966Z"
              fill="white"
            />
          </svg>
        </p>
      </div>
    </div>
  );
}

export default IndividualButton;
