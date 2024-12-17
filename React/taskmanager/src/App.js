import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <div>
                <NavBar />
              <div className="container">
                <AddTask onTaskAdded={() => window.location.reload()} />
                <TaskList />
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
