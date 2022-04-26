import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components
import Home from "./components/home/Home";
import Availability from './components/Availability/Availability';

//styles
import './App.css';


const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <div className="sidebar">
          <p className='logo'>Logo</p>
        </div>
        <main id='modalRoot'>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/availability/:id" element={ <Availability />}/>
            {/* add results route */}
          </Routes>
        </main>
      </div>

    </Router>
  );
}

export default App;
