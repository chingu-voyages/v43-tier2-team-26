import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from '../pages/landingpage';
import { CreateEvent } from '../pages/CreateEvent/CreateEvent';
import LoginPage from '../pages/loginpage';
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} /> 
      <Route path="/login" element={<LoginPage />} /> 
      <Route path="/create-event" element={<CreateEvent />} />
    </Routes>
  );
};
