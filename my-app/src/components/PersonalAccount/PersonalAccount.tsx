import "./PersonalAccount.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function PersonalAccount() {
  return (
    <section style={{ gridColumn: "1/13" }}>
      <Header />
      <Footer />
    </section>
  );
}

export default PersonalAccount;
