import "./PopularMenu.scss";
import { useGetAllQuery } from "../../redux/apiPopularSlice";
import { useState, useEffect } from "react";
import { PopularFood } from "../../redux/types";
import { useMediaQuery } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorContainer from "../ErrorBoundary/ErrorContainer";
import PopularBlock from "./PopularBlock";

function PopularMenu() {
  const { data, isLoading, error } = useGetAllQuery();
  const [dataArray, setDataArray] = useState<PopularFood[]>([]);

  const media = useMediaQuery("(max-width: 768px)");
  const media2 = useMediaQuery("(max-width: 500px)");

  useEffect(() => {
    if (data && !isLoading) {
      setDataArray(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (media) {
      setDataArray((prevData) => {
        const newArr = prevData.slice(0, -3);
        return newArr;
      });
    }

    if (media2) {
      setDataArray((prevData) => {
        const newArr = prevData.slice(0, -1);
        return newArr;
      });
    }
  }, [media, media2]);

  if (isLoading) {
    return <CircularProgress size={60} color="secondary" />;
  }

  if (error) {
    return <ErrorContainer />;
  }

  return (
    <section className="popular">
      <h1>Популярные блюда</h1>
      <PopularBlock dataArray={dataArray} />
    </section>
  );
}

export default PopularMenu;
