import "./RegisterSocial.scss";
import google from "../../img/гугл2.png";
import yandex from "../../img/яндекс.png";
import vk from "../../img/vk.png";

function RegisterSocial() {
  const googleButtonClick = () => {
    window.location.href = "http://localhost:8080/auth/google";
  };

  const yandexButtonClick = () => {
    window.location.href = "http://localhost:8080/auth/yandex";
  };

  return (
    <div className="register-social">
      <div onClick={googleButtonClick} className="register-social__img">
        <img src={google} alt="гугл" />
      </div>
      <div onClick={yandexButtonClick} className="register-social__img">
        <img src={yandex} alt="яндекс" />
      </div>
      <div className="register-social__img">
        <img src={vk} alt="вк" />
      </div>
    </div>
  );
}

export default RegisterSocial;
