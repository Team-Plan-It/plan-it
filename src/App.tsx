import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components
import Home from "./components/home/Home";
import Availability from './components/Availability/Availability';
// import DisplayAvailability from './components/DisplayAvailability/DisplayAvailability';

import DisplayAvailResults from './components/DisplayAvailability/DisplayAvailResults';

//styles
import './App.css';



const App: React.FC = () => {
  return (
    <Router>
      <div className="App">

        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/availability/:id" element={ <Availability />}/>
          {/* <Route path="/results" element={<DisplayAvailability />} /> */}
          <Route path="/results" element={ <DisplayAvailResults />} />
        </Routes>
      

      </div>

    </Router>
  );
}

export default App;
