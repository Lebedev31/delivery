import "./TabletMenu.scss";
import fire from "../../img/image 9.png";
import img1 from "../../img/горячие блюда.png";
import img2 from "../../img/супы.png";
import img3 from "../../img/хинкали.png";
import img4 from "../../img/холодные закуски.png";
import img5 from "../../img/салаты.png";
import img7 from "../../img/десерты.png";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import PhoneMenu from "./PhoneMenu";
import { useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { setActive } from "../../redux/mainSlice";

function TabletMenu() {
  const active = useSelector((state: RootState) => state.main.isActive);
  const media = useMediaQuery("(min-width: 450px)");
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className={`menu ${active ? "active" : ""}`}>
      <div className="menu__main">
        <div className="menu__promotion">
          <p>30%</p>
          <div className="menu__img">
            <span>Акции</span>
            <div className="menu__fire">
              <img src={fire} alt="огонь" />
            </div>
          </div>
          <p>20%</p>
        </div>
        <nav className="menu__nav">
          <hr />
          <PhoneMenu text={"Горячее"}>
            {media ? <h3 className="menu__title">{"Горячее"}</h3> : null}
            <div className="menu__hot">
              <div className="menu__hot-item">
                <div className="menu__hot-img">
                  <img src={img1} alt="еда" />
                </div>

                <Link to={`/category/Горячие блюда`}>
                  <p
                    onClick={() => dispatch(setActive())}
                    className="menu__hot-name"
                  >
                    Горячие блюда
                  </p>
                </Link>
              </div>

              <div className="menu__hot-item">
                <div className="menu__hot-img">
                  <img src={img2} alt="еда" />
                </div>

                <Link to={`/category/Супы`}>
                  <p
                    onClick={() => dispatch(setActive())}
                    className="menu__hot-name"
                  >
                    Супы
                  </p>
                </Link>
              </div>

              <div className="menu__hot-item">
                <div className="menu__hot-img">
                  <img src={img3} alt="еда" />
                </div>

                <Link to={`/category/Хинкали`}>
                  <p
                    onClick={() => dispatch(setActive())}
                    className="menu__hot-name"
                  >
                    Хинкали
                  </p>
                </Link>
              </div>
            </div>
          </PhoneMenu>
          <hr />
          <PhoneMenu text={"Холодное"}>
            {media ? <h3 className="menu__title">{"Холодное"}</h3> : null}
            <div className="menu__hot">
              <div className="menu__hot-item">
                <div className="menu__hot-img">
                  <img src={img4} alt="еда" />
                </div>

                <Link to={`/category/Холодные закуски`}>
                  <p
                    onClick={() => dispatch(setActive())}
                    className="menu__hot-name"
                  >
                    Холодные закуски
                  </p>
                </Link>
              </div>

              <div className="menu__hot-item">
                <div className="menu__hot-img">
                  <img src={img5} alt="еда" />
                </div>

                <Link to={`/category/Салаты`}>
                  <p
                    onClick={() => dispatch(setActive())}
                    className="menu__hot-name"
                  >
                    Салаты
                  </p>
                </Link>
              </div>

              <div className="menu__hot-item">
                <div className="menu__hot-img">
                  <img src={img1} alt="еда" />
                </div>
                <Link to={`/category/Соусы`} className="menu__hot-name">
                  <p
                    onClick={() => dispatch(setActive())}
                    className="menu__hot-name"
                  >
                    Соусы
                  </p>
                </Link>
              </div>
            </div>
          </PhoneMenu>
          <hr />
        </nav>
        <nav className="menu__nav" style={{ marginTop: "47px" }}>
          <div className="menu__hot">
            <div className="menu__hot-item">
              <div className="menu__hot-img">
                <img src={img7} alt="еда" />
              </div>
              <Link to={`/category/Свежая выпечка`} className="menu__hot-name">
                <p
                  onClick={() => dispatch(setActive())}
                  className="menu__hot-name"
                >
                  Свежая выпечка
                </p>
              </Link>
            </div>
            <div className="menu__hot-item">
              <div className="menu__hot-img">
                <img src={img7} alt="еда" />
              </div>

              <Link to={`/category/Десерты`} className="menu__hot-name">
                <p
                  onClick={() => dispatch(setActive())}
                  className="menu__hot-name"
                >
                  Десерты
                </p>
              </Link>
            </div>
            <div className="menu__hot-item">
              <div className="menu__hot-img">
                <img src={img7} alt="еда" />
              </div>
              <Link to={`/category/Напитки`} className="menu__hot-name">
                <p
                  onClick={() => dispatch(setActive())}
                  className="menu__hot-name"
                >
                  Напитки
                </p>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default TabletMenu;
