import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate,useParams } from "react-router-dom";

function ViewAggiungiFarmacia() {
  const { idFarmacia } = useParams();
  const [state, setState] = useState({
    nome: "",
    indirizzo: "",
    serviziOfferti: "",
    orari: "",
    telefono: "",
    email: "",
    idFarmacia: ""
  });

  
    useEffect(() => {
      if(idFarmacia !== "null"){
      axios.get(`http://localhost:3001/homeAdmin/getFarmacia`, {params: {idFarmacia: idFarmacia}})
        .then(res => {
          setState({nome: res.data.nome, indirizzo: res.data.indirizzo, serviziOfferti: res.data.serviziOfferti, orari: res.data.orari, telefono: res.data.telefono, email: res.data.email, idFarmacia: res.data.id});
          //console.log(state);
        })}
    }, []);
  

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    axios.get(`http://localhost:3001/homeAdmin/nuovaFarmacia`, {params:state})
    .then(res => { 
      if(res.status === 200){
          alert("Farmacia aggiunta con successo");
          navigate('/homeGestioneFarmacie');
      }else{
          alert("Errore durante l'aggiunta della farmacia");
      }
    }).catch(err => {
      console.log(err);
      alert("Errore durante l'aggiunta della farmacia");
    });
  };

  const handleClick = (destination) => {
    navigate(destination);
  };

  return (
    <div className="container">
      <h1>Aggiungi Farmacia</h1>
      <form className="form" onSubmit={e => handleSubmit(e)}>
          <div className="campoForm">
            <h4>Nome</h4>
            <input type="text" name="nome" onChange={handleInputChange} value={state.nome}/>
          </div>
          <div className="campoForm">
            <h4>Indirizzo</h4>
            <input type="text" name="indirizzo" onChange={handleInputChange} value={state.indirizzo}/>
          </div>
          <div className="campoForm">
            <h4>Servizi Offerti</h4>
            <input type="text" name="serviziOfferti" onChange={handleInputChange} value={state.serviziOfferti}/>
          </div>
          <div className="campoForm">
            <h4>Orari</h4>
            <input type="time" name="orari" onChange={handleInputChange} value={state.orari}/>
          </div>
          <div className="campoForm">
            <h4>Telefono</h4>
            <input type="text" name="telefono" onChange={handleInputChange} value={state.telefono}/>
          </div>
          <div className="campoForm">
            <h4>Email</h4>
            <input type="text" name="email" onChange={handleInputChange} value={state.email}/>
          </div>
          <div className="divBottoni">
            <button type="submit" className="nuovoButton">Registra</button>
            <button onClick={() => handleClick("/homeGestioneFarmacie")} className="annullaButton">Annulla</button>
          </div>
        </form>
    </div>
  );
}

export default ViewAggiungiFarmacia;