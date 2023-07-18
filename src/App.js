import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import Login from './pages/Login';
import HomeUtente from './pages/Utente/HomeUtente';
import HomeAdmin from './pages/Admin/HomeAdmin';
import HomeFarmacista from './pages/Farmacista/HomeFarmacista';
import HomeTotem from './pages/Totem/HomeTotem';
import HomeGestioneFarmacisti from './pages/Admin/HomeGestioneFarmacisti';
import HomeGestioneFarmacie from './pages/Admin/HomeGestioneFarmacie';
import HomeGestioneTotem from './pages/Admin/HomeGestioneTotem';
import HomeGestioneUtenti from './pages/Admin/HomeGestioneUtenti';
import ViewAggiungiFarmacia from './pages/Admin/ViewAggiungiFarmacia';
import ViewAggiungiFarmacista from './pages/Admin/ViewAggiungiFarmacista';
import ViewAggiungiTotem from './pages/Admin/ViewAggiungiTotem';
import ViewRegistrazioneUtenteAdmin from './pages/Admin/ViewRegistrazioneUtenteAdmin';
import ViewVisualizzaLog from './pages/Admin/ViewVisualizzaLog';
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
        <Route path='/homeGestioneFarmacie' element={<HomeGestioneFarmacie/>} />
        <Route path='/homeGestioneFarmacisti' element={<HomeGestioneFarmacisti/>} />
        <Route path='/homeGestioneTotem' element={<HomeGestioneTotem/>} />
        <Route path='/homeGestioneUtenti' element={<HomeGestioneUtenti/>} />
        <Route path='/viewAggiungiFarmacia' element={<ViewAggiungiFarmacia/>} />
        <Route path='/viewAggiungiFarmacista' element={<ViewAggiungiFarmacista/>} />
        <Route path='/viewAggiungiTotem' element={<ViewAggiungiTotem/>} />
        <Route path='/viewRegistrazioneUtenteAdmin' element={<ViewRegistrazioneUtenteAdmin/>} />
        <Route path='/viewVisualizzaLog' element={<ViewVisualizzaLog/>} />
        <Route path='*' element={<p>404</p>} />
      </Routes>
    </div>
  )
}

export default App;
