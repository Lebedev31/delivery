import "./FormRegister.scss";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import Header from "../Header/Header";
import { useRef, useEffect } from "react";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import {
  validationName,
  validationDateOfBirth,
  validationEmail,
  validationPassword,
} from "./validationForm";
import { useCreateNewUserMutation } from "../../redux/apiFormSlice";
import RegisterSocial from "../RegisterSocial/RegisterSocial";
import {
  standartError,
  UniversalRTKError,
  DataSubmit,
} from "../../redux/types";

function FormRegister() {
  const [createNewUser, { isLoading, isError, isSuccess, error }] =
    useCreateNewUserMutation();
  const fetchError = error as UniversalRTKError;

  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<DataSubmit>();

  function onSubmit(data: DataSubmit) {
    const user: DataSubmit = {
      name: data.name,
      email: data.email,
      dateOfBirth: data.dateOfBirth,
      password: data.password,
    };
    try {
      createNewUser(user).unwrap();
      reset();
    } catch (error) {
      console.log(error);
    }
  }

  const password = watch("password");

  useEffect(() => {
    if ((isSuccess || isError) && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [isSuccess, isError]);

  return (
    <section style={{ gridColumn: "1/13" }}>
      <Header />
      <div className="formregister">
        <h1>Регистрация</h1>
        <p className="formregister__home">
          <Link to="/">Главная</Link>
        </p>
        <form className="formregister__form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="outlined-basic"
            label="Имя"
            variant="filled"
            className="formregister__input"
            color="secondary"
            {...register("name", validationName)}
          />
          <div className="formregister__error-message">
            {errors.name && <span>{errors.name.message}</span>}
          </div>

          <Controller
            name="dateOfBirth"
            control={control}
            rules={validationDateOfBirth}
            render={({ field: { onChange } }) => (
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="ru"
              >
                <DatePicker
                  label="Дата рождения"
                  onChange={(newDate) => {
                    onChange(newDate?.format("DD-MM-YYYY"));
                  }}
                  disableFuture
                  openTo="year"
                  views={["year", "month", "day"]}
                  slotProps={{
                    textField: {
                      variant: "filled",
                      color: "secondary",
                      className: "formregister__input",
                      id: "id",
                      inputRef: inputRef,
                    },
                    popper: {
                      placement: "bottom-start",
                      modifiers: [
                        {
                          name: "offset",
                          options: {
                            offset: [0, 10],
                          },
                        },
                      ],
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          />

          <div className="formregister__error-message">
            {errors.dateOfBirth && <span>{errors.dateOfBirth.message}</span>}
          </div>

          <TextField
            id="outlined-basic"
            label="Email"
            variant="filled"
            className="formregister__input"
            color="secondary"
            {...register("email", validationEmail)}
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
            {...register("password", validationPassword)}
          />

          <div className="formregister__error-message">
            {errors.password && <span>{errors.password.message}</span>}
          </div>

          <TextField
            id="outlined-basic"
            label="Подтвердите пароль"
            variant="filled"
            className="formregister__input"
            color="secondary"
            {...register("confirmPassword", {
              required: "Подтвердите пароль",
              validate: (value) => value === password || "Пароли не совпадают",
            })}
          />

          <div className="formregister__error-message">
            {errors.confirmPassword && (
              <span>{errors.confirmPassword.message}</span>
            )}
          </div>

          <div className="formregister__social">
            <h2>Регистрация с помощью: </h2>
            <RegisterSocial />
          </div>

          <Button
            className="formregister__button"
            variant="contained"
            type="submit"
          >
            Завершить регистрацию
          </Button>

          <Button variant="contained" className="formregister__button">
            <Link to="/login">Вернуться назад</Link>
          </Button>

          <div className="formregister__status">
            <p style={{ color: "#932ab4" }}>
              {isLoading ? "...Регистрация пользователя" : null}
            </p>
            <p style={{ color: "red" }}>
              {isError ? standartError(fetchError) : null}
            </p>

            <p style={{ color: "green" }}>
              {isSuccess && (
                <>
                  Регистрация завершена,
                  <Link style={{ color: "red" }} to="/personal">
                    перейдите по ссылке
                  </Link>
                </>
              )}
            </p>
          </div>
        </form>
      </div>
      <Footer />
    </section>
  );
}

export default FormRegister;
