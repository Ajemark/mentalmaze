import Dot from "./../../../assets/settings/Dot.svg"
import Tick from "./../../../assets/settings/Tick.svg"
import { useState, useEffect, useRef } from "react"
// import { useSearchParams } from "react-router-dom"
export interface ModeType {

    title: string,
    text: string,
    mode: string,
    link: string,
}
interface stepType {
    description: {
        title: string,
        text: string
    },
    completed: boolean,
    highlighted: boolean,
    selected: boolean
}




const StepperControl = ({currentStep, steps, checkHandler}: {steps: (string | object)[], currentStep:number, checkHandler: (val:number) => void}) => {
    const stepRef = useRef<stepType[]>();
    const [newStep, setNewStep] = useState<stepType[]>([]);

    const updateStep = (stepNumber:number, steps:stepType[]) => {
        // console.log(stepNumber)
      const newSteps = [...steps]
      let count = 0;
      
      while(count < newSteps.length) {
        console.log("run three times")
        // current step
        console.log(count, stepNumber)
        if(count === stepNumber){
            console.log("current")
            newSteps[count] = {
                ...newSteps[count],
                highlighted: true,
                selected: true,
                completed: true,
            };
            count++;
        }

        //   // step completed
        else if(count < stepNumber){
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: false,
                    selected: true,
                    completed: true,
                };
                count++;
        }
      
        else {
            newSteps[count] = {
                ...newSteps[count],
                highlighted: false,
                selected: false,
                completed: false,
            };
            count++;
        }
        
        console.log(newSteps[1])
        // step pending
      }
      return newSteps
    }

const runFunction = (text:(string | object)) => {
    if(text == "game details"){
        return {title: "Game Details",
        text: "Please provide your name and email"
        }
    }
    else if(text == "Payment"){
        return {title: "Payments",
        text: "A few details about your company"
        }
    }
    else return {title: "Submits",
    text: "Start collaborating with your team"
    }
}
    useEffect(() => {
        // create object
        const stepsStates = steps.map((step, index) => {
            if(typeof step == "string"){
            return Object.assign({
                description: runFunction(step),

                completed: false,
                highlighted: index === 0 ? true :false ,
                selected: index === 0 ? true :false 
            })}}
        )
        stepRef.current = stepsStates;
        const current = updateStep(currentStep - 1, stepRef.current)
        setNewStep(current)
    }, [steps, currentStep])

   
    const Progress = ({step, index}: {step: stepType, index:number}) => {
        useEffect(() => {
            console.log("render Progress")
        }, [])

        return (
            <div className='flex flex-col items-center steps w-full' onClick={() => checkHandler(index + 1)}>
            <div className='bullet bg-white w-[32px] h-[32px] rounded-full flex justify-center items-center relative 
            before:block before:absolute before:content-[""] before:h-[4px] before:w-[120px] sm:before:w-[160px] md:before:w-[220px] lg:before:w-[265px] before:bg-blue-50 before:-right-[120px] sm:before:-right-[160px] md:before:-right-[220px] lg:before:-right-[265px]
            after:block after:absolute after:content-[""]  after:h-[4px] after:w-[120px] sm:after:w-[160px] md:after:w-[220px] lg:after:w-[265px] after  after:bg-blue-50 after:-right-[120px] sm:after:-right-[160px] md:after:-right-[220px] lg:after:-right-[265px]'>
                {(step.highlighted && step.completed) || (step.highlighted && !step.completed)  ? <img src={Dot} /> : ""}
                {step.completed && !step.highlighted ? <img src={Tick} />: ""}
            </div>
            <h2 className={`text-[#737373] text-center hidden sm:block ${(step.highlighted && step.completed) || (step.highlighted && !step.completed)?"text-blue-main":step.completed && !step.highlighted?"text-white":"text-[#737373]"}`}>
                {step.description ? step.description.title:""}
                
            </h2>
            <p className={`text-center hidden sm:block  ${(step.highlighted && step.completed) || (step.highlighted && !step.completed)?"text-blue-main":step.completed && !step.highlighted?"text-white":"text-[#737373]"}`}>
                {step.description && step.description.text} 
            </p>
            </div>
        )
    }

    const displayStep =  newStep.map((mode, index) => <Progress step={mode} key={index} index={index}/>)
  return (
    <div className='relative flex justify-center gap-[16px] progrssBar w-[343px] sm:w-[550px]   md:w-[650px]  lg:w-[850px] ' >
       {displayStep}
    </div>
  )
}                   
export default StepperControl