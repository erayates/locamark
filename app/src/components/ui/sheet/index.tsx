import React from "react";
import styles from "./style.module.css";

import { X } from "lucide-react";

interface SheetProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  title: string;
  description: string;
}

const Sheet: React.FC<SheetProps> = ({
  open,
  setOpen,
  title,
  description,
  children,
  ...props
}) => {
  if (!open) return null;

  return (
    <div className={styles.sheetContainer} {...props}>
      <div className={styles.sheet} {...props}>
        <div className={styles.sheetHeader}>
          <div>
            <h1 className={styles.sheetTitle}>{title}</h1>
            <p className={styles.sheetDescription}>{description}</p>
          </div>
          <button className={styles.sheetClose} onClick={() => setOpen(false)}>
            <X size={20} strokeWidth={4}/>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Sheet;
