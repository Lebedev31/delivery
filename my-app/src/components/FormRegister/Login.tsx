import "./FormRegister.scss";
import { TextField } from "@mui/material";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import RegisterSocial from "../RegisterSocial/RegisterSocial";
import { Button } from "@mui/material";
import { useCheckLoginMutation } from "../../redux/apiFormSlice";
import { Logout, standartError, UniversalRTKError } from "../../redux/types";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();
  const [checkLogin, { isLoading, isError, isSuccess, error, data }] =
    useCheckLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Logout>();
  const fetchError = error as UniversalRTKError;

  async function onSubmit(data: Logout) {
    try {
      if (data) {
        await checkLogin(data).unwrap();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (data) {
      if (isSuccess && data.msg !== "/admin") {
        navigate("/personal");
      }

      if (isSuccess && data.msg === "/admin") {
        navigate("/admin");
      }
    }
  }, [isSuccess, data]);

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
            {...register("email", {
              required: "Поле обязательно для заполнения",
            })}
          />

          <div className="formregister__error-message">
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <TextField
            id="outlined-basic"
            label="Пароль"
            variant="filled"
            className="formregister__input"
            color="secondary"
            {...register("password", {
              required: "Поле обязательно для заполнения",
            })}
          />
          <div className="formregister__error-message">
            {errors.password && <span>{errors.password.message}</span>}
          </div>

          <div className="formregister__social">
            <h2>Войти с помощью: </h2>
            <RegisterSocial />
          </div>

          <Button
            className="formregister__button"
            variant="contained"
            type="submit"
          >
            Войти
          </Button>
          <Button className="formregister__button" variant="contained">
            <Link to="/register">Регистрация</Link>
          </Button>
          <div className="formregister__status">
            <p style={{ color: "#932ab4" }}>
              {isLoading ? "...Регистрация пользователя" : null}
            </p>
            <p style={{ color: "red" }}>
              {isError ? standartError(fetchError) : null}
            </p>
          </div>
        </form>
      </div>
      <Footer />
    </section>
  );
}

export default Login;
