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
  console.log(dataArray);

  useEffect(() => {
    if (data && !isLoading) {
      setDataArray(() => {
        const newArray = [...data.data].sort(
          (a, b) => parseInt(a.price) - parseInt(b.price)
        );
        return newArray;
      });
    }
  }, [data]);

  if (isLoading) {
    return <CircularProgress size={60} color="secondary" />;
  }

  if (error) {
    return <ErrorContainer />;
  }

  function hadleSelectSort(e: React.ChangeEvent<HTMLSelectElement>) {
    const target = e.target.value;

    switch (target) {
      case "По цене":
        setDataArray((prev) => {
          const newArray = [...prev].sort(
            (a, b) => parseInt(a.price) - parseInt(b.price)
          );
          return newArray;
        });
        break;

      case "По акциям":
        setDataArray((prev) => {
          const newArray = [...prev].sort((a, b) => {
            const promotionA = a.promotion === "" ? 0 : parseInt(a.promotion);
            const promotionB = b.promotion === "" ? 0 : parseInt(b.promotion);
            return promotionB - promotionA;
          });
          return newArray;
        });
        break;

      case "По весу":
        setDataArray((prev) => {
          const newArray = [...prev].sort(
            (a, b) => parseInt(a.weight) - parseInt(b.weight)
          );
          return newArray;
        });
        break;

      default:
        return;
    }
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
        <div className="category__sort">
          <p>Cортировать:</p>
          <select onChange={hadleSelectSort}>
            <option value="По цене">По цене</option>
            <option value="По акциям">По акциям</option>
            <option value="По весу">По весу</option>
          </select>
        </div>
        <PopularBlock dataArray={dataArray} />
      </div>
      <Footer />
    </section>
  );
}

export default CategoryMenu;
