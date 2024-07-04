import './App.css';
import CounterApp from './pages/CounterApp';
import Task from './pages/Task';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar.js';
import ShowUsersScreen from './pages/ShowUsersScreen'
import ShowBooksScreen from './pages/ShowBooksScreen'

// This app is a counter application

// in HTML, we use "class", but in JSX, we use "className"


// Planning for the frontend of our Library Management System
// [X] Signup/Login Screen
// [X] Navbar
// [X] There should be a screen where the admin can see all the users of the library, there should be a button for admin to remove (ban) some users
// [X] A screen with table that show all the books, Displaying images and details of books
// 5. We will also show that the book is isseued or not
// 6. There should be some UI to delete the book
// 7. There should be some UI to issue the book to the student
// 8. There should be some UI for the student to return the book
// 9. Admin should see a screen where he/she can send reminders to students who have issued the book
// 10. Screen where user can edit his/her name, password etc? (User Management Module)
// 11. There should be a screen for the student to view the book he has currently issued
// 12. Search bar which will search for books
// 13. Dropdown which shows all the books
// 14. Upload the book image
// 15. Responsiveness (Screen should be readable and understandable across all devices) - Layout [Responsive Layout]


function App() {  // App component - This is ultimate parent component of my website! App component has no parent component, it only has children
  
  // Create a Page called Signup. And add 4 input fields to it
  // Name
  // Email
  // Password
  // Role


  return (
    <Router>
        <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/todo" element={<Task />} />
          <Route path="/counter" element={<CounterApp />} />
          <Route path="/showUsers" element={<ShowUsersScreen />} />
          <Route path="/books" element={<ShowBooksScreen />} />
        </Routes>
      </div>

      </Router>
  );
}

export default App;
