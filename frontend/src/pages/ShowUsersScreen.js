import { useState, useEffect } from "react"
import axios from "axios";
import './ShowUsersScreen.css';

// [X] I need to integrate the api that fetch all the users in the database
// [X] I will test by trying to print if I am able to fetch all the users from the server successfully
// [X] I will take these users and I will assign them to a state variable of my component
// [X] Show these uses stored inside my state in the UI, by using .map()

// [X] Create a new row in the table which display the button delete in front of every user
// [X] When the delete button is clicked, soft delete the user
// [X] Remove the particular user from my table as well in React

// Right now, I am calling the API after the click of a button. BUT! I want to call the API as soon as my page loads

// React LifeCycle
// There are stage in the life of every react component
// Stage 1: When the component is about to render
// Stage 2: When the component renders
// Stage 3: When the component updates
// Stage 4: When the component is about to be destroyed
// Stage 5: When the component is destroyed

// useEffect is a function that basically react provides us in order to implement functions based on the stage of the component lifecycle.


function ShowUsersScreen()  {

    const [users, setUsers] = useState([])

    const fetchAllUsers = async () => {
        // I need to pass the token in the headers

        // this token will be coming from the browser cookies or local storage
        const response = await axios.get('http://localhost:4000/api/data', {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })

        // now I have to store this API response inside my state for this component, which later I can show as a table
        if (response.data.success === true) {
            setUsers(response.data.data)
        } else {
            alert(response.data.message)
        }
    }

    // I want to call fetchAllUsers function when the page loads or when my component is at stage 2 of lifecycle
    useEffect(() => {
        fetchAllUsers()
    }, [])

    const softDeleteUser = async (id) => {
        // call the api to soft delete the user
        const response = await axios.put('http://localhost:4000/api/delete/' + id)

        if (response.status === 200)    {
            // alert('User deleted successfully')

            // if the user has been deleted successfully by the backend, also remove it from my users state variable
            
            // I need to find the element inside my users array for which the _id = id coming from the function parameter and delete it from the users state
            const newUsers = users.filter(user => user._id !== id);
            setUsers(newUsers)
        } else {
            alert('Some error while trying to delete the user')
        }
    }

    const sendReminder = async (to) => {
        const payload = {
            to: to,
            subject: "Return the book",
            text: "This is a gentle reminder for you to return the book"
        }

        const response = await axios.post('http://localhost:4000/api/sendEmail', payload)

        if (response.status === 200)    {
            alert('Email sent successfully')
        } else {
            alert('Some error while trying to send the email')
        }
    }

    console.log("Print all users", users)

    return (
        <div>
            <h1>Show All the users</h1> 

            <table className="usertable">
                {
                    users.length > 0 &&
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Delete</th>
                        <th>Send Reminder</th>
                    </tr>
                }

                {
                    users.map((user, index) => {
                        return (
                            <tr key={index}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td><button onClick = {() => softDeleteUser(user._id)}>Delete</button></td>
                                <td><button onClick = {() => sendReminder(user.email)}>Send Reminder</button></td>
                            </tr>
                        )
                    })
                }
                

            </table>
        </div>
    )
}

export default ShowUsersScreen;