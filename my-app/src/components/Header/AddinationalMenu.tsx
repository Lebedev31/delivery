import "./AddinationalMenu.scss";
import { Link } from "react-router-dom";

type Props = {
  activeMenu: boolean;
  categoryArray: string[];
};

function AddinationalMenu({ activeMenu, categoryArray }: Props) {
  return (
    <div
      className={`addinational ${
        activeMenu ? "addinational__menu-active" : ""
      }`}
    >
      <ul>
        {categoryArray.map((item, index) => {
          return (
            <Link to={`/category/${item}`} key={index}>
              <li>{item}</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default AddinationalMenu;
