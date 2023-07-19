import { useNavigate } from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function HomeFarmacista() {
    const [prenotazioni, setPrenotazioni] = useState([]);

    // Prende le prenotazioni della farmacia maggiore
    useEffect(() => {
        axios.get(`http://localhost:3001/homeFarmacista/getPrenotazioni`, { params: { idFarmacia: 699697 } })
          .then(res => {
            setPrenotazioni(res.data);
          })
    }, []);

    const avantiUnAltro = () => {
        axios.get(`http://localhost:3001/homeFarmacista/avantiUnAltro`, { params: { idFarmacia: 699697 } })
            .then(res => {
                setPrenotazioni(res.data);
            }
        )
    }


    return (
        <div className="container">
            <h1>HomeFarmacista</h1>

            <h2>Numero di persone in fila: {prenotazioni.length}</h2>

            <h3>Prossimo Appuntamento da servire:</h3>

            <div className="prenotazioniUtente">
                {prenotazioni.slice(0,1).map((prenotazione) => (
                    <div className="cardPrenotazione cardNew">
                        <p>Orario</p>
                        <h1>{prenotazione.dataEOra}</h1>
                        <p>Prestazione</p>
                        <h2>{prenotazione.prestazione}</h2>
                    </div>
                ))}
            </div>
        
            <h4>Prossimi Appuntamenti:</h4>
            <div className="prenotazioniUtente cardFarmacisti">
                {prenotazioni.slice(1,prenotazioni.length).map((prenotazione) => (
                    <div className="cardPrenotazione">
                        <p>Orario</p>
                        <h1>{prenotazione.dataEOra}</h1>
                        <p>Prestazione</p>
                        <h2>{prenotazione.prestazione}</h2>
                    </div>
                ))}
            </div>

            <button className="nuovoButton" onClick={() => avantiUnAltro()}>Avanti un'altro</button>
        </div>
    )
}