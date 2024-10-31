import "./BasketMenu.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

function BasketMenu() {
  const data = useSelector((state: RootState) => state.basketState.dataArray);

  return (
    <section style={{ gridColumn: "1/13" }}>
      <Header />
      <div className="basket">
        <div className="basket__title">
          <h1>Корзина</h1>
          <p>20 шт</p>
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
                      <div>
                        <p>{item.title}</p>
                        <p>{item.weight}</p>
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
