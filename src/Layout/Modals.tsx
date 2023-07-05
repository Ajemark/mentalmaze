import Connect from '../component/Modal/Connect/Connect'
import Install from '../component/Modal/Connect/Install'
// import Installed from '../component/Modal/Connect/Installed'
// import Verify from '../component/Modal/Connect/Verify'
import ChooseANickname from '../component/Modal/Connect/ChooseANickname'
import Installed from '../component/Modal/Connect/Installed'
import Verify from '../component/Modal/Connect/Verify'
import {useModalContext} from "../context/ModalContext"
import { ReactNode } from 'react'

type Modal = {
    connect: ReactNode,
    install: ReactNode,
    verify: ReactNode,
    chooseNickname: ReactNode,
    installed: ReactNode,
}


export const ConnectModals:Modal = {
    connect: <Connect />,
    install: <Install />,
    verify: <Verify />,
    chooseNickname: <ChooseANickname />,
    installed: <Installed />,
}