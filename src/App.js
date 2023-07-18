import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import Login from './pages/Login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/HomeUtente';
import HomeAdmin from './pages/HomeAdmin';
import HomeFarmacista from './pages/HomeFarmacista';
import HomeTotem from './pages/HomeTotem';
import { roles } from './pages/Mock';
import Header from './pages/Header';

function App() {
  const [token, setToken] = useState();
  let screen;

  if(token === undefined || token === null || token === roles.unregistered) {
    screen = <Login setToken={setToken} />
  } else if(token === roles.admin) {
    screen = <HomeAdmin />
  } else if(token === roles.utente) {
    screen = <Home />
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
      {screen}
    </div>
  )

  if(token === roles.admin){
    return <HomeAdmin />
  }else if(token === roles.utente){
    return <Home />
  }else if(token === roles.farmacista){
    return <HomeFarmacista />
  }else if(token === roles.totem){
    return <HomeTotem />
  }else{
    console.log("Error");
    return <Login setToken={setToken} />
  }
}

export default App;
