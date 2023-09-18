import './App.css'
import Login from './Components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/dashboard';
import Registration from './Components/register';









function App() {




  return (
    <>
      <Router>

        <div className='container' style={{display: 'flex', flexDirection: 'column'}}>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/register' element={<Registration />} />
          </Routes>
        </div>
      </Router>
    </>


  )
}






export default App;
