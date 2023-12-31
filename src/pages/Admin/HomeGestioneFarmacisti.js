import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { FaUnlock, FaRegTrashAlt} from "react-icons/fa";

function HomeGestioneFarmacisti() {
  const [farmacisti, setFarmacisti] = useState([]);
  const navigate = useNavigate();
  const { idFarmacia } = useParams();
    
  const handleEvent = (destination) => {
      navigate(destination);
  }

  useEffect(() => {
    axios.get(`http://localhost:3001/homeAdmin/getFarmacisti`, {params: {idFarmacia: idFarmacia}})
      .then(res => {
        setFarmacisti(res.data);
      })
  }, []);

  const eliminaFarmacista = (idFarmacista) => {
    axios.get(`http://localhost:3001/homeAdmin/eliminaFarmacista`, {params: {idFarmacista: idFarmacista}})
        .then(res => {
            if(res.status == 200){
                alert("Farmacista eliminat* con successo");
                setFarmacisti(farmacisti.filter((farmacista) => farmacista.id != idFarmacista));
            }else{
                alert("Errore durante l'eliminazione della farmacista");
            }
        })
  }

  return (
    <div className="container">
      <h1>Gestione Farmacisti</h1>
      <div className="prenotazioniUtente">
          {farmacisti.map((farmacista) => (
              <div className="cardPrenotazione">
                  <h2>{farmacista.nome} {farmacista.cognome}</h2>
                  
                  <p>Nat* il:</p>
                  <h3>{farmacista.data}</h3>
                  <p>Id</p>
                  <h3>{farmacista.id}</h3>
                  <div className="divBottoni">
                    <div className="cardBottone" >
                      <div className="icona">
                          <FaUnlock size="50"/>
                      </div>
                    </div>
                                        
                    <div className="cardBottone lastButton" onClick={() => eliminaFarmacista(farmacista.id)}>
                      <div className="icona">
                          <FaRegTrashAlt size="50"/>
                      </div>
                    </div>
                  </div>
              </div>
          ))}
      </div>
      <button className="nuovoButton" onClick={() => handleEvent("/viewAggiungiFarmacista/"+idFarmacia)}>Nuovo farmacista</button>
    </div>
  );
}

export default HomeGestioneFarmacisti;