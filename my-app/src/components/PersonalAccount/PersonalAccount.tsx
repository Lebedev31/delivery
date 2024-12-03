import "./PersonalAccount.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useEffect, useState, useRef } from "react";
import { useGetPersonalQuery, useUpdateAvatarMutation } from "../../redux/apiPersonalAreaSlice";
import { PersonalInfo, UniversalRTKError } from "../../redux/types";
import { Link } from "react-router-dom";
import { standartError } from "../../redux/types";


function PersonalAccount() {
  const { 
    data, 
    isSuccess, 
    isError: isPersonalError, 
    error: personalError 
  } = useGetPersonalQuery();

  
  const [updateAvatar, { 
    isError: isAvatarError, 
    error: avatarError 
  }] = useUpdateAvatarMutation();

  const basePersonalError = personalError as UniversalRTKError;
  const baseAvatarError = avatarError as UniversalRTKError;
  
  const [dataPerson, setDataPerson] = useState<PersonalInfo>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const baseUrl = "http://localhost:8080/";

 
  // Обработка ошибок получения персональных данных
  useEffect(() => {
    if (isPersonalError && personalError) {
      const errorMessage = standartError(basePersonalError);
      console.log(errorMessage);
     
    }
  }, [isPersonalError, personalError]);

  // Обработка ошибок загрузки аватара
  useEffect(() => {
    if (isAvatarError && avatarError) {
      const errorMessage = standartError(baseAvatarError);
      alert(errorMessage)
    }
  }, [isAvatarError, avatarError]);

  // Обновление данных пользователя
  useEffect(() => {
    if (data && isSuccess) {
      setDataPerson(data.data);
    }
  }, [data, isSuccess]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && dataPerson?._id) {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('id', dataPerson._id);

      try {
        console.log(2)
        await updateAvatar(formData).unwrap();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section style={{ gridColumn: "1/13" }}>
      <Header />
      <div className="personal">
        <h1 className="personal__title">Личный кабинет</h1>
        <div className="personal__nav">
          <Link to="/">Главная</Link>
          <span>/</span>
          <Link to="/register">Регистрация</Link>
          <span>/</span>
          <Link to="/login">Логин</Link>
        </div>
        <div className="personal__content">
          <div className="personal__avatar">
            <img 
              src={dataPerson?.avatar ? baseUrl + dataPerson.avatar : '/default-avatar.png'} 
              alt="Аватар пользователя" 
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
              accept="image/*"
            />
            <button className="personal__avatar-btn" onClick={handleAvatarClick}>
              Изменить аватар
            </button>
          </div>
          <div className="personal__info">
            <div className="personal__info-item">
              <p className="personal__info-label">Имя:</p>
              <p className="personal__info-value">{dataPerson?.name || 'Не указано'}</p>
            </div>
            <div className="personal__info-item">
              <p className="personal__info-label">Дата рождения:</p>
              <p className="personal__info-value">{dataPerson?.dateOfBirth || 'Не указано'}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default PersonalAccount;
