import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SettingsProvider } from './context/SettingsContext';
import Navbar from './components/Navbar/Navbar'; // Import Navbar
import Footer from './components/Footer/Footer'
import AppRoutes from './routes/AppRoutes';
import ScrollToTop from './routes/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
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