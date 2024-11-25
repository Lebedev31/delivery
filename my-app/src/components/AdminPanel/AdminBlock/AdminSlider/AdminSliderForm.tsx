import "./AdminSlider.scss";
import { TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import {
  useCreateSlideMutation,
  useUpdateSlideMutation,
} from "../../../../redux/apiSliderSlice";
import { OptionalSlider } from "../../../../redux/types";

function AdminSliderForm({ flag }: { flag: boolean }) {
  const [file, setFile] = useState<File | null>(null);
  const [createSlide] = useCreateSlideMutation();
  const [updateSlide] = useUpdateSlideMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("image", file);

    if (flag) {
      try {
        createSlide(formData).unwrap();
      } catch (error) {
        console.log(error);
      }
    }

    if (!flag) {
      try {
        updateSlide(formData).unwrap();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form className="admin-slider-form" onSubmit={handleSubmit}>
      <TextField
        id="outlined-basic"
        label="Название блюда"
        variant="filled"
        fullWidth
        className="admin-slider-text"
      />

      <TextField
        id="outlined-basic"
        label="Цена"
        variant="filled"
        type="number"
        fullWidth
        className="admin-slider-text"
      />

      <TextField
        id="outlined-basic"
        label="Вес"
        variant="filled"
        type="number"
        fullWidth
        className="admin-slider-text"
      />

      <TextField
        id="outlined-basic"
        label="Описание нового блюда"
        variant="filled"
        multiline
        fullWidth
        rows={2}
        className="admin-slider-text"
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {" "}
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <Button type="submit">Отправить</Button>
      </div>
    </form>
  );
}

export default AdminSliderForm;
