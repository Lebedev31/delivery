import "./PopularMenu.scss";
import { Basket } from "../Main/Svg";
import { PopularFood, ICategoryMenu } from "../../redux/types";
import { Link } from "react-router-dom";

type UnionDataArray = PopularFood | ICategoryMenu;

interface ListProps<T extends UnionDataArray> {
  dataArray: T[];
}

function getCategory(item: UnionDataArray): string | undefined {
  if ("category" in item) {
    return item.category;
  }
  return undefined; // Или обработать отсутствие свойства
}

function PopularBlock<T extends UnionDataArray>({ dataArray }: ListProps<T>) {
  const baseUrl = "http://localhost:8080/";
  function getPromotionPrice(price: string, promotion: string): number | null {
    if (!promotion) {
      return null;
    }

    const numberPrice = parseInt(price);
    const numberPromotion = parseInt(promotion);

    return numberPrice - (numberPrice / 100) * numberPromotion;
  }

  return (
    <section>
      <div className="popular__block">
        {dataArray.map((item, index) => {
          return (
            <div key={index} className="popular__item">
              <div className="popular__img">
                <img src={`${baseUrl + item.imgPath}`} alt="" />
              </div>
              <h3>{item.title}</h3>
              <p className="popular__weight">{item.weight}</p>
              <p className="popular__description">{item.description}</p>
              <div className="popular__order">
                <div className="popular__price">
                  <p
                    className="popular__price-item"
                    style={{
                      textDecoration: `${
                        item.promotion ? "line-through" : "none"
                      }`,
                      fontSize: `${item.promotion ? "18px" : "23px"}`,
                    }}
                  >
                    {item.price}
                  </p>
                  {item.promotion ? (
                    <p className="popular__promotion">
                      {getPromotionPrice(item.price, item.promotion) + "р"}
                    </p>
                  ) : null}
                </div>

                <div className="popular__basket">
                  <Link
                    to={`/individual-food/${item.title}`}
                    state={{
                      imgPath: `${baseUrl + item.imgPath}`,
                      price: item.price,
                      title: item.title,
                      description: item.description,
                      category: getCategory(item)
                        ? getCategory(item)
                        : "Популярные блюда",
                    }}
                  >
                    <Basket />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default PopularBlock;
