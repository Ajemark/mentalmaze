import ReactLoading from 'react-loading';

function Loading() {
  return (
    <div className='fixed top-0 left-0 h-[100%] w-[100%] bg-[rgba(0,0,0,0.8)] flex flex-col justify-center items-center z-[100000000000000000000000000000000000]'>
       <ReactLoading 
       type='spin' color='#0B77F0' height={60} width={37} />
       {/* <p>Loain</p> */}
    </div>
  )
}

export default Loading