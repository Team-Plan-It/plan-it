import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components
import Home from "./components/home/Home";
import Availability from "./components/Availability/Availability";
import DisplayAvailResults from "./components/DisplayAvailability/DisplayAvailResults";
import Error404 from "./components/Errors/Error404";
import Overlap from "./components/Overlap/Overlap"

//styles
import "./App.css";



const App: React.FC = () => {
  return (
    <Router>
      <div className="App">

        <main id='modalRoot'>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/availability/:id" element={ <Availability />}/>
            <Route path="/overlapping/:id" element={<Overlap />} />
            <Route path="/results/:id" element={ <DisplayAvailResults />} />
            <Route element={<Error404 />}/>
          </Routes>
        </main>
      </div>

    </Router>
  );
}

export default App;
