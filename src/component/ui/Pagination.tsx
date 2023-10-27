import arrow from '../../assets/arrow.svg'

export const Pagination = ({ handler }: any) => {
    return (
        <div>
            <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px text-[rgba(11,119,240,1)] text-sm ">
                    <li>

                        <button onClick={() => handler('prev')} className="flex items-center justify-center px-3 h-8 ml-0 leading-tight border border-2 border-[rgba(11,119,240,1)] rounded-l-lg ">
                            <img src={arrow} className='object-fill mr-2' alt="" />
                            Previous
                        </button>
                    </li>
                    <li>
                        <button onClick={() => handler(1)} className="flex items-center justify-center px-3 h-8 leading-tight border border-2 border-[rgba(11,119,240,1)] ">1</button>
                    </li>
                    <li>
                        <button onClick={() => handler(2)} className="flex items-center justify-center px-3 h-8 leading-tight border border-2 border-[rgba(11,119,240,1)] ">2</button>
                    </li>
                    <li>
                        <button onClick={() => handler(3)} className="flex items-center justify-center px-3 h-8 leading-tight border border-2 border-[rgba(11,119,240,1)] ">3</button>
                    </li>

                    <li>
                        <button onClick={() => handler(4)} className="flex items-center justify-center px-3 h-8 leading-tight border border-2 border-[rgba(11,119,240,1)] ">4</button>
                    </li>
                    <li>
                        <button onClick={() => handler(5)} className="flex items-center justify-center px-3 h-8 leading-tight border border-2 border-[rgba(11,119,240,1)] ">5</button>
                    </li>
                    <li>
                        <button onClick={() => handler('next')} className="flex items-center justify-center px-3 h-8 leading-tight border border-2 border-[rgba(11,119,240,1)] rounded-r-lg ">
                            Next
                            <img src={arrow} className='object-fill rotate-[180deg] ml-2 ' alt="" />
                        </button>
                    </li>
                </ul>
            </nav>

        </div>
    )
}
