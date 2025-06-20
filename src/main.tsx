import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AppProvider } from './context/AppContext';
<<<<<<< HEAD
import { ThemeProvider } from './context/ThemeContext';
=======
>>>>>>> 9bd67be8f5090565eb3bcf08805db38d3ea81cdd

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
<<<<<<< HEAD
      <ThemeProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </ThemeProvider>
=======
      <AppProvider>
        <App />
      </AppProvider>
>>>>>>> 9bd67be8f5090565eb3bcf08805db38d3ea81cdd
    </BrowserRouter>
  </StrictMode>
);