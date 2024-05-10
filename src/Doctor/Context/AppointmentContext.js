import React, { createContext, useState, useContext } from 'react';

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const openModal = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
  };

  return (
    <AppointmentContext.Provider
      value={{
        isModalOpen,
        selectedDate,
        openModal,
        closeModal,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointmentContext = () => useContext(AppointmentContext);
