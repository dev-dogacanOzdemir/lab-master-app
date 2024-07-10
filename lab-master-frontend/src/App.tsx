import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AddLaborant from './pages/AddLaborant'
import AddReport from './pages/AddReport'
import AllReports from './pages/AllReports'
import AllLaborants from './pages/AllLaborants'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { HeaderMenu } from './HeaderMenu'
import LaborantDetails from './components/LaborantDetails'
import LabReportDetails from './components/LabReportDetails'
function App() {


  return <MantineProvider>{

    <div>
      <div>
        <div className='ortala'>
          <HeaderMenu />
        </div>
        <div className='ortala' >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-report" element={<AddReport />} />
            <Route path="/all-reports" element={<AllReports />} />
            <Route path="/add-laborant" element={<AddLaborant />} />
            <Route path="/all-laborants" element={<AllLaborants />} />
            <Route path="/laborants/:id" element={<LaborantDetails />} />
            <Route path='/labreports/:id' element={<LabReportDetails />} />
          </Routes>
        </div>
      </div>


    </div>
  } </MantineProvider>
}

export default App
