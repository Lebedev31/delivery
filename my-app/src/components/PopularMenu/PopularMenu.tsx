import "./PopulatMenu.scss";
import { useGetAllQuery } from "../../redux/apiPopularSlice";
import { useState, useEffect } from "react";
import { PopularFood } from "../../redux/types";
import { Basket } from "../Main/Svg";
import { useMediaQuery } from "@mui/material";

function PopularMenu() {
  const { data, isLoading } = useGetAllQuery();
  const [dataArray, setDataArray] = useState<PopularFood[]>([]);
  const baseUrl = "http://localhost:8080/";
  const media = useMediaQuery("(max-width: 768px)");
  const media2 = useMediaQuery("(max-width: 500px)");

  useEffect(() => {
    if (data && !isLoading) {
      setDataArray(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (media) {
      setDataArray((prevData) => {
        const newArr = prevData.slice(0, -3);
        return newArr;
      });
    }

    if (media2) {
      setDataArray((prevData) => {
        const newArr = prevData.slice(0, -1);
        return newArr;
      });
    }
  }, [media, media2]);

  function getPromotionPrice(price: string, promotion: string): number | null {
    if (!promotion) {
      return null;
    }

    const numberPrice = parseInt(price);
    const numberPromotion = parseInt(promotion);

    return numberPrice - (numberPrice / 100) * numberPromotion;
  }

  return (
    <section className="popular">
      <h1>Популярные блюда</h1>
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
                      {getPromotionPrice(item.price, item.promotion) + " р"}
                    </p>
                  ) : null}
                </div>

                <div className="popular__basket">
                  <Basket />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default PopularMenu;
