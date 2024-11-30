import "./AdminSlider.scss";
import { TextField, Button } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import {
  useCreateSlideMutation,
  useUpdateSlideMutation,
} from "../../../../redux/apiSliderSlice";
import { OptionalSlider } from "../../../../redux/types";

type AdminSliderFormProps = {
  flag: boolean;
  _id: string | "none";
  refetch: () => void;
};

function AdminSliderForm({ flag, _id, refetch }: AdminSliderFormProps) {
  const arrayPropertyForm: string[] = [
    "description",
    "title",
    "weight",
    "price",
    "image",
    "_id",
  ];
  const descriptionRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const weightRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [createSlide, { isSuccess: createIsSuccess }] =
    useCreateSlideMutation();
  const [updateSlide, { isSuccess: updateIsSuccess }] =
    useUpdateSlideMutation();
  const [inputValue, setInputValue] = useState<OptionalSlider>({
    description: "",
    title: "",
    weight: "",
    price: "",
    file: null,
    _id,
  });
  const valuesInput = Object.values(inputValue);

  useEffect(() => {
    if (updateIsSuccess || createIsSuccess) {
      refetch();
    }
  }, [updateIsSuccess, createIsSuccess]);

  const unionValue = (): void => {
    setInputValue({
      description: descriptionRef.current?.value,
      title: titleRef.current?.value,
      weight: weightRef.current?.value,
      price: priceRef.current?.value,
      file: fileRef.current?.files?.[0],
      _id,
    });
  };

  const checkEmptyFormData = (form: FormData): boolean => {
    const values = Array.from(form.values());
    const findNull = values.find((item) => item === null || item === "");
    if (findNull === undefined && values.length === valuesInput.length) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    arrayPropertyForm.forEach((item, index) => {
      if (valuesInput[index]) {
        formData.append(item, valuesInput[index] as string | Blob);
      }
    });

    if (flag) {
      const checkPOST = checkEmptyFormData(formData);

      if (checkPOST) {
        try {
          createSlide(formData).unwrap();
          console.log(24);
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("Заполните полностью данные");
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
        inputRef={titleRef}
      />

      <TextField
        id="outlined-basic"
        label="Цена"
        variant="filled"
        type="number"
        fullWidth
        className="admin-slider-text"
        inputRef={priceRef}
      />

      <TextField
        id="outlined-basic"
        label="Вес"
        variant="filled"
        type="number"
        fullWidth
        className="admin-slider-text"
        inputRef={weightRef}
      />

      <TextField
        id="outlined-basic"
        label="Описание нового блюда"
        variant="filled"
        multiline
        fullWidth
        rows={2}
        className="admin-slider-text"
        inputRef={descriptionRef}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {" "}
        <input type="file" accept="image/*" ref={fileRef} />
        <Button onClick={unionValue} type="submit">
          Отправить
        </Button>
      </div>
    </form>
  );
}

export default AdminSliderForm;
