import Prenotazione from "../../classes/Prenotazione";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function HomeUtente() {
    const [prenotazioni, setPrenotazioni] = useState([]);
    const navigate = useNavigate();
    
    const nuovaPrenotazione = () => {
        navigate('/viewNuovaPrenotazioneUtente');
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/homeUtente/getPrenotazioni`)
          .then(res => {
            setPrenotazioni(res.data);
          })
    }, []);

    return (
        <div className="homeUtente">
            <h1>HomeUtente</h1>
            <div className="prenotazioniUtente">
                {prenotazioni.map((prenotazione) => (
                    <div className="cardPrenotazione">
                        <p>Prenotazione presso</p>
                        <h2>{prenotazione.farmacia}</h2>
                        <p>per il giorno</p>
                        <h2>{prenotazione.dataEOra}</h2>
                        <p>per la prestazione</p>
                        <h2>{prenotazione.prestazione}</h2>
                    </div>
                ))}
            </div>

            <button className="nuovaPrenotazioneButton" onClick={() => nuovaPrenotazione()}>Nuova prenotazione</button>
        </div>
    )
}