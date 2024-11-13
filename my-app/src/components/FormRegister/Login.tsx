import "./FormRegister.scss";
import { TextField } from "@mui/material";
import "dayjs/locale/ru";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import RegisterSocial from "../RegisterSocial/RegisterSocial";
import { Button } from "@mui/material";
import { useCheckLoginMutation } from "../../redux/apiFormSlice";
import { Logout } from "../../redux/types";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const [checkLogin, { isLoading, isError, isSuccess }] =
    useCheckLoginMutation();
  const { register, reset, handleSubmit } = useForm<Logout>();

  async function onSubmit(data: Logout) {
    try {
      if (data) {
        await checkLogin(data).unwrap();
        navigate("/personal");
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section style={{ gridColumn: "1/13" }}>
      <Header />
      <div className="formregister">
        <h1>Войти в личный кабинет</h1>
        <p className="formregister__home">
          <Link to="/">Главная</Link>
        </p>
        <form className="formregister__form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="filled"
            className="formregister__input"
            color="secondary"
            {...register("email")}
          />
          <TextField
            id="outlined-basic"
            label="Пароль"
            variant="filled"
            className="formregister__input"
            color="secondary"
            {...register("password")}
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
