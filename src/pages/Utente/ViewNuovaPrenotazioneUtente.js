

import { useNavigate } from 'react-router-dom';

function ViewNuovaPrenotazioneUtente() {

  const navigate = useNavigate();

    const handleClick = (destination) => {
        navigate(destination);
    };

  return (
    <div className="container">
      <h1>Nuova Prenotazione</h1>
      <div>
        <form className="form">
          <div className="campoForm">
            <h4>Farmacia</h4>
            <input type="text" name="farmacia" />
          </div>
          <div className="campoForm">
            <h4>Orario</h4>
            <input type="text" name="orario" />
          </div>
          <div className="campoForm">
            <h4>Prestazione</h4>
            <input type="text" name="prestazione" />
          </div>
          <div className="campoForm">
            <h4>Farmaci</h4>
            <input type="text" name="farmaci" />
          </div>
          <div className="divBottoni">
            <button type="submit" className="nuovoButton">Prenota</button>
            <button onClick={() => handleClick("/HomeUtente")} className="annullaButton">Annulla</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ViewNuovaPrenotazioneUtente;