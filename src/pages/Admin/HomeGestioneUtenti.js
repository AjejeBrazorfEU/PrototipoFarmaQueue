import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { FaUnlock, FaRegTrashAlt} from "react-icons/fa";

function HomeGestioneUtenti() {
    const [utenti, setUtenti] = useState([]);
    const navigate = useNavigate();

    const handleEvent = (destination) => {
        navigate(destination);
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/homeAdmin/getUtenti`)
        .then(res => {
            setUtenti(res.data);
        })
    }, []);

    const eliminaUtente = (emailUtente) => {
        axios.get(`http://localhost:3001/homeAdmin/eliminaUtente`, {params: {email: emailUtente}})
            .then(res => {
                if(res.status == 200){
                    alert("Farmacista eliminat* con successo");
                    setUtenti(utenti.filter((utente) => utente.email != emailUtente));
                }else{
                    alert("Errore durante l'eliminazione della farmacista");
                }
            })
      }
    return (
        <div className="container">
            <h1>Gestione Utenti</h1>
            <div>
            {utenti.map((utente) => (
                <div className="cardPrenotazione">
                    <h2>{utente.nome} {utente.cognome}</h2>
                    
                    <p>Nat* il:</p>
                    <h3>{utente.data}</h3>
                    <p>email</p>
                    <h3>{utente.email}</h3>
                    <div className="divBottoni">
                        <div className="cardBottone" >
                        <div className="icona">
                            <FaUnlock size="50"/>
                        </div>
                        </div>
                                            
                        <div className="cardBottone lastButton" onClick={() => eliminaUtente(utente.email)}>
                        <div className="icona">
                            <FaRegTrashAlt size="50"/>
                        </div>
                        </div>
                    </div>
                </div>
            ))}
            </div>
            <button className="nuovoButton" onClick={() => handleEvent("/viewRegistrazioneUtenteAdmin")}>Nuovo utente</button>
        </div>
    )
}

export default HomeGestioneUtenti