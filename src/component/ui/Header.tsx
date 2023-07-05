// import React from 'react'
import Logo from "./../../assets/header/Logo.png"

import { ConnectWalletbtn, HeaderInput } from '../Ui'
import Boarder from "./../../assets/header/Boarder.png"
import { Link, NavLink } from "react-router-dom"
import { useModalContext } from "../../context/ModalContext"

const Header = () => {
  const {switchModal} = useModalContext()

  return (
    <div className='headerbg px-10 z-20 fixed h-[104px] w-full'>
    <div className='flex justify-between items-center py-6 mx-auto'>
        <div className='flex items-center gap-8'>
        <Link to={'/'}><img src={Logo} /></Link>
        <div>
            <HeaderInput />
        </div>
        </div>

        <div className='flex items-center gap-8'>
          <NavLink to={'/profile'}><div> <img src={Boarder} alt="" /></div></NavLink>
          <ConnectWalletbtn clickHandler={() => {switchModal()}}/>
        </div>
    </div>
    </div>
  )
}

export default Header