import { useState } from "react"

function Task() {

    const [tasks, setTasks] = useState([])  // this is an array which is gonna be the list of all my tasks
    const [task, setTask] = useState('')

    const handleTaskChange = (e) => {
        setTask(e.target.value)
    }

    console.log("My Tasks", tasks)
    
    const createTask = () => {
        // I need to take the task variable and push it inside my tasks array
        setTasks([...tasks, task]);
        setTask('')
    }

    // tasks = ['Get Grocery', 'Teach Intro to React', 'Workout', 'Drink 5L Milk', 'Collect Newspaper']
    // newTasks = ['Get Grocery', 'Teach Intro to React', 'Workout', 'Drink 5L Milk', 'Collect Newspaper']
    // index = 2
    // newTasks = ['Get Grocery', 'Teach Intro to React', 'Workout', 'Drink 5L Milk', 'Collect Newspaper']

    const removeTask = (index) => {
        const newTasks = [...tasks]
        newTasks.splice(index, 1)
        setTasks(newTasks)
    }

    return (
        <>
            <h1>Task App</h1>

            {
                tasks.map((item, index) => {
                    return (
                    <div>
                        <a>{item} &nbsp;</a>
                        <button onClick={() => removeTask(index)}>Delete Task</button>
                    </div>)
                })
            }

            <div>
                <h3>Create a new task</h3>
                <input type="text" value={task} onChange={handleTaskChange}></input>
                <button onClick={createTask}>Create Task</button>
            </div>
        </>
    )
}

export default Task;


// an example of a task is "Read papers on Graph Coloring"