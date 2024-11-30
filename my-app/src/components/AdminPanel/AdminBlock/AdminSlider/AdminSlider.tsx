import "./AdminSlider.scss";
import { useGetAllQuery } from "../../../../redux/apiSliderSlice";
import { useState, useEffect } from "react";
import { Slider } from "../../../../redux/types";
import { RedClose } from "../../../Main/Svg";
import AdminSliderForm from "./AdminSliderForm";
import { useDeleteSlideMutation } from "../../../../redux/apiSliderSlice";

function AdminSlider() {
  const { data, refetch } = useGetAllQuery();
  const [deleteSlide, { isSuccess }] = useDeleteSlideMutation();
  const [dataArray, setDataArray] = useState<Slider[]>();
  const [updateForm, setUpdateForm] = useState(false);
  const baseUrl = "http://localhost:8080/";
  const [hoverState, setHoverState] = useState(true);
  const [individualItem, setIndividuaItem] = useState(0); // метка для определения появления лишь одной update формы

  useEffect(() => {
    if (data) {
      setDataArray(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);

  async function deleteItem(id: string) {
    try {
      await deleteSlide(id).unwrap();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="admin-slider">
      {dataArray?.map((item, index) => {
        return (
          <div
            key={index}
            className="admin-slider-item"
            onMouseLeave={() => {
              setUpdateForm(false);
              setHoverState(true);
            }}
          >
            <img src={baseUrl + item.imgPath} alt="" />
            <div
              className="admin-slider-delete"
              onClick={() => deleteItem(item._id)}
            >
              <RedClose />
            </div>
            <div
              className={`admin-slider-update-form ${
                updateForm && individualItem === index ? "admin-active" : ""
              }`}
            >
              <AdminSliderForm flag={false} _id={item._id} refetch={refetch} />
            </div>
            <div
              className="admin-mouse-enter"
              style={{ visibility: hoverState ? "visible" : "hidden" }}
              onMouseEnter={() => {
                setUpdateForm(true);
                setHoverState(false);
                setIndividuaItem(index);
              }}
            ></div>
          </div>
        );
      })}

      <AdminSliderForm flag={true} _id="none" refetch={refetch} />
    </div>
  );
}

export default AdminSlider;
