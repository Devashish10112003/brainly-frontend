import './App.css'
import Login from './pages/Login.tsx';
import Singup from './pages/Signup.tsx';
import Dashboard from './pages/Dashborad.tsx';
import Landing from './pages/Landing.tsx';
import SharedDashboard from './pages/SharedDashboard.tsx';
import SharedContent from './pages/SharedContent.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Singup/>}></Route>
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        }></Route>
        <Route path='/share/:hash' element={<SharedDashboard/>}></Route>
        <Route path='/content/:contentId' element={<SharedContent/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
