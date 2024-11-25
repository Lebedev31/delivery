import "./AdminSlider.scss";
import { useGetAllQuery } from "../../../../redux/apiSliderSlice";
import { useState, useEffect } from "react";
import { Slider } from "../../../../redux/types";
import { RedClose } from "../../../Main/Svg";
import AdminSliderForm from "./AdminSliderForm";

function AdminSlider() {
  const { data } = useGetAllQuery();
  const [dataArray, setDataArray] = useState<Slider[]>();
  const baseUrl = "http://localhost:8080/";
  useEffect(() => {
    if (data) {
      setDataArray(data.data);
    }
  }, [data]);
  return (
    <div className="admin-slider">
      {dataArray?.map((item, index) => {
        return (
          <div key={index} className="admin-slider-item">
            <img src={baseUrl + item.imgPath} alt="" />
            <div className="admin-slider-delete">
              <RedClose />
            </div>
          </div>
        );
      })}

      <AdminSliderForm flag={true} />
    </div>
  );
}

export default AdminSlider;
