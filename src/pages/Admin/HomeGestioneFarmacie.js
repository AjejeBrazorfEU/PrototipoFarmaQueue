import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FaUserMd, FaLaptopMedical, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

function HomeGestioneFarmacie() {
  const [farmacie, setFarmacie] = useState([]);
  const navigate = useNavigate();
    
  const nuovaFarmacia = (destination) => {
      navigate(destination);
  }

  useEffect(() => {
    axios.get(`http://localhost:3001/homeAdmin/getFarmacie`)
      .then(res => {
        setFarmacie(res.data);
      })
  }, []);

  return (
    <div className='container'>
      <h1>Gestione farmacie</h1>
      <div className="prenotazioniUtente">
          {farmacie.map((farmacia) => (
              <div className="cardPrenotazione">
                  <h2>{farmacia.nome}</h2>
                  <h3>{farmacia.indirizzo}</h3>
                  <p>Telefono</p>
                  <h3>{farmacia.telefono}</h3>
                  <p>Email</p>
                  <h3>{farmacia.email}</h3>
                  <div className="divBottoni">
                    <div className="cardBottone" onClick={() => nuovaFarmacia("/HomeGestioneFarmacisti")}>
                      <div className="icona">
                          <FaUserMd size="50"/>
                      </div>
                    </div>
                    <div className="cardBottone" onClick={() => nuovaFarmacia("/HomeGestioneTotem")}>
                      <div className="icona">
                          <FaLaptopMedical size="50"/>
                      </div>
                    </div>
                    <div className="cardBottone" onClick={() => nuovaFarmacia("/viewAggiungiFarmacia")}>
                      <div className="icona">
                          <FaRegEdit size="50"/>
                      </div>
                    </div>
                    <div className="cardBottone lastButton" >
                      <div className="icona">
                          <FaRegTrashAlt size="50"/>
                      </div>
                    </div>
                  </div>
              </div>
          ))}
      </div>

      <button className="nuovoButton" onClick={() => nuovaFarmacia()}>Nuova farmacia</button>
    </div>
  );
}

export default HomeGestioneFarmacie;