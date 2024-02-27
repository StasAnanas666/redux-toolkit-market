import { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import Navigation from "./components/Navigation";
import AdminPage from "./components/AdminPage";
import "./App.css";

function App() {
    return (
        <Router>
            <Navigation />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/admin" element={<AdminPage />} />
            </Routes>
        </Router>
    );
}

export default App;
