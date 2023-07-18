import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

function ViewRegistraUtente() {
    const [state, setState] = useState({
        nome: "",
        cognome: "",
        data: "",
        email: "",
        password: "",
      });
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setState((prevProps) => ({
          ...prevProps,
          [name]: value
        }));
      };

  const navigate = useNavigate();

    const handleClick = (destination) => {
        navigate(destination);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:3001/homeUtente/registraUtente`, {params:state})
            .then(res => { 
                if(res.status === 200){
                        alert("Registrazione effettuata");
                        navigate('/');
                }else{
                        alert("Registrazione la prenotazione");
                }
            });
    };


  return (
    <div className="container">
      <h1>Crea account</h1>
      <div>
        <form className="form" onSubmit={e => handleSubmit(e)}>
          <div className="campoForm">
            <h4>Nome</h4>
            <input type="text" name="nome" onChange={handleInputChange} value={state.nome}/>
          </div>
          <div className="campoForm">
            <h4>Cognome</h4>
            <input type="text" name="cognome" onChange={handleInputChange} value={state.cognome}/>
          </div>
          <div className="campoForm">
            <h4>Data di nascita</h4>
            <input type="date" name="data" onChange={handleInputChange} value={state.data}/>
          </div>
          <div className="campoForm">
            <h4>Email</h4>
            <input type="text" name="email" onChange={handleInputChange} value={state.email}/>
          </div>
            <div className="campoForm">
                <h4>Password</h4>
                <input type="password" name="password" onChange={handleInputChange} value={state.password}/>
            </div>
          {/*
            <div className="campoForm">
                <h4>Farmaci</h4>
                <input type="text" name="farmaci" />
            </div>
            */}
          <div className="divBottoni">
            <button type="submit" className="nuovoButton">Crea Account</button>
            <button onClick={() => handleClick("/")} className="annullaButton">Annulla</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ViewRegistraUtente;