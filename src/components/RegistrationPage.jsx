import React, { useState } from 'react';
import Eyes from './Eyes';
import './RegistrationPage.css';

const RegisterPage = () => {
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="register-page">
      <Eyes isPasswordFocused={isPasswordFocused} isPasswordVisible={passwordVisible} />
      <div className="register-container">
        <h2>Регистрация</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Имя пользователя</label>
            <input type="text" id="username" name="username" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Электронная почта</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="form-group password-group">
            <label htmlFor="password">Пароль</label>
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              name="password"
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
            />
            <button type="button" onClick={() => setPasswordVisible(!passwordVisible)}>
              {passwordVisible ? 'Скрыть' : 'Показать'}
            </button>
          </div>
          <button type="submit" className="submit-btn">Зарегистрироваться</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;