import "./AdminHeader.scss";
import { Link } from "react-router-dom";

function AdminHeader() {
  return (
    <div className="admin-header">
      <ul className="admin-header__link">
        <Link to="/">
          <li>Главная</li>
        </Link>
        <Link to="/admin">
          <li>Админ панель</li>
        </Link>
      </ul>
    </div>
  );
}

export default AdminHeader;
