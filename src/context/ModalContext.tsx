import React, { createContext, useState, ReactNode } from "react";
import { IGeometry } from "../types";

interface ModalData {
  isOpen: boolean;
  data: IGeometry | null;
}

interface ModalContextProps {
  modals: { [key: string]: ModalData };
  openModal: (modalName: string, data: IGeometry | null) => void;
  closeModal: (modalName: string) => void;
}

const initialState: { [key: string]: ModalData } = {
  update: { isOpen: false, data: null },
  table: { isOpen: false, data: null },
  create: { isOpen: false, data: null },
  updateDialog: { isOpen: false, data: null },
};

export const ModalContext = createContext<ModalContextProps | undefined>(
  undefined
);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modals, setModals] = useState<{ [key: string]: ModalData }>(initialState);

  const openModal = (modalName: string, data: IGeometry | null) => {
    setModals((prevModals) => ({
      ...prevModals,
      [modalName]: { isOpen: true, data },
    }));
  };

  const closeModal = (modalName: string) => {
    setModals((prevModals) => ({
      ...prevModals,
      [modalName]: { isOpen: false, data: null },
    }));
  };

  return (
    <ModalContext.Provider value={{ modals, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};