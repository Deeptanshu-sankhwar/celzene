// App -> CounterApp -> Button
import Button from '../components/button'
import { useState } from "react"

function CounterApp()   {

    // state is an object wchich stores data specific to a component and triggers reloading a component when its value changes

    const [count, setCount] = useState(0)
    // count is the variable, and setCount is the function which we will use to update the value of the variable count and trigger re rendering of our UI

    // Write two functions, one to increase the value of count by 1, second to decrease the value of count by 1
    const increment = () => {
        setCount(count+1); // increase the value of count by 1 and trigger the UI to re render
    }

    const decrement = () => {
        setCount(count-1); // decrease the value of count by 1 and trigger the UI to re render
    }

    return (
        <>
        <h1>Counter Application!</h1>
        <div>
            <Button text={'-'} fn={decrement}></Button>
            <span className="counter">{count}</span>
            <Button text={'+'} fn={increment}></Button>
        </div>
      </>
    )
}

export default CounterApp