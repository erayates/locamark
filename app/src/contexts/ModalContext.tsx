import React, { createContext, useState, ReactNode } from "react";
import { IGeometry } from "../types";

interface ModalData {
  isOpen: boolean;
  data: IGeometry | null;
  type?: "Geometry" | "User" | null;
}

interface ModalContextProps {
  modals: { [key: string]: ModalData };
  openModal: (modalName: string, data: IGeometry | null, type?: "Geometry" | "User" | null) => void;
  closeModal: (modalName: string) => void;
}

const initialState: { [key: string]: ModalData } = {
  update: { isOpen: false, data: null, type: null },
  table: { isOpen: false, data: null, type: null },
  create: { isOpen: false, data: null, type: null },
  updateDialog: { isOpen: false, data: null, type: null },
};

export const ModalContext = createContext<ModalContextProps | undefined>(
  undefined
);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modals, setModals] = useState<{ [key: string]: ModalData }>(
    initialState
  );

  const openModal = (
    modalName: string,
    data: IGeometry | null,
    type?: "Geometry" | "User" | null
  ): void => {
    setModals((prevModals) => ({
      ...prevModals,
      [modalName]: { isOpen: true, data, type },
    }));
  };

  const closeModal = (modalName: string) => {
    setModals((prevModals) => ({
      ...prevModals,
      [modalName]: { isOpen: false, data: null, type: null },
    }));
  };

  return (
    <ModalContext.Provider value={{ modals, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
