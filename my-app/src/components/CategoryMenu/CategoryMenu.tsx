import "./CategoryMenu.scss";
import PopularBlock from "../PopularMenu/PopularBlock";
import { useGetAllQuery } from "../../redux/apiCategorySlice";
import { useState, useEffect } from "react";
import { ICategoryMenu } from "../../redux/types";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorContainer from "../ErrorBoundary/ErrorContainer";
import { Link } from "react-router-dom";

function CategoryMenu() {
  const location = useLocation();
  const categoryName = decodeURIComponent(location.pathname.slice(10));
  const { data, isLoading, error } = useGetAllQuery(
    location.pathname.slice(10)
  );

  const [dataArray, setDataArray] = useState<ICategoryMenu[]>([]);

  useEffect(() => {
    if (data && !isLoading) {
      setDataArray(data.data);
    }
  }, [data]);

  if (isLoading) {
    return <CircularProgress size={60} color="secondary" />;
  }

  if (error) {
    return <ErrorContainer />;
  }

  return (
    <section style={{ gridColumn: "1/13" }}>
      <Header />
      <div className="popular category">
        <h1 className="category__title">{categoryName}</h1>
        <p className="category__home">
          <Link to="/">Главная / </Link>
          <span> {`${"  "}${categoryName}`}</span>
        </p>
        <PopularBlock dataArray={dataArray} />
      </div>
      <Footer />
    </section>
  );
}

export default CategoryMenu;
