import './App.css'
import Login from './pages/Login.tsx';
import Singup from './pages/Signup.tsx';
import Dashboard from './pages/Dashborad.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import { BrowserRouter as Router,Routes,Route, Navigate } from 'react-router-dom'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to="/dashboard" replace />} />
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Singup/>}></Route>
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        }></Route>
      </Routes>
    </Router>
  )
}

export default App
