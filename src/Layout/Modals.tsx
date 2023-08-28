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
import Congratulations from '../component/Modal/Connect/game/Congratulations'
import Getmore from '../component/Modal/Connect/game/Getmore'
import Hurray from '../component/Modal/Connect/game/Hurray'
import Reveal from '../component/Modal/Connect/game/Reveal'
import Collating from '../component/Modal/Connect/game/Collating'
import ChallengerModal from '../component/Modal/ChallengerModal'
import Authenticate from '../component/Modal/Connect/Authenticate'
import EditProfile from '../component/Modal/EditProfile'


type Modal = {
    connect: ReactNode,
    install: ReactNode,
    authenticate:ReactNode,
    verify: ReactNode,
    chooseNickname: ReactNode,
    installed: ReactNode,
    welcome: ReactNode,
    example: ReactNode,
    congratulations: ReactNode, 
    getmore: ReactNode,
    hurray: ReactNode,
    reveal: ReactNode,
    collate: ReactNode,
    challenger: ReactNode,
    editProfile: ReactNode
}


export const ConnectModals:Modal = {
    connect: <Connect />,
    install: <Install />,
    authenticate:<Authenticate/>,
    verify: <Verify />,
    chooseNickname: <ChooseANickname />,
    installed: <Installed />,
    welcome: <Welcome />,
    example: <Example />,
    congratulations: <Congratulations />,
    getmore: <Getmore />,
    hurray: <Hurray />,
    reveal: <Reveal />,
    collate: <Collating />,
    challenger: <ChallengerModal />,
    editProfile: <EditProfile/>
}