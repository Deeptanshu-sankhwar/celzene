import './App.css';
import CounterApp from './pages/CounterApp';
import Task from './pages/Task';
import Signup from './pages/Signup';

// This app is a counter application

// in HTML, we use "class", but in JSX, we use "className"

function App() {  // App component - This is ultimate parent component of my website! App component has no parent component, it only has children
  
  // Create a Page called Signup. And add 4 input fields to it
  // Name
  // Email
  // Password
  // Role


  return (
    <div className="App">
      {/* <CounterApp /> */}
      {/* <Task /> */}
      <Signup />
    </div>
  );
}

export default App;
