import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FaUserMd, FaLaptopMedical } from "react-icons/fa";

function HomeGestioneUtenti() {
    const [utenti, setUtenti] = useState([]);
    const navigate = useNavigate();
        
    const nuovoUtente = (destination) => {
        navigate(destination);
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/homeAdmin/getUtenti`)
        .then(res => {
            setUtenti(res.data);
        })
    }, []);

    return (
        <div className='container'>
        <h1>Gestione utenti</h1>
        <div className="prenotazioniUtente">
            {utenti.map((utente) => (
                <div className="cardPrenotazione">
                    <h2>{utente.nome} {utente.cognome}</h2>
                    <p>Nato il:</p>
                    <h3>{utente.data}</h3>
                    <p>Email</p>
                    <h3>{utente.email}</h3>
                    <div className="divBottoni">
                        <div className="cardBottone" onClick={() => nuovoUtente("/")}>
                        <div className="icona">
                            <FaUserMd size="50"/>
                        </div>
                        </div>
                        <div className="cardBottone" onClick={() => nuovoUtente("/")}>
                        <div className="icona">
                            <FaLaptopMedical size="50"/>
                        </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <button className="nuovoButton" onClick={() => nuovoUtente()}>Nuovo Utente</button>
        </div>
    );
}

export default HomeGestioneUtenti