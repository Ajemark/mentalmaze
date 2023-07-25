/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, ReactNode, useContext, useState } from "react";

export type Modal = "installed" | "verify" | "connect" | "chooseNickname" | "install" | "installed" | "welcome" | "example" | "congratulations" | "getmore" | "hurray" | "reveal" | "collate"


type ModalContextType = {
    modal: Modal,
    ModalMode: boolean,
    switchModal: () => void,
    switchModalcontent: (value:Modal) => void,
    sideBarMode: boolean,
    switchSideMode: () => void,
    username: string | null,
    usernameHandler: (val: string) => void
};

const ModalContext = createContext<ModalContextType>({
  modal: "connect",
  ModalMode: false,
  switchModalcontent: () => {},
  switchModal: () => {},
  sideBarMode: true,
  switchSideMode: () => {},
  username: null,
  usernameHandler: () => {}
});


export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<Modal>("connect");
  const [modalMode, setmodalMode] = useState<boolean>(false)
  const [sideBarMode, setSideBarMode] = useState<boolean>(false)
  const [username, setUsername] = useState<string | null>(null)

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

  const usernameHandler = (vale:string) => {
    setUsername(vale)
  }

  return (
    <ModalContext.Provider
      value={{
        modal,
        ModalMode:modalMode,
        switchModal,
        switchModalcontent,
        switchSideMode,
        sideBarMode,
        usernameHandler,
        username
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
