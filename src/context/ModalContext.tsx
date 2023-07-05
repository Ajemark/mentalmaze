/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, ReactNode, useContext, useState } from "react";

export type Modal = "installed" | "verify" | "connect" | "chooseNickname" | "install" | "installed" 


type ModalContextType = {
    modal: Modal,
    ModalMode: boolean,
    switchModal: () => void,
    switchModalcontent: (value:Modal) => void
};

const ModalContext = createContext<ModalContextType>({
  modal: "connect",
  ModalMode: false,
  switchModalcontent: () => {},
  switchModal: () => {},
});


export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<Modal>("connect");
  const [modalMode, setmodalMode] = useState<boolean>(false)

  const switchModal = () => {
    setmodalMode(!modalMode);
  };

  const switchModalcontent = (modal:Modal) => {
    setModal(modal)
  }


  return (
    <ModalContext.Provider
      value={{
        modal,
        ModalMode:modalMode,
        switchModal,
        switchModalcontent
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
