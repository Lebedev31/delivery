import "./Payment.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import InputComponent from "../InputComponent/InputComponent";
import mastercard from "../../img/mastercard.png";
import visa from "../../img/visa.png";
import mir from "../../img/mir.png";
import applePay from "../../img/pay.png";
import { Button } from "@mui/material";
import { useMediaQuery } from "@mui/material";

function Payment() {
  const media = useMediaQuery("(max-width: 600px)");
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
                <p>Бесконтактная доставка</p>
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
                props={{ width: media ? "330px" : "360px", color: "black" }}
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
                props={{ width: media ? "330px" : "360px", color: "black" }}
                id="tel"
              />
            </div>
            <div className="label__style transform-area ">
              <label
                htmlFor="reviews"
                className="payment__label"
                style={{ width: "120px" }}
              >
                Комментарий к заказу
              </label>
              <textarea className="payment__textarea" id="reviews"></textarea>
            </div>
          </form>
        </div>

        <div className="payment__system">
          <h2>Оплата</h2>
          <hr />
          <div className="payment__system-block">
            <div className="payment__system__item-1">
              <input type="radio" name="payment" />

              <div className="payment__system__item-1-block">
                <p className="payment__system__text">
                  Банковские карты / Электронные деньги / Другое
                </p>
                <div className="payment__system-link">
                  <img src={mastercard} />
                  <img src={visa} />
                  <img src={mir} />
                  <img src={applePay} />
                </div>
              </div>
            </div>
            <div className="payment__system__item-1 height-block">
              <input type="radio" name="payment" />
              <p className="payment__system__text">Наличными курьеру</p>
            </div>
            <div className="payment__system__item-1 height-block">
              <input type="radio" name="payment" />
              <p className="payment__system__text">Картой курьеру</p>
            </div>
          </div>

          <div className="payment__system-button">
            <Button
              sx={{
                backgroundColor: "rgba(251, 209, 62, 1)",
                color: "black",
              }}
            >
              Подтвердить заказ
            </Button>

            <p>Сумма заказа:</p>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default Payment;
