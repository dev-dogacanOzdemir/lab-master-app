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
import PrivateRoute from './PrivateRoute'; // Yeni PrivateRoute bileşenimizi import ettik
import { useState, useEffect } from 'react'; // State yönetimi için gerekli importlar

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
                <Route path="/home" element={<PrivateRoute isAuthenticated={isAuthenticated} element={Home} />} />
                <Route path="/add-report" element={<PrivateRoute isAuthenticated={isAuthenticated} element={AddReport} />} />
                <Route path="/all-reports" element={<PrivateRoute isAuthenticated={isAuthenticated} element={AllReports} />} />
                <Route path="/add-laborant" element={<PrivateRoute isAuthenticated={isAuthenticated} element={AddLaborant} />} />
                <Route path="/all-laborants" element={<PrivateRoute isAuthenticated={isAuthenticated} element={AllLaborants} />} />
                <Route path="/laborants/:id" element={<PrivateRoute isAuthenticated={isAuthenticated} element={LaborantDetails} />} />
                <Route path='/labreports/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} element={LabReportDetails} />} />
              </Routes>
            </div>
          </div>
        )}
      </div>
    </MantineProvider>
  );
}

export default App;
