import React, { useEffect } from 'react';
import './Eyes.css';

const Eyes = ({ isPasswordFocused, isPasswordVisible }) => {
  useEffect(() => {
    const pupils = document.querySelectorAll('.pupil');
    const eyes = document.querySelectorAll('.eye');

    const handleMouseMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      pupils.forEach((pupil, index) => {
        const eye = eyes[index];
        const eyeRect = eye.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;

        const angle = Math.atan2(mouseY - eyeCenterY, mouseX - eyeCenterX);
        const maxDistance = 10; // Ограничение движения зрачка
        const pupilX = Math.cos(angle) * maxDistance;
        const pupilY = Math.sin(angle) * maxDistance;

        pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="eyes-container">
      <div className={`eye left-eye ${isPasswordFocused && !isPasswordVisible ? 'closed' : ''}`}>
        <div className="pupil"></div>
      </div>
      <div className={`eye right-eye ${isPasswordFocused ? 'closed' : ''}`}>
        <div className="pupil"></div>
      </div>
    </div>
  );
};

export default Eyes;