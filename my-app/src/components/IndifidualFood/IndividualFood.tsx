import "./IndividualFood.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link, useLocation } from "react-router-dom";
import { Basket } from "../Main/Svg";

type LinkState = {
  imgPath: string;
  price: string;
  description: string;
  category: string;
  title: string;
};

function IndividualFood() {
  const location = useLocation();
  const { imgPath, price, description, category, title }: LinkState =
    location.state || {};
  console.log(title);
  return (
    <section style={{ gridColumn: "1/13" }}>
      <Header />
      <div className="individual">
        <h1 className="individual__title">{title ? title : "Еда"}</h1>
        <p className="individual__home">
          <Link to="/">Главная / </Link>
        </p>
        <div className="individual__content">
          <div className="individual__img">
            <img src={imgPath} alt="картинка" />
          </div>
          <div className="indiviual__purchase">
            <h3>Добавить в корзину</h3>
            <div className="individual__order">
              <div className="individual__button">
                <div className="border__left"></div>
                <div className="border__right"></div>
                <div className="individual__center">
                  <p>
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
                  <p>0 шт.</p>
                  <p>
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
              <div className="individual__price">{price}</div>
              <div className="individual__basket">
                <Basket />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}

export default IndividualFood;
