import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { FaUserMd, FaLaptopMedical, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

export default function HomeUtente() {
    const {idUtente} = useParams();
    const [prenotazioni, setPrenotazioni] = useState([]);
    const navigate = useNavigate();
    
    const nuovaPrenotazione = () => {
        navigate('/viewNuovaPrenotazioneUtente/' + idUtente);
    }

    const eliminaPrenotazione = (prenotazione) => {
        axios.get(`http://localhost:3001/homeUtente/eliminaPrenotazione`, {params: prenotazione})
        .then(res => {
            alert("Prenotazione eliminata con successo");
            axios.get(`http://localhost:3001/homeUtente/getPrenotazioni`)
            .then(res => {
                setPrenotazioni(res.data);
            })
        })
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/homeUtente/getPrenotazioni`, {params: {idUtente: idUtente}})
          .then(res => {
            setPrenotazioni(res.data);
          })
    }, []);

    return (
        <div className="container">
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
                        <div className="cardBottone lastButton" onClick={() => eliminaPrenotazione(prenotazione)}>
                            <div className="icona">
                                <FaRegTrashAlt size="50"/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button className="nuovoButton" onClick={() => nuovaPrenotazione()}>Nuova prenotazione</button>
        </div>
    )
}