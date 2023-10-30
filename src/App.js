import React, { useState, createContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './components/PrivateRoute';
import Toast from './components/Toast';

export const ToastContext = createContext(null);

function App() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const handleShowToast = (message, type) => {
    setShowToast(true);
    setToastMessage({ message, type });
  };

  const handleToastClose = () => {
    setShowToast(false);
  };

  return (
    <ToastContext.Provider value={{ showToast, toastMessage, handleShowToast, handleToastClose }}>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<PrivateRoute element={<DashboardPage />} />} />
        </Routes>
        {showToast && <Toast message={toastMessage} type={toastMessage.type} onClose={handleToastClose} />}
      </div>
    </ToastContext.Provider>
  );
}

export default App;
