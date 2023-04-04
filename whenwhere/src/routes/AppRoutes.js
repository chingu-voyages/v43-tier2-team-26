import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from '../pages/landingpage';
import { CreateEvent } from '../pages/CreateEvent/CreateEvent';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/create-event" element={<CreateEvent />} />
    </Routes>
  );
};
