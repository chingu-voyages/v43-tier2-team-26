import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from '../pages/landingpage';
import { CreateEvent } from '../pages/CreateEvent/CreateEvent';
import LoginPage from '../pages/loginpage';
import { AvailabilityPage } from '../pages/SelectAvailability/AvailabilityPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/:id/login" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/create-event" element={<CreateEvent />} />
      <Route path="/availability" element={<AvailabilityPage />} />
      <Route
        path="/:id/select-availability/:id"
        element={<AvailabilityPage />}
      />
    </Routes>
  );
};
