// App -> CounterApp -> Button
import Button from '../../components/Button/button'
import { useState } from "react"

// I want to increment my counter, but I only want to increment it till 10. 
// If I try to increment after 10, it should give me an error message. - conditional rendering in react

// If I want to decrement my counter, I should only be able to decrement it till -10.

function CounterApp()   {

    // state is an object wchich stores data specific to a component and triggers reloading a component when its value changes

    const [count, setCount] = useState(0)
    const [step, setStep] = useState(1)
    const [maxLimit, setMaxLimit] = useState(10)
    const [minLimit, setMinLimit] = useState(-10)
    // count is the variable, and setCount is the function which we will use to update the value of the variable count and trigger re rendering of our UI

    // Write two functions, one to increase the value of count by 1, second to decrease the value of count by 1
    const increment = () => {
        if (count < maxLimit)    {
            setCount(count + step); // increase the value of count by 1 and trigger the UI to re render
        }
    }

    const decrement = () => {
        if (count > minLimit)    {
            setCount(count - step); // decrease the value of count by 1 and trigger the UI to re render
        }
    }

    const reset = () => {
        setCount(0);
    }

    const handleStepChange = (e) => {    // this function updates the value of step, when it is edited inside the input tag
        setStep(parseInt(e.target.value));
    }

    const handleMaxLimitChange = (e) => {
        setMaxLimit(parseInt(e.target.value));
    }

    const handleMinLimitChange = (e) => {
        setMinLimit(parseInt(e.target.value));
    }

    console.log("step data type", step, typeof step)
    console.log("count data type", count, typeof count)

    // Create a button called 'Reset'. When we click on reset button, the counter should be initialized back to 0

    return (
        <>
        <h1>Counter Application!</h1>
        <div>
            <Button text={'-'} fn={decrement}></Button>
            <span className="counter">{count}</span>
            <Button text={'+'} fn={increment}></Button>
            <Button text={'Reset'} fn={reset}></Button>
        </div>

        <div>
            <p>Step Value</p>
            <input type="number" value={step} onChange={handleStepChange} ></input>
        </div>

        <div>
            <p>Maximum Limit</p>
            <input type="number" value={maxLimit} onChange={handleMaxLimitChange} ></input>
        </div>

        <div>
            <p>Minimum Limit</p>
            <input type="number" value={minLimit} onChange={handleMinLimitChange} ></input>
        </div>

        {
            count >= maxLimit && <h2>Increment is not possible!</h2>
        }
        {
            count <= minLimit && <h2>Decrement is not possible!</h2>
        }
      </>
    )
}

export default CounterApp