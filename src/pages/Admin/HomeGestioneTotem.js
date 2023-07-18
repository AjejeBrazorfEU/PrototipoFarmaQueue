import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { FaUnlock, FaRegTrashAlt} from "react-icons/fa";

function HomeGestioneTotem(){
    const [totems, setTotems] = useState([]);
    const navigate = useNavigate();
    const { idFarmacia } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3001/homeAdmin/getTotem`, {params: {idFarmacia: idFarmacia}})
            .then(res => {
                setTotems(res.data);
            })
    }, []);

    const eliminaTotem = (idTotem,idFarmacia) => {
        axios.get(`http://localhost:3001/homeAdmin/eliminaTotem`, {params: {idTotem: idTotem, idFarmacia: idFarmacia}})
            .then(res => {
                if(res.status == 200){
                    alert("Totem eliminato con successo");
                    setTotems(totems.filter((totem) => totem.id != idTotem));
                }else{
                    alert("Errore durante l'eliminazione del totem");
                }
            })
    }

    const creaTotem = (idFarmacia) => {
        axios.get(`http://localhost:3001/homeAdmin/creaTotem`, {params: {idFarmacia: idFarmacia}})
            .then(res => {
                if(res.status == 200){
                    alert("Totem creato con successo");
                }else{
                    alert("Errore durante la creazione del totem");
                }
                axios.get(`http://localhost:3001/homeAdmin/getTotem`, {params: {idFarmacia: idFarmacia}})
                    .then(res => {
                        setTotems(res.data);
                    })
            })
    }


    return(
        <div className="container">
      <h1>Gestione Totem</h1>
      <div className="prenotazioniUtente">
          {totems.map((totem) => (
              <div className="cardPrenotazione">
                    <h3>IdTotem:</h3>
                    <h2>{totem.id}</h2>
                                        
                    <div className="cardBottone lastButton" onClick={() => eliminaTotem(totem.id,idFarmacia)}>
                      <div className="icona">
                          <FaRegTrashAlt size="50"/>
                      </div>
                    </div>
                </div>
          ))}
      </div>
      <button className="nuovoButton" onClick={() => creaTotem(idFarmacia)}>Nuovo Totem</button>
    </div>
    )
}

export default HomeGestioneTotem