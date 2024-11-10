import "./RegisterSocial.scss";
import google from "../../img/гугл2.png";
import yandex from "../../img/яндекс.png";
import vk from "../../img/vk.png";

function RegisterSocial() {
  const handleButtonClick = () => {
    window.location.href = "http://localhost:8080/auth/google";
  };

  return (
    <div className="register-social">
      <div onClick={handleButtonClick} className="register-social__img">
        <img src={google} alt="гугл" />
      </div>
      <div className="register-social__img">
        <img src={yandex} alt="яндекс" />
      </div>
      <div className="register-social__img">
        <img src={vk} alt="вк" />
      </div>
    </div>
  );
}

export default RegisterSocial;
