import "./App.scss";
import Header from "../Header/Header";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Main from "../Main/Main";
import PopularMenu from "../PopularMenu/PopularMenu";
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import CategoryMenu from "../CategoryMenu/CategoryMenu";
import IndividualFood from "../IndifidualFood/IndividualFood";

function App() {
  const active = useSelector((state: RootState) => state.main.isActive);

  useEffect(() => {
    if (active) {
      document.body.style.backgroundColor = "rgba(0, 0, 0, 0.94)";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.backgroundColor = "rgba(9, 35, 78, 0.9)";
      document.body.style.overflow = "auto";
    }
  }, [active]);

  return (
    <div className="container">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Fragment>
                <Header />
                <main style={{ gridColumn: "1/13" }}>
                  <ErrorBoundary>
                    <Main />
                  </ErrorBoundary>
                  <ErrorBoundary>
                    <PopularMenu />
                  </ErrorBoundary>
                  <Menu />
                </main>
                <Footer />
              </Fragment>
            }
          />
          <Route path="/individual-food/:id" element={<IndividualFood />} />
          <Route path="/category/:id" element={<CategoryMenu />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
