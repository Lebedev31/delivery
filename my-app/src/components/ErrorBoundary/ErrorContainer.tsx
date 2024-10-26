import "./ErrorBoundary.scss";

function ErrorContainer() {
  return (
    <div className="error__container">
      <h2>Что-то пошло не так.</h2>
      <p>Пожалуйста, перезагрузите страницу или вернитесь позже</p>
      <p></p>
    </div>
  );
}

export default ErrorContainer;
