import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Practice from './pages/Practice';
import Test from './pages/Test';
import QuestionPage from './pages/QuestionPage';
import TestPage from './pages/TestPage';
import './styles/App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <h2>NEETaspire Loading...</h2>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/login" 
            element={!user ? <Login /> : <Navigate to="/home" />} 
          />
          <Route 
            path="/signup" 
            element={!user ? <Signup /> : <Navigate to="/home" />} 
          />
          <Route 
            path="/home" 
            element={user ? <Home user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/chat" 
            element={user ? <Chat user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/practice" 
            element={user ? <Practice user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/test" 
            element={user ? <Test user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/questions/:subject/:chapter/:count" 
            element={user ? <QuestionPage user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/test-page" 
            element={user ? <TestPage user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/" 
            element={<Navigate to={user ? "/home" : "/login"} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
