import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SettingsProvider } from './context/SettingsContext';
import Navbar from './components/Navbar/Navbar'; // Import Navbar
import Footer from './components/Footer/Footer'
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SettingsProvider>
          <Navbar /> {/* Add Navbar here */}
          <AppRoutes />
          <Footer />
        </SettingsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;