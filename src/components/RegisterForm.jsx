import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:8000/register', data);
      if (response.status === 201) {
        // Успешная регистрация: перенаправляем на страницу входа
        window.location.href = '/login';
      }
    } catch (error) {
      // Отображаем ошибки от бэкенда
      console.error('Ошибка регистрации:', error.response?.data?.detail);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <div>
        <input
          name="username"
          {...register('username', { required: 'Имя пользователя обязательно' })}
          placeholder="Имя пользователя"
        />
        {errors.username && <span style={{ color: 'red' }}>{errors.username.message}</span>}
      </div>
      <div>
        <input
          name="email"
          {...register('email', {
            required: 'Электронная почта обязательна',
            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Некорректный email' }
          })}
          placeholder="Электронная почта"
        />
        {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
      </div>
      <div>
        <input
          name="password"
          type="password"
          {...register('password', {
            required: 'Пароль обязателен',
            minLength: { value: 6, message: 'Пароль должен быть не менее 6 символов' }
          })}
          placeholder="Пароль"
        />
        {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
      </div>
      <div>
        <input
          name="confirmPassword"
          type="password"
          {...register('confirmPassword', { required: 'Подтверждение пароля обязательно' })}
          placeholder="Подтверждение пароля"
        />
        {errors.confirmPassword && <span style={{ color: 'red' }}>{errors.confirmPassword.message}</span>}
      </div>
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
};

export default RegisterForm;