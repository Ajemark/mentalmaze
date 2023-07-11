// import React from 'react'
import Logo from "./../../assets/header/Logo.png"

import { ConnectWalletbtn, HeaderInput } from '../Ui'
import Boarder from "./../../assets/header/Boarder.png"
import { Link, NavLink } from "react-router-dom"
import { useModalContext } from "../../context/ModalContext"
import { useEffect } from "react"
import { HiMenuAlt3 } from "react-icons/hi"

// type fixedType = boolean 

const Header = () => {
  const { switchModal, switchSideMode } = useModalContext()
  // const {fixed, setFixed} = useState(false)
  const fixed = true

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 104) {
        // setFixed(!true)
      }
      else {
        // setFixed(false)
      }
    })
  }, [])

  return (
    <div className={`headerbg px-[16px] md:px-10 z-[5000000000] fixed md:h-[104px] w-full pb-8 md:pb-0  ${fixed ? "shadow-lg" : "shadow-none"}`}>
      <div className='flex justify-between items-center py-6 mx-auto'>
        <div className='flex items-center gap-[16px] md:gap-8 '>
          <div className="text-white text-[36px] " onClick={switchSideMode}>
            <HiMenuAlt3 className="block md:hidden h-[32px]" />
          </div>
          <Link to={'/'} className="flex gap-[8px] md:gap-4 text-white font-Archivo_Regular items-center text-[22px]">
            <img src={Logo} className=" h-8 md:h-full " />
            Mental Maze
          </Link>
          <div className="hidden md:block">
            <HeaderInput />
          </div>
        </div>
        <div className='flex items-center gap-8'>
          <NavLink to={'/profile'}><div className="hidden md:block"> <img src={Boarder} alt="" /></div></NavLink>
          <ConnectWalletbtn clickHandler={() => { switchModal() }} />
        </div>
      </div>
      <div>
        <div className="md:hidden">
          <HeaderInput />
        </div>

      </div>
    </div>
  )
}

export default Header