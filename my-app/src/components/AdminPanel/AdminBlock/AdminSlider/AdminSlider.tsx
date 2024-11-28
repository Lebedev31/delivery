import "./AdminSlider.scss";
import { useGetAllQuery } from "../../../../redux/apiSliderSlice";
import { useState, useEffect } from "react";
import { Slider } from "../../../../redux/types";
import { RedClose } from "../../../Main/Svg";
import AdminSliderForm from "./AdminSliderForm";

function AdminSlider() {
  const { data } = useGetAllQuery();
  const [dataArray, setDataArray] = useState<Slider[]>();
  const [updateForm, setUpdateForm] = useState(false);
  const baseUrl = "http://localhost:8080/";
  const [hoverState, setHoverState] = useState(true);
  useEffect(() => {
    if (data) {
      setDataArray(data.data);
    }
  }, [data]);
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
            <div className="admin-slider-delete">
              <RedClose />
            </div>
            <div
              className={`admin-slider-update-form ${
                updateForm ? "admin-active" : ""
              }`}
            >
              <AdminSliderForm flag={false} />
            </div>
            <div
              className="admin-mouse-enter"
              style={{ visibility: hoverState ? "visible" : "hidden" }}
              onMouseEnter={() => {
                setUpdateForm(true);
                setHoverState(false);
              }}
            ></div>
          </div>
        );
      })}

      <AdminSliderForm flag={true} />
    </div>
  );
}

export default AdminSlider;
