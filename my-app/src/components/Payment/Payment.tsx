import "./Payment.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import InputComponent from "../InputComponent/InputComponent";

function Payment() {
  return (
    <section style={{ gridColumn: "1/13" }}>
      <Header />
      <div className="payment">
        <div className="payment__home">
          <h1>Оформление заказа</h1>
          <div className="payment__link">
            <span>
              <Link to="/"> Главная /</Link>
            </span>
            <span>
              <Link to="/basket"> Корзина / </Link>
            </span>
            <span>Оформление заказа</span>
          </div>
        </div>
        <div className="payment__delivery">
          <h2>Способ доставки</h2>
          <hr className="payment__line" />
          <div className="payment__block">
            <div className="payment__item">
              <div className="payment__title">
                <p>Бесплатная доставка</p>
                <p>300 ₽</p>
              </div>
              <p className="payment__text">
                Доставка по Москве в пределах МКАД Осуществляется: ежедневно с
                12:00 до 00:00, Диапозон времени: от 1 до 1.5 часов
              </p>
            </div>
            <div className="payment__item">
              <div className="payment__title">
                <p>Самовывоз</p>
                <p>+0 ₽</p>
              </div>
              <p className="payment__text">
                Доступен с 12:00 до 00:00 По адресу ул. Улофа Пальме 5с2
              </p>
            </div>
          </div>

          <form className="payment__delvery-form">
            <h3 className="payment__label">Адрес доставки</h3>
            <div className="label__style">
              <label className="payment__label" htmlFor="street">
                Улица
              </label>
              <InputComponent
                id="street"
                props={{ width: "360px", color: "black" }}
              />
            </div>

            <div className="payment__block-input">
              <div className="label__style">
                <label className="payment__label" htmlFor="house">
                  Дом
                </label>
                <InputComponent
                  props={{ width: "107px", color: "black" }}
                  id="house"
                />
              </div>

              <div className="label__style">
                <label className="payment__label" htmlFor="apartment">
                  Квартира
                </label>
                <InputComponent
                  props={{ width: "107px", color: "black" }}
                  id="apartment"
                />
              </div>
            </div>
            <div className="label__style transform-input">
              <label className="payment__label" htmlFor="tel">
                Телефон
              </label>
              <InputComponent
                props={{ width: "360px", color: "black" }}
                id="tel"
              />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default Payment;
