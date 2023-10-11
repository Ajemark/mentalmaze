import { useRef } from 'react'
import StepperControl from './StepperControl'
import Submit from './steps/Submit'
import Payments from './steps/Payments'

import { useState } from 'react'
import GameDetails from './steps/GameDetails'

export const GamedetailForm = () => {
    const contRef = useRef<HTMLDivElement>(null)
    const [currentStep, setCurrentStep] = useState(1)

    const steps: string[] = [
        'game details',
        'Payment',
        "submit"
    ]

    const handleClick = (target: number) => {
        setCurrentStep(target)
    }

    const displayStep = (step: number) => {
        switch (step) {
            case 1:
                return <GameDetails handleClick={handleClick} />
            case 2:
                return <Payments handleClick={handleClick} />
            case 3:
                return <Submit />
        }
    }

    return (
        <div className='' >
            <div className='mx-auto w-fit mt-[32px]' ref={contRef} >
                <StepperControl steps={steps} currentStep={currentStep} />
            </div>
            {displayStep(currentStep)}
        </div>
    )
}





