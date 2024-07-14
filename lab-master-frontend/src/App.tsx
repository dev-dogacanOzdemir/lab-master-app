import './App.css';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import AddLaborant from './pages/AddLaborant';
import AddReport from './pages/AddReport';
import AllReports from './pages/AllReports';
import AllLaborants from './pages/AllLaborants';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { HeaderMenu } from './HeaderMenu';
import LaborantDetails from './components/LaborantDetails';
import LabReportDetails from './components/LabReportDetails';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useState, useEffect } from 'react';

function App() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Burada kullanıcı oturum kontrolünü yapabilirsiniz. Örneğin, bir token var mı yok mu kontrolü:
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const hideHeader = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/';

  return (
    <MantineProvider>
      <div>
        <Routes>
          <Route path='/login' element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path='/' element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
        {!hideHeader && (
          <div>
            <div className='ortala'>
              <HeaderMenu setIsAuthenticated={setIsAuthenticated} />
            </div>
            <div className='ortala'>
              <Routes>
                <Route
                  path="/home"
                  element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
                />
                <Route
                  path="/add-report"
                  element={isAuthenticated ? <AddReport /> : <Navigate to="/login" />}
                />
                <Route
                  path="/all-reports"
                  element={isAuthenticated ? <AllReports /> : <Navigate to="/login" />}
                />
                <Route
                  path="/add-laborant"
                  element={isAuthenticated ? <AddLaborant /> : <Navigate to="/login" />}
                />
                <Route
                  path="/all-laborants"
                  element={isAuthenticated ? <AllLaborants /> : <Navigate to="/login" />}
                />
                <Route
                  path="/laborants/:id"
                  element={isAuthenticated ? <LaborantDetails /> : <Navigate to="/login" />}
                />
                <Route
                  path='/labreports/:id'
                  element={isAuthenticated ? <LabReportDetails /> : <Navigate to="/login" />}
                />
              </Routes>
            </div>
          </div>
        )}
      </div>
    </MantineProvider>
  );
}

export default App;
