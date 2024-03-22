import React, { useEffect, useState } from "react";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { firebaseConfig } from './firebaseConfig'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import AdminPage from "./components/AdminPage";
import Auth from './components/Auth';

firebase.initializeApp(firebaseConfig)

function App() {

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setRedirect(false);
      } else {
        setRedirect(true);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/auth" element={redirect ? <Auth /> : <Navigate to="/admin" />} />
        <Route path="/admin" element={redirect ? <Navigate to="/auth" /> : <AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;