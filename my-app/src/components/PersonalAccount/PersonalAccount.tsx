import "./PersonalAccount.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import { useGetPersonalQuery } from "../../redux/apiPersonalAreaSlice";
import { User } from "../../redux/types";

function PersonalAccount() {
  const { data, isSuccess } = useGetPersonalQuery();
  const [dataPerson, setDataPerson] = useState<User>();

  useEffect(() => {
    if (data && isSuccess) {
      setDataPerson(data.data);
    }
  }, [data]);

  console.log(data);
  return (
    <section style={{ gridColumn: "1/13" }}>
      <Header />
      <div className="personal">
        <h1>Личный кабинет</h1>
        <div className="personal__avatar">
          <img src="" alt="" />
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default PersonalAccount;
