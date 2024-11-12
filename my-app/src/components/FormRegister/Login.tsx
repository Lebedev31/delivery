import "./FormRegister.scss";
import { TextField } from "@mui/material";
import "dayjs/locale/ru";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import RegisterSocial from "../RegisterSocial/RegisterSocial";
import { Button } from "@mui/material";

function Login() {
  return (
    <section style={{ gridColumn: "1/13" }}>
      <Header />
      <div className="formregister">
        <h1>Войти в личный кабинет</h1>
        <p className="formregister__home">
          <Link to="/">Главная</Link>
        </p>
        <form className="formregister__form">
          <TextField
            id="outlined-basic"
            label="Email"
            variant="filled"
            className="formregister__input"
            color="secondary"
          />
          <TextField
            id="outlined-basic"
            label="Пароль"
            variant="filled"
            className="formregister__input"
            color="secondary"
          />

          <div className="formregister__social">
            <h2>Войти с помощью: </h2>
            <RegisterSocial />
          </div>

          <Button sx={{ width: "320px" }} variant="contained" type="submit">
            Войти
          </Button>
          <Button sx={{ width: "320px" }} variant="contained">
            <Link to="/register">Регистрация</Link>
          </Button>
        </form>
      </div>
      <Footer />
    </section>
  );
}

export default Login;
