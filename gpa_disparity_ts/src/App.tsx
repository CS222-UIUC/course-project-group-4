import {Navigate} from 'react-router-dom';
import "./App.css";
import BackButton from "./BackButton"

function App() {
  return (
    <div className="App">
      <BackButton onClick={Navigate()}></BackButton>
    </div>
  );
}

export default App;