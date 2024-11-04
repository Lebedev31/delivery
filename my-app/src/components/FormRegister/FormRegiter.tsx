import "./FormRegister.scss";
import { TextField } from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { DataSubmit } from "../../redux/types";
import {
  validationName,
  validationDateOfBirth,
  validationEmail,
  validationPassword,
} from "./validationForm";
import { useCreateNewUserMutation } from "../../redux/apiFormSlice";

function FormRegister() {
  const [createNewUser, { isLoading, isError, isSuccess }] =
    useCreateNewUserMutation();
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
                <DesktopDatePicker
                  label="Дата рождения"
                  onChange={(newDate) => {
                    const formatDate = newDate?.format("DD-MM-YYYY");
                    onChange(formatDate);
                  }}
                  disableFuture
                  openTo="year"
                  views={["year", "month", "day"]}
                  slotProps={{
                    textField: {
                      variant: "filled",
                      color: "secondary",
                      className: "formregister__input",
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

          <Button sx={{ width: "320px" }} variant="contained" type="submit">
            Завершить регистрацию
          </Button>

          <div className="formregister__status">
            <p style={{ color: "#932ab4" }}>
              {isLoading ? "...Регистрация пользователя" : null}
            </p>
            <p style={{ color: "red" }}>
              {isError ? "Произошла ошибка" : null}
            </p>

            <p style={{ color: "green" }}>
              {isSuccess ? "Регистрация завершена" : null}
            </p>
          </div>
        </form>
      </div>
      <Footer />
    </section>
  );
}

export default FormRegister;