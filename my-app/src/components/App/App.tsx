import "./App.scss";
import Header from "../Header/Header";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Main from "../Main/Main";
import PopularMenu from "../PopularMenu/PopularMenu";

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
      <Header />
      <main style={{ gridColumn: "1/13" }}>
        <Main />
        <PopularMenu />
      </main>
    </div>
  );
}

export default App;
