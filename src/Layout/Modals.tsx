import Connect from '../component/Modal/Connect/Connect'
import Install from '../component/Modal/Connect/Install'
// import Installed from '../component/Modal/Connect/Installed'
// import Verify from '../component/Modal/Connect/Verify'
import ChooseANickname from '../component/Modal/Connect/ChooseANickname'
import Installed from '../component/Modal/Connect/Installed'
import Verify from '../component/Modal/Connect/Verify'
import { ReactNode } from 'react'
import Welcome from '../component/Modal/Connect/Welcome'
import Example from '../component/Modal/Connect/Example/Example'


type Modal = {
    connect: ReactNode,
    install: ReactNode,
    verify: ReactNode,
    chooseNickname: ReactNode,
    installed: ReactNode,
    welcome: ReactNode,
    example: ReactNode
}


export const ConnectModals:Modal = {
    connect: <Connect />,
    install: <Install />,
    verify: <Verify />,
    chooseNickname: <ChooseANickname />,
    installed: <Installed />,
    welcome: <Welcome />,
    example: <Example />
}