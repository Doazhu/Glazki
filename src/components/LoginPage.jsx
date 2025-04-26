import React, { useState } from 'react';
import Eyes from './Eyes';
import './LoginPage.css';

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="login-page">
      <Eyes isPasswordFocused={isPasswordFocused} isPasswordVisible={passwordVisible} />
      <div className="login-container">
        <h2>Вход</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Имя пользователя</label>
            <input type="text" id="username" name="username" />
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
            <button type="button" onClick={togglePasswordVisibility}>
              {passwordVisible ? 'Скрыть' : 'Показать'}
            </button>
          </div>
          <button type="submit" className="submit-btn">Войти</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;