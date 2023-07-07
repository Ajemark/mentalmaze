import Search from "./../assets/header/Search.png"

export const HeaderInput = () => {
    return(
        <div className="border-blue-50 rounded-2xl   border-2 flex items-center justify-center gap-6 px-10 font-normal text-sm  font-Archivo_Regular ">
            <img src={Search} />
            <input type="text" placeholder="Search Games Or Collections..." className="bg-[inherit] py-4  outline-none border-0"/>
        </div>
    )
}
type ConnectTyype = {
    clickHandler: () => void
}

export const ConnectWalletbtn = ({clickHandler}:ConnectTyype) => {
    return(
        <button className=" rounded-2xl border-2 py-4 px-10 font-normal font-Archivo_Regular text-[15px] leading-[16.32px] header-button text-[#ffffff]" onClick={clickHandler}>
            CONNECT WALLET
          </button>
    )
}