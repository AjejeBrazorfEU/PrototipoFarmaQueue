import { FaNotesMedical, FaUserFriends, FaArchive } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function HomeAdmin() {
    const navigate = useNavigate();

    const handleClick = (destination) => {
        navigate(destination);
    };

    return (
        <div className="container">
            <div>
                <h1>HomeAdmin</h1>
            </div>
            <div className="elencoVisAdmin">
                <div className="cardPrenotazione" onClick={() => handleClick("/HomeGestioneFarmacie")}>
                    <h1>Gestisci farmacie</h1>
                    <div className="icona">
                        <FaNotesMedical size="150"/>
                    </div>
                </div>
                <div className="cardPrenotazione" onClick={() => handleClick("/HomeGestioneUtenti")}>
                    <h1>Gestisci utenti</h1>
                    <div className="icona">
                        <FaUserFriends size="150"/>
                    </div>
                </div>
                <div className="cardPrenotazione" onClick={() => handleClick("/ViewVisualizzaLog")}>
                    <h1>Gestisci visualizza Log</h1>
                    <div className="icona">
                        <FaArchive size="150"/>
                    </div>
                </div>
            </div>
        </div>
    )
}