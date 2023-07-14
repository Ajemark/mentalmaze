/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, ReactNode, useContext, useState } from "react";

export type Modal = "installed" | "verify" | "connect" | "chooseNickname" | "install" | "installed" 


type ModalContextType = {
    modal: Modal,
    ModalMode: boolean,
    switchModal: () => void,
    switchModalcontent: (value:Modal) => void,
    sideBarMode: boolean,
    switchSideMode: () => void
};

const ModalContext = createContext<ModalContextType>({
  modal: "connect",
  ModalMode: false,
  switchModalcontent: () => {},
  switchModal: () => {},
  sideBarMode: true,
  switchSideMode: () => {}
});


export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<Modal>("connect");
  const [modalMode, setmodalMode] = useState<boolean>(false)
  const [sideBarMode, setSideBarMode] = useState<boolean>(false)

  const switchModal = () => {
    console.log("switching modal")
    setmodalMode(!modalMode);
  };

  const switchModalcontent = (modal:Modal) => {
    setModal(modal)
  }

  const switchSideMode = () => {
    setSideBarMode(!sideBarMode)
  }


  return (
    <ModalContext.Provider
      value={{
        modal,
        ModalMode:modalMode,
        switchModal,
        switchModalcontent,
        switchSideMode,
        sideBarMode
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
