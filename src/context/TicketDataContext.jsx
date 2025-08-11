"use client";
import React, { createContext, useState, useContext } from "react";

export const TicketDataContext = createContext();

export const TicketDataProvider = ({ children }) => {
  const [selectedDataTicket, setSelectedDataTicket] = useState({});

  return (
    <TicketDataContext.Provider
      value={{ selectedDataTicket, setSelectedDataTicket }}
    >
      {children}
    </TicketDataContext.Provider>
  );
};

// export const useTicketData = () => {
//   const context = useContext(TicketDataContext);
//   // if (!context) {
//   //   throw new Error("useTicketData harus dipakai di dalam TicketDataProvider");
//   // }
//   return context;
// };
