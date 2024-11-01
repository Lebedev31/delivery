import "./FormRegister.scss";
import { TextField } from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import "dayjs/locale/ru";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function FormRegister() {
  const [selectedDate, setSelectedDate] = useState<null | Dayjs>(null);
  return (
    <section className="formregister" style={{ gridColumn: "1/13" }}>
      <Header />
      <h1>Регистрация</h1>
      <form className="formregister__form">
        <TextField
          id="outlined-basic"
          label="Введите свое имя"
          variant="filled"
          className="formregister__input"
          color="secondary"
        />

        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
          <DesktopDatePicker
            label="Дата рождения"
            value={selectedDate}
            onChange={(newDate) => (newDate ? setSelectedDate(newDate) : null)}
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

        <TextField
          id="outlined-basic"
          label="Введите свое email"
          variant="filled"
          className="formregister__input"
          color="secondary"
        />
      </form>
      <Footer />
    </section>
  );
}

export default FormRegister;
