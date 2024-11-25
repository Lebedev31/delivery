import "./AdminBock.scss";
import { Paper } from "@mui/material";
import { Link } from "react-router-dom";

function AdminBlock() {
  return (
    <div className="admin-block">
      <Paper elevation={7} className="admin-block__item">
        <Link to="admin-slider">
          <h2>Настройка слайдера</h2>
        </Link>
      </Paper>

      <Paper elevation={7} className="admin-block__item">
        <h2>Популярные продукты</h2>
      </Paper>
      <Paper elevation={7} className="admin-block__item">
        <h2>Продукты</h2>
      </Paper>
      <Paper elevation={7} className="admin-block__item">
        <h2>Пользователи</h2>
      </Paper>
      <Paper elevation={7} className="admin-block__item">
        <h2>Аналитика</h2>
      </Paper>
    </div>
  );
}

export default AdminBlock;
