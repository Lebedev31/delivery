import "./Main.scss";
import { Abstraction, Abstraction2, Basket } from "./Svg";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetAllQuery } from "../../redux/apiSliderSlice";
import { Slider } from "../../redux/types";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorContainer from "../ErrorBoundary/ErrorContainer";
import { useMediaQuery } from "@mui/material";

function Main() {
  const { data, isLoading, error } = useGetAllQuery();
  const [show, setShow] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dataArray, setDataArray] = useState<Slider[]>([]);
  const baseUrl = "http://localhost:8080/";
  const media = useMediaQuery("(max-width: 360px)");

  useEffect(() => {
    if (data && !isLoading) {
      setDataArray(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (dataArray.length !== 0 && !media) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => {
          setShow(false);
          if (prevSlide === dataArray.length - 1) {
            setShow(true);
            return 0;
          } else {
            setShow(true);
            return prevSlide + 1;
          }
        });
      }, 3000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [dataArray]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={150} color="secondary" />
      </div>
    );
  }

  if (error) {
    return <ErrorContainer />;
  }

  return (
    <section className="main">
      <aside className="main__contact">
        <h2>Доставка готовой еды из фермерских продуктов!</h2>
        <div className="main__abstraction">
          <Abstraction />
        </div>
        <div className="main__tel">
          <address className="main__tel-item">
            <a href="tel:+7 (499) 841-67-29">+7 (499) 841-67-29</a>
          </address>
          <address className="main__email">
            <a href="mailto:delivery@midas.rest">delivery@midas.rest</a>
          </address>
        </div>
      </aside>
      <Box className="main__slider">
        {dataArray.map((item, index) => {
          return (
            <div
              key={index}
              className={`main__slider-box ${
                show && index === currentSlide ? "active-slider" : ""
              }`}
            >
              <Box
                className="main__slider-item"
                sx={{ background: `url(${baseUrl + item.imgPath})` }}
              ></Box>
            </div>
          );
        })}
      </Box>
      <div className="main__red-box">
        <h3>{dataArray.length > 0 ? dataArray[currentSlide].title : ""}</h3>
        <p className="main__weight">
          {dataArray.length > 0 ? dataArray[currentSlide].weight : ""}г
        </p>
        <p className="main__description">
          {dataArray.length > 0 ? dataArray[currentSlide].description : ""}
        </p>
        <div className="main__price">
          <h3>
            {dataArray.length > 0 ? dataArray[currentSlide].price + " ₽" : ""}
          </h3>
          <div className="main__basket">
            <Basket />
          </div>
        </div>
      </div>

      <div className="main__abstraction2">
        <Abstraction2 />
      </div>
    </section>
  );
}

export default Main;
