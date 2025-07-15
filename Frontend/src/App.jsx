import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Form from "./components/Form"
import Report from "./components/Report";

const App = () => {
  return (
    <>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Feedback System</h1>
            <div>
              <Link to="/" className="hover:underline">Feedback Form</Link>
              <Link to="/report" className="hover:underline">Admin Report</Link>
            </div>
          </nav>

          <div>
            <Routes>
              <Route path="/" element={<Form/>}/>
              <Route path="/report" element={<Report/>}/>
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
};

export default App;
