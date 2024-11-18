import "./IndividualFood.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link, useLocation } from "react-router-dom";
import { Basket } from "../Main/Svg";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../redux/store";
import { BasketState } from "../../redux/types";
import { useDispatch, useSelector } from "react-redux";
import { pushBasketState } from "../../redux/basketSlice";
import IndividualButton from "./IndividualButton";

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

  useEffect(() => {
    if (location.state) {
      const newWeight = parseInt(weight);
      const intitial: BasketState = {
        imgPath,
        title,
        weight: newWeight,
        sum: parsePrice,
        quantity: 1,
        price: parsePrice,
      };
      dispatch(pushBasketState(intitial));
    }
  }, []);

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
              <IndividualButton
                title={title}
                price={parsePrice}
                dataObject={dataObject}
              />
              <div className="individual__price">{dataObject?.sum}p</div>
              <div className="individual__basket">
                <Link to="/payment">
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
