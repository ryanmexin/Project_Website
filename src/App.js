import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import TodoApp from "./components/TodoApp";
import Calculator from "./components/Calculator";
import Weather from "./components/Weather";
import Movie from "./components/Movie";
import Nasa from "./components/Nasa";
import Food from "./components/food";
import "./App.css";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="App">
      <header>
        <h1>Project Dashboard</h1>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
        <nav className={isMenuOpen ? "nav open" : "nav"}>
          <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/todo" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Todo List
          </Link>
          <Link to="/calculator" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Calculator
          </Link>
          <Link to="/weather" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Weather
          </Link>
          <Link to="/movie" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Movie Search
          </Link>
          <Link to="/nasa" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Planet Search
          </Link>
          <Link to="/food" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Recipe Finder
          </Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<TodoApp />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/nasa" element={<Nasa />} />
          <Route path="/food" element={<Food/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
