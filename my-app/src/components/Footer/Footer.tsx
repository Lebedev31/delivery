import "./Footer.scss";
import logo from "../../img/Logo.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__navigation">
        <nav className="footer__nav">
          <div className="footer__logo">
            <img src={logo} alt="логотип" />
          </div>
          <ul className="footer__feedback">
            <li>Обратная связь</li>
            <li>Доставка</li>
            <li>Оплата</li>
            <li>Контакты</li>
          </ul>
        </nav>
        <div className="footer__email">
          <address>
            <a href="tel:+7 (499) 841-67-29">+7 (499) 841-67-29</a>
          </address>
          <address>
            <a href="mailto:delivery@midas.rest">delivery@midas.rest</a>
          </address>
        </div>
      </div>

      <hr />
      <div className="footer__confidential">
        <div className="footer__info">
          © 2009–2019, ООО «MIDAS», официальный сайт
        </div>
        <div className="footer__finish">
          <div>Политика конфиденциальности и оферта</div>
          <div>Пользовательское соглашение</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
