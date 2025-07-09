import './App.css'
import Login from './pages/Login.tsx';
import Singup from './pages/Signup.tsx';
import Dashboard from './pages/Dashborad.tsx';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Singup/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
