import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Homepage from './components/Homepage/Homepage'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import './App.css';
import Getstarted from './components/GetStarted/Getstarted'
// import { socket } from './socket/connection'
import Code from './components/Code/code'
function App() {
  // socket.emit("join","joined message")
  return (
    <div className="App">
      
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/getstarted' element={<Getstarted />} />
        <Route path='/code/:ID' element={<Code />} />
      </Routes>
    </div>
  );
}

export default App;
