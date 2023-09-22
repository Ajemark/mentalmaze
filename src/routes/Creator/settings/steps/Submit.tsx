import { useContext } from "react";
import { UserContext } from "../../../../context/UserContext";
import Loading from "../../../../component/ui/Loading";

const Submit = () => {

const {token, title, questionObj, duration, questions,images,comments,gameToken,priceShare,userDetails,loading,setLoading}:any = useContext(UserContext)


console.log(questionObj)
console.log(userDetails)

const submitGameApplication=async()=>{
    setLoading(true)
    let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${token}`);


let raw = JSON.stringify({
  "title": title,
  "image": `https://mentalmaze-game.infura-ipfs.io/ipfs/${images.cid.toString()}`,
  "question": questions,
  "durationInHours": duration,
  "comments": comments,
  "accountId": userDetails?.id,
  "amountDeposited": gameToken,
  "rewardDistribution": priceShare,
  "address":userDetails?.address
});

let requestOptions:RequestInit = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

await fetch("https://mentalmaze-game.onrender.com/api/game/create", requestOptions)
  .then(response => response.json())
  .then(result => {
    setLoading(false)
    console.log(result)})
  .catch(error => console.log('error', error));
}


    return (
        <div className='px-[16px] md:px-[48px]'>
            {loading && <Loading/>}
            <div className='text-[16px] md:text-[20px] font-Archivo_Regular  text-white  flex flex-col gap-6 mt-[48px] font-[200]'>
                <p className=' md:leading-[31.76px]'> Hi there!</p>
                <p className=' md:leading-[31.76px]'> I’m sure you can’t wait to have your game published. So are we, congratulations creator.</p>

                <p className=' md:leading-[31.76px]'> To be sure, your game meets all of our requirements, we will have the judges go through the game. Once they have verified the authenticity of your game guess what? It will be live.</p>

                <p className=' md:leading-[31.76px]'> And if otherwise, you have nothing to worry about, your deposit of 3 Aurora Token, will be refunded to your wallet.</p>

                <p className=' md:leading-[31.76px]'> If you need further assistance, do not hesitate to reach us on discord. Our response team, will be happy to answer any question you might have.</p>

                <p className=' md:leading-[31.76px]'> Thank you, Creator! Goodluck on your application.</p>
            </div>
            <div className=" flex flex-col gap-[24px] mt-[48px] w-full ">
                <button 
                onClick={submitGameApplication}
                className="w-full bg-blue-50 text-white text-[15px] font-Archivo_Regular rounded-[16px] border-[2px] border-blue-main py-[16px] ">
                    SUBMIT APPLICATION
                </button>
            </div>
        </div>
    )
}


export default Submit