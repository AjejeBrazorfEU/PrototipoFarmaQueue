import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate,useParams } from "react-router-dom";
import { FaUserMd, FaLaptopMedical, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

function HomeGestioneFarmacie() {
  const { idFarmacia } = useParams();
  const [farmacie, setFarmacie] = useState([]);
  const navigate = useNavigate();

    
  const nuovaFarmacia = (destination) => {
      navigate(destination);
  }

  const eliminaFarmacia = (idFarmacia) => {
    axios.get(`http://localhost:3001/homeAdmin/eliminaFarmacia`, {params: {idFarmacia: idFarmacia}})
        .then(res => {
            if(res.status == 200){
                alert("Farmacia eliminata con successo");
                setFarmacie(farmacie.filter((farmacia) => farmacia.id != idFarmacia));
            }else{
                alert("Errore durante l'eliminazione della farmacia");
            }
        })
  }


  useEffect(() => {
    axios.get(`http://localhost:3001/homeAdmin/getFarmacie`)
      .then(res => {
        setFarmacie(res.data);
      })
  }, []);

  return (
    <div className='container'>
      <h1>Gestione Farmacie</h1>
      <div className="prenotazioniUtente">
          {farmacie.map((farmacia) => (
              <div className="cardPrenotazione">
                  <h2>{farmacia.nome} value={state.nome}</h2>
                  <h3>{farmacia.indirizzo}</h3>
                  <p>Telefono</p>
                  <h3>{farmacia.telefono}</h3>
                  <p>Email</p>
                  <h3>{farmacia.email}</h3>
                  <div className="divBottoni">
                    <div className="cardBottone" onClick={() => nuovaFarmacia("/HomeGestioneFarmacisti/"+farmacia.id)}>
                      <div className="icona">
                          <FaUserMd size="50"/>
                      </div>
                    </div>
                    <div className="cardBottone" onClick={() => nuovaFarmacia("/HomeGestioneTotem/"+farmacia.id)}>
                      <div className="icona">
                          <FaLaptopMedical size="50"/>
                      </div>
                    </div>
                    <div className="cardBottone" onClick={() => nuovaFarmacia("/viewAggiungiFarmacia/"+farmacia.id)}>
                      <div className="icona">
                          <FaRegEdit size="50"/>
                      </div>
                    </div>
                    <div className="cardBottone lastButton" onClick={() => eliminaFarmacia(farmacia.id)}>
                      <div className="icona">
                          <FaRegTrashAlt size="50"/>
                      </div>
                    </div>
                  </div>
              </div>
          ))}
      </div>

      <button className="nuovoButton" onClick={() => nuovaFarmacia("/viewAggiungiFarmacia/"+"null")}>Nuova farmacia</button>
    </div>
  );
}

export default HomeGestioneFarmacie;