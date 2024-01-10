import { useState, useEffect } from 'react';

const Timer = ({ targetDate, handleAnswers }: any) => {

    const [timeLeft, setTimeLeft]: any = useState(targetDate ? targetDate / 1000 : 0);


    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft((prev: number) => prev - 1);
        }, 1000);
        if (timeLeft < 1) {
            clearTimeout(timer);
            setTimeout(() => {
                handleAnswers()
            }, 10);
        }
    }, [timeLeft]);


    return (
        <h3 style={{ color: `${timeLeft > 15 ? 'white' : 'red'}` }} className='font-medium '>
            {'00'}:{timeLeft > 9 ? timeLeft : '0' + (timeLeft ?? 0)}
        </h3>
    );
};

export default Timer;