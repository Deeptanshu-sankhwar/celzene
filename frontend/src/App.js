import './App.css';
import CounterApp from './pages/CounterApp';
import Task from './pages/Task';

// This app is a counter application

// in HTML, we use "class", but in JSX, we use "className"

function App() {  // App component - This is ultimate parent component of my website! App component has no parent component, it only has children
  
  return (
    <div className="App">
      {/* <CounterApp /> */}
      <Task />
    </div>
  );
}

export default App;
