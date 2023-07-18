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
        <div className="">
            <h1>HomeFarmacista</h1>

            <h3>Prossimi Appuntamenti:</h3>

            <div className="prenotazioniUtente">
                {prenotazioni.map((prenotazione) => (
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