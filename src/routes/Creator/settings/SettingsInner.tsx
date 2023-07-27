import { useRef, useEffect } from 'react'


import StepperControl from './StepperControl'
import Submit from './steps/Submit'
import Payments from './steps/Payments'
import { Instruction } from '../../../component/Ui'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { ModeType } from './StepperControl'
// import {useFormik} from "formik"
import GameDetails from './steps/GameDetails'

export const GamedetailForm = () => {
    const [searchParams] = useSearchParams();
    const contRef = useRef<HTMLDivElement>(null)
    const [currentStep, setCurrentStep] = useState(1)
    const steps:string[] = [
        'game details',
        'Payment',
        "submit"
    ]

    const handleClick = () => {
        console.log("Handling Click")
        console.log("Handling the fucjkitksajs")
        setCurrentStep(currentStep + 1)
    } 

    const displayStep = (step:number) => {
        switch(step) {
            case 1:
                return <GameDetails handleClick={handleClick}/>
            case 2:
                return <Payments  handleClick={handleClick}/>
            case 3:
                return <Submit />
        }
    }
   

    const [modes, setMode] = useState<ModeType[]>([{
        title: "Game Details",
        text: "Please provide your name and email",
        mode: "current",
        link: "game-details"
    },
    {
        title: "Payments",
        text: "A few details about your company",
        mode: "pending",
        link: "payments"
    }, {
        title: "Start Collaborating with your team",
        text: "Please provide your name and email",
        mode: "pending",
        link: "collaborate"
    },])


    const checkHandler = (value:number) => {
        setCurrentStep(value)
    }

    return (
        <div className='' >
            <div className='mx-auto w-fit mt-[32px]' ref={contRef} >
                <StepperControl  steps={steps} currentStep={currentStep} checkHandler={checkHandler}/>
            </div>
            {displayStep(currentStep)}
        </div>
    )
}





