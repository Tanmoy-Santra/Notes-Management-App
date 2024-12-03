
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Search from './pages/Search';
import Upload from './pages/Upload';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UniversalLoader from './components/UniversalLoader';
import Error from './components/Error';
import { setUserData, setLoading, setError } from './Redux/slices/user-slice';
import './App.css';
import NotesEditor from './components/NotesEditor';

const App = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeUserData = () => {
      dispatch(setLoading(true));
      try {
        const token = localStorage.getItem('authToken');
        const storedUserData = localStorage.getItem('userData');

        if (token && storedUserData) {
          const userData = JSON.parse(storedUserData);
          dispatch(setUserData(userData));  // Load the user data into Redux
        } else {
          dispatch(setUserData(null));  // Clear user data if no token or user data is present
        }
      } catch (err) {
        dispatch(setError('Failed to load user data'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    initializeUserData();
  }, [dispatch]);

  if (loading) {
    return <UniversalLoader />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />} />
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/home" />} />         
          <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/home" />} />
          <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/upload" element= {<Upload /> }/>
          <Route path="/profile" element= {<Profile />} />
          <Route path="/search" element= {<Search/> }/> 
          <Route path="/editor" element={<NotesEditor />} />        
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </div>
  );
};

export default App;
