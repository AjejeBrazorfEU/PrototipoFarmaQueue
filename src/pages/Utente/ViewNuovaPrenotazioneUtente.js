import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';

function ViewNuovaPrenotazioneUtente() {

    const [farmacia, setFarmacia] = useState("");
    const [prestazione, setPrestazione] = useState(new Date());
    const [farmaci, setFarmaci] = useState("");
    const [dataEOra, setDataEOra] = useState("");

    const [state, setState] = useState({
        farmacia: "Farmacia Maggiore",
        dataEOra: new Date(),
        prestazione: "PRESSIONE",
        farmaci: ""
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
        console.log(state);
        e.preventDefault();
        const dataNuova = moment(state.dataEOra, "YYYY-MM-DDTHH:mm").format("DD/MM/YYYY HH:mm");
        console.log(dataNuova);
        const stato = state;
        stato.dataEOra = dataNuova;
        axios.get(`http://localhost:3001/homeUtente/nuovaPrenotazione`, {params:stato})
        .then(res => { 
                    alert("Prenotazione effettuata");
                    navigate('/homeUtente');
                        });
    };


  return (
    <div className="container">
      <h1>Nuova Prenotazione</h1>
      <div>
        <form className="form" onSubmit={e => handleSubmit(e)}>
          <div className="campoForm">
            <h4>Farmacia</h4>
            <select name="farmacia" onChange={handleInputChange} value={state.farmacia}>
                <option value="Farmacia Maggiore">Farmacia Maggiore</option>
                <option value="Farmacia Minore">Farmacia Minore</option>
            </select>
          </div>
          <div className="campoForm">
            <h4>Data e Ora</h4>
            <input type="datetime-local" name="dataEOra" onChange={handleInputChange} value={state.dataEOra}/>
          </div>
          <div className="campoForm">
            <h4>Prestazione</h4>
            <select name="prestazione" onChange={handleInputChange} value={state.prestazione}>
                <option value="PRESSIONE">Pressione</option>
                <option value="PESO">Peso</option>
                <option value="FARMACO">Farmaco</option>
                <option value="ALTRO">Altro</option>
            </select>

          </div>
          {/*
            <div className="campoForm">
                <h4>Farmaci</h4>
                <input type="text" name="farmaci" />
            </div>
            */}
          <div className="divBottoni">
            <button type="submit" className="nuovoButton">Prenota</button>
            <button onClick={() => handleClick("/HomeUtente")} className="annullaButton">Annulla</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ViewNuovaPrenotazioneUtente;