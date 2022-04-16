import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components
import Home from "./components/home/Home";
import Availability from './components/Availability/Availability';

//styles
import './App.css';
import DisplayAvailability from './components/DisplayAvailability/DisplayAvailability';


const App: React.FC = () => {
  return (
    <Router>
      <div className="App">

        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/availability" element={ <Availability />}/>
          <Route path="/results" element={<DisplayAvailability />}/>
        </Routes>
      

      </div>

    </Router>
  );
}

export default App;
