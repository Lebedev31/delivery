import "./Header.scss";
import logo from "../../img/Logo.png";
import fire from "../../img/image 9.png";
import Hamburger from "./Hamburger";
import TabletMenu from "../TabletMenu/TabletMenu";
import InputComponent from "../InputComponent/InputComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import img1 from "../../img/галочка.png";
import AddinationalMenu from "./AddinationalMenu";
import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const active = useSelector((state: RootState) => state.main.isActive);
  const basketCount = useSelector(
    (state: RootState) => state.basketState.dataArray.length
  );
  const [activeMenuHot, setActiveMenuHot] = useState(false);
  const [activeMenuCold, setActiveMenuCold] = useState(false);

  const categoryArray1 = ["Горячие блюда", "Супы", "Хинкали"];
  const categoryArray2 = ["Холодные закуски", "Салаты", "Соусы"];
  return (
    <header className={`header ${active ? "header__active" : ""}`}>
      <div className="header__logo">
        <img src={logo} alt="логотип" />
      </div>
      <nav className="header__nav">
        <Hamburger />
        <ul className="header_navaigator">
          <li>
            Акции
            <div className="header__img">
              <img src={fire} alt="огонь" />
            </div>
          </li>
          <li
            className="header__additional-menu"
            onMouseEnter={() => setActiveMenuHot(true)}
            onMouseLeave={() => setActiveMenuHot(false)}
          >
            Горячее
            <img src={img1} alt="галочка" />
            <AddinationalMenu
              categoryArray={categoryArray1}
              activeMenu={activeMenuHot}
            />
          </li>
          <li
            className="header__additional-menu"
            onMouseEnter={() => setActiveMenuCold(true)}
            onMouseLeave={() => setActiveMenuCold(false)}
          >
            Холодное
            <img src={img1} alt="галочка" />
            <AddinationalMenu
              categoryArray={categoryArray2}
              activeMenu={activeMenuCold}
            />
          </li>
          <li>
            <Link to={`/category/Свежая выпечка`}>Свежая выпечка</Link>
          </li>
          <li>
            <Link to={`/category/Десерты`}>Десерты</Link>
          </li>
          <li>
            <Link to={`/category/Напитки`}>Напитки</Link>
          </li>
        </ul>
      </nav>

      <div className="header__info">
        <div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.10932 18.2186C14.1403 18.2186 18.2186 14.1402 18.2186 9.10931C18.2186 4.07838 14.1403 0 9.10932 0C4.07834 0 0 4.07838 0 9.10931C0 14.1402 4.07834 18.2186 9.10932 18.2186ZM9.10932 16.0752C12.9565 16.0752 16.0753 12.9565 16.0753 9.10931C16.0753 5.26212 12.9565 2.14337 9.10932 2.14337C5.26214 2.14337 2.14337 5.26212 2.14337 9.10931C2.14337 12.9565 5.26214 16.0752 9.10932 16.0752Z"
              fill="white"
            />
            <path
              d="M15.4475 13.9319L24 22.4844L22.4844 24L13.9319 15.4475L15.4475 13.9319Z"
              fill="white"
            />
          </svg>
        </div>
        <div>
          <Link to="/register">
            <svg
              width="15"
              height="24"
              viewBox="0 0 15 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 9.28132C4.98992 9.28132 2.93347 7.19149 2.93347 4.64066C2.96371 2.08983 4.98992 0 7.5 0C10.0101 0 12.0665 2.08983 12.0665 4.64066C12.0665 7.19149 10.0403 9.28132 7.5 9.28132ZM7.5 2.08983C6.10887 2.08983 4.98992 3.22695 4.98992 4.64066C4.98992 6.05437 6.10887 7.19149 7.5 7.19149C8.89113 7.19149 10.0101 6.05437 10.0101 4.64066C10.0101 3.22695 8.89113 2.08983 7.5 2.08983Z"
                fill="white"
              />
              <path
                d="M12.9738 24V18.2553C12.9738 15.182 10.5242 12.7234 7.53024 12.7234C4.50605 12.7234 2.08669 15.2128 2.08669 18.2553V24H0V18.2553C0 14.0449 3.35685 10.6336 7.5 10.6336C11.6431 10.6336 15 14.0449 15 18.2553V24H12.9738Z"
                fill="white"
              />
            </svg>
          </Link>
        </div>
        <div style={{ position: "relative" }}>
          <div
            className="header__basket-yelloy-box"
            style={{ display: `${basketCount ? "absolute" : "none"}` }}
          >
            {basketCount}
          </div>
          <Link to="/basket">
            <svg
              width="27"
              height="25"
              viewBox="0 0 27 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.44457 25L1.6327 13.8197H0V7.50297H6.22844L9.2822 0L11.0358 0.682088L8.2542 7.53262H18.6853L15.9339 0.682088L17.6876 0L20.7413 7.50297H26.9698V13.8197H25.3371L22.5252 25H4.44457ZM21.0739 23.1613L23.4323 13.8493H3.56775L5.92609 23.1613H21.0739ZM25.0952 11.981V9.40095H1.90482V11.981H25.0952Z"
                fill="white"
              />
              <path
                d="M14.4523 15.3914H12.5475V22.064H14.4523V15.3914Z"
                fill="white"
              />
              <path
                d="M18.0806 15.3914H16.1758V22.064H18.0806V15.3914Z"
                fill="white"
              />
              <path
                d="M10.8242 15.3914H8.91936V22.064H10.8242V15.3914Z"
                fill="white"
              />
            </svg>
          </Link>
        </div>
      </div>
      <div className={`header__search ${active ? "header__active" : ""}`}>
        <InputComponent placeholder={"Поиск блюда"} />
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="black"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.10932 18.2186C14.1403 18.2186 18.2186 14.1402 18.2186 9.10931C18.2186 4.07838 14.1403 0 9.10932 0C4.07834 0 0 4.07838 0 9.10931C0 14.1402 4.07834 18.2186 9.10932 18.2186ZM9.10932 16.0752C12.9565 16.0752 16.0753 12.9565 16.0753 9.10931C16.0753 5.26212 12.9565 2.14337 9.10932 2.14337C5.26214 2.14337 2.14337 5.26212 2.14337 9.10931C2.14337 12.9565 5.26214 16.0752 9.10932 16.0752Z"
            fill="black"
          />
          <path
            d="M15.4475 13.9319L24 22.4844L22.4844 24L13.9319 15.4475L15.4475 13.9319Z"
            fill="black"
          />
        </svg>
      </div>

      <TabletMenu />
    </header>
  );
}

export default Header;
