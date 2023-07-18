import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import Login from './pages/Login';
import HomeUtente from './pages/Utente/HomeUtente';
import HomeAdmin from './pages/Admin/HomeAdmin';
import HomeFarmacista from './pages/Farmacista/HomeFarmacista';
import HomeTotem from './pages/Totem/HomeTotem';
import { roles } from './pages/Mock';
import Header from './pages/Header';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ViewNuovaPrenotazioneUtente from './pages/Utente/ViewNuovaPrenotazioneUtente';


function App() {
  const navigate = useNavigate();
  const [token, setToken] = useState();
  let screen;

  if(token === undefined || token === null || token === roles.unregistered) {
    navigate('/');
  } else if(token === roles.admin) {
    screen = <HomeAdmin />
  } else if(token === roles.utente) {
    screen = <HomeUtente />
  } else if(token === roles.farmacista) {
    screen = <HomeFarmacista />
  } else if(token === roles.totem) {
    screen = <HomeTotem />
  } else {
    screen = <Login setToken={setToken} />
  }

  return(
    <div className='Container'>
      <Header />

      <Routes>
        <Route path='/' element={<Login setToken={setToken}/>} />
        <Route path='/homeUtente' element={<HomeUtente/>} />
        <Route path='/homeAdmin'  element={<HomeAdmin/>}/>
        <Route path='/homeFarmacista' element={<HomeFarmacista/>} />
        <Route path='/homeTotem' element={<HomeTotem/>} />
        <Route path='/viewNuovaPrenotazioneUtente' element={<ViewNuovaPrenotazioneUtente/>} />
        <Route path='*' element={<p>404</p>} />
      </Routes>
    </div>
  )
}

export default App;
