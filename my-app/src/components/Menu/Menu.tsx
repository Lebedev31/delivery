import "./Menu.scss";
import img from "../../img/стрелочка.png";
import Slider from "react-slick";
import img1 from "../../img/горячие1.png";
import img2 from "../../img/горчячие2.png";
import img3 from "../../img/супы1.png";
import img4 from "../../img/супы2.png";
import img5 from "../../img/хинкали1.png";
import img6 from "../../img/хинкали2.png";
import img7 from "../../img/холодные1.png";
import img8 from "../../img/холодные2.png";
import img9 from "../../img/супы1.png";
import img10 from "../../img/супы2.png";
import fire from "../../img/image 9.png";

const settings = {
  dots: false, // Показать индикаторы
  infinite: false, // Бесконечная прокрутка
  speed: 500, // Скорость анимации
  slidesToShow: 6, // Количество изображений для показа
  slidesToScroll: 1, // Количество изображений при прокрутке
  nextArrow: <RightArrow />,
  prevArrow: <LeftArrow />,
  responsive: [
    {
      breakpoint: 1480, // Для экранов меньше 1024px
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 768, // Для экранов меньше 768px
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

function Menu() {
  const arr = [
    [img2, img1, "Горячие блюда"],
    [img4, img3, "Супы"],
    [img5, img6, "Хинкали"],
    [img8, img7, "Холодные закуски"],
    [img10, img9, "Салаты"],
  ];

  return (
    <section className="menu-slider">
      <h2>Меню</h2>
      <div className="slider-container">
        <Slider {...settings}>
          <div className="menu-slider__promotion">
            <p>30%</p>
            <div className="menu-slider__img">
              <span>Акции</span>
              <div className="menu-slider__fire">
                <img src={fire} alt="огонь" />
              </div>
            </div>
            <p>20%</p>
          </div>

          {arr.map((item, index) => {
            return (
              <div key={index} className="menu-slider-item">
                <div className="menu-slider-img">
                  <img src={item[0]} alt="" />
                </div>
                <h3>{item[2]}</h3>
                <div className="menu-slider-img">
                  <img src={item[1]} alt="" />
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
}

export default Menu;

function LeftArrow(props: any) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} menu-slider-left`}
      style={{ display: `` }}
      onClick={onClick}
    >
      <img src={img} alt="стрелочка" />
    </div>
  );
}

function RightArrow(props: any) {
  const { className, onClick } = props;
  return (
    <div className={`${className} menu-slider__arrow-right`} onClick={onClick}>
      <img src={img} alt="стрелочка" />
    </div>
  );
}
