import "./IndividualFood.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link, useLocation } from "react-router-dom";
import { Basket } from "../Main/Svg";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../redux/store";
import { BasketState } from "../../redux/types";
import { useDispatch } from "react-redux";
import {
  pushBasketState,
  setCounterPlus,
  setCounterMinus,
} from "../../redux/basketSlice";
import { useSelector } from "react-redux";

type LinkState = {
  imgPath: string;
  price: string;
  description: string;
  category: string;
  title: string;
  weight: string;
};

function IndividualFood() {
  const location = useLocation();
  const { imgPath, price, description, category, title, weight }: LinkState =
    location.state;
  const dispatch: AppDispatch = useDispatch();
  const data = useSelector((state: RootState) => state.basketState.dataArray);
  const dataObject = data.filter((item) => item.title === title)[0];
  const parsePrice = parseInt(price);

  const countObject = {
    title,
    count: dataObject?.quantity,
    price: parsePrice,
  };

  useEffect(() => {
    if (location.state) {
      const newWeight = parseInt(weight);
      const intitial: BasketState = {
        imgPath,
        title,
        weight: newWeight,
        sum: parsePrice,
        quantity: 1,
      };
      dispatch(pushBasketState(intitial));
    }
  }, []);

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
    <section style={{ gridColumn: "1/13" }}>
      <Header />
      <div className="individual">
        <h1 className="individual__title">{title ? title : "Еда"}</h1>
        <p className="individual__home">
          <Link to="/">Главная / </Link>
          <Link
            to={
              category === "Популярные блюда"
                ? "/#popular__target-block"
                : `/category/${category}`
            }
          >
            {category} /
          </Link>
          <span> {title}</span>
        </p>
        <div className="individual__content">
          <div className="individual__img">
            <img src={imgPath} alt="картинка" />
          </div>
          <div className="individual__purchase">
            <h3>Добавить в корзину</h3>
            <div className="individual__order">
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
              <div className="individual__price">{dataObject?.sum}p</div>
              <div className="individual__basket">
                <Link to="/basket">
                  <Basket />
                </Link>
              </div>
            </div>

            <div className="individual__description">
              <p style={{ textTransform: "uppercase" }}>Описание:</p>
              <br />
              {description}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}

export default IndividualFood;
