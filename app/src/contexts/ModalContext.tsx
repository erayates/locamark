import React, { createContext, useState, ReactNode } from "react";
import { IGeometry } from "../types";

interface ModalData {
  isOpen: boolean;
  data: IGeometry | null;
  type?: "Geometry" | "User" | null;
  isAdmin?: boolean;
}

interface ModalContextProps {
  modals: { [key: string]: ModalData };
  openModal: (
    modalName: string,
    data: IGeometry | null,
    type?: "Geometry" | "User" | null,
    isAdmin?: boolean
  ) => void;
  closeModal: (modalName: string) => void;
}

const initialState: { [key: string]: ModalData } = {
  update: { isOpen: false, data: null, type: null, isAdmin: false },
  table: { isOpen: false, data: null, type: null },
  create: { isOpen: false, data: null, type: null, isAdmin: false },
  updateDialog: { isOpen: false, data: null },
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
    type?: "Geometry" | "User" | null,
    isAdmin?: boolean
  ): void => {
    setModals((prevModals) => ({
      ...prevModals,
      [modalName]: { isOpen: true, data, type, isAdmin },
    }));
  };

  const closeModal = (modalName: string) => {
    setModals((prevModals) => ({
      ...prevModals,
      [modalName]: { isOpen: false, data: null, type: null, isAdmin: false },
    }));
  };

  return (
    <ModalContext.Provider value={{ modals, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
