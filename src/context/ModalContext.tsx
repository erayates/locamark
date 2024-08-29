import React, { createContext, useState, ReactNode } from "react";
import { IGeometry } from "../types";

interface ModalContextProps {
  currentModal: string;
  isOpen: boolean;
  openModal: (modalName: string, data: IGeometry) => void;
  closeModal: () => void;
  featureData: IGeometry | null;
}

export const ModalContext = createContext<ModalContextProps | undefined>(
  undefined
);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentModal, setCurrentModal] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [featureData, setFeatureData] = useState<IGeometry | null>(null);

  const openModal = (modalName: string, data: IGeometry) => {
    setCurrentModal(modalName);
    setIsOpen(true);
    setFeatureData(data);
  };

  const closeModal = () => {
    setCurrentModal("");
    setIsOpen(false);
    setFeatureData(null);
  };

  return (
    <ModalContext.Provider
      value={{ currentModal, isOpen, openModal, closeModal, featureData }}
    >
      {children}
    </ModalContext.Provider>
  );
};
