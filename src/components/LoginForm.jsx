import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:8000/login', data);
      if (response.status === 200) {
        // Успешный вход: перенаправляем на главную страницу или dashboard
        window.location.href = '/dashboard';
      }
    } catch (error) {
      // Выводим ошибку в консоль (можно добавить в UI)
      console.error('Ошибка входа:', error.response?.data?.detail || 'Что-то пошло не так');
      // Для UX можно показать ошибку пользователю, например, через alert
      alert('Неверное имя пользователя или пароль');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}
    >
      <div style={{ marginBottom: '15px' }}>
        <input
          name="username"
          {...register('username', { required: 'Имя пользователя обязательно' })}
          placeholder="Имя пользователя"
          style={{ width: '100%', padding: '8px', fontSize: '16px' }}
        />
        {errors.username && <span style={{ color: 'red' }}>{errors.username.message}</span>}
      </div>
      <div style={{ marginBottom: '15px' }}>
        <input
          name="password"
          type="password"
          {...register('password', { required: 'Пароль обязателен' })}
          placeholder="Пароль"
          style={{ width: '100%', padding: '8px', fontSize: '16px' }}
        />
        {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
      </div>
      <button 
        type="submit"
        style={{ 
          backgroundColor: '#4CAF50', 
          color: 'white', 
          padding: '10px', 
          border: 'none', 
          cursor: 'pointer', 
          width: '100%' 
        }}
      >
        Войти
      </button>
    </form>
  );
};

export default LoginForm;