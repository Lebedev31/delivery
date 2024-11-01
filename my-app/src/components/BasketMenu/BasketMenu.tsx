import "./BasketMenu.scss";
import "../IndifidualFood/IndividualButton.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import IndividualButton from "../IndifidualFood/IndividualButton";
import { RedClose } from "../Main/Svg";
import { deletePosition } from "../../redux/basketSlice";

function BasketMenu() {
  const data = useSelector((state: RootState) => state.basketState.dataArray);
  const dispatch: AppDispatch = useDispatch();
  return (
    <section style={{ gridColumn: "1/13" }}>
      <Header />
      <div className="basket">
        <div className="basket__title">
          <h1>Корзина</h1>
          <p>{data?.length} шт</p>
        </div>
        <div className="basket__home">
          <Link to="/">Главная / </Link>
          <span>Корзина</span>
        </div>
        <div className="basket__content">
          <ul className="basket__info">
            <li>Блюдо</li>
            <li>Цена</li>
            <li>Кол-во:</li>
            <li>Сумма</li>
          </ul>
          <div className="basket__main">
            {data
              ? data.map((item, index) => {
                  return (
                    <div key={index} className="basket__item">
                      <div className="basket__img">
                        <img src={item.imgPath} alt="картинка" />
                      </div>
                      <div className="basket__block2">
                        <div className="basket__block">
                          <p className="basket__name">{item.title}</p>
                          <p className="basket__weight">
                            {item.weight * item.quantity} г
                          </p>
                        </div>
                        <p className="basket__price">{item.price} р</p>
                        <IndividualButton
                          title={item.title}
                          dataObject={item}
                          price={item.price}
                        />
                        <p className="basket__price">{item.sum} р</p>
                      </div>

                      <div
                        className="basket__delete"
                        onClick={() => {
                          dispatch(deletePosition(index));
                        }}
                      >
                        <RedClose />
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default BasketMenu;
