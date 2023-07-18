import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

export default function HomeTotem() {
    const [state, setState] = useState({
        prestazione: "STATO",
        dataEOra: "",
        idFarmacia: 699697,
    });
    
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const getPostoLibero = () => {
        axios.get(`http://localhost:3001/homeTotem/nextPostoLibero`,{ params: { idFarmacia: 699697 } })
        .then(res => {
            setState({
                ...state,
                dataEOra: res.data,
            });
        })
    }

    useEffect(() => {
        getPostoLibero();
    }, []);
    

    const handleSubmit = () => {

        axios.get(`http://localhost:3001/homeTotem/aggiungiPrenotazioneTotem`, {params:state})
        .then(res => {
            console.log(res);
            if(res.status === 200){
                console.log(res);
                alert("Prenotazione effettuata");
            }else{
                alert("Errore");
            }
            getPostoLibero();
        });
    };

    return (
        <div className="Screen">
            <h1>Buongiorno, da questo totem si può prenotare il prossimo posto libero in fila</h1>
            <h2>Prossimo posto libero</h2>
            <h3>{state.dataEOra}</h3>
            <h2>Seleziona la prestazione</h2>
            <select name="prestazione" onChange={handleChange} value={state.prestazione}>
                <option value="PRESSIONE">Pressione</option>
                <option value="PESO">Peso</option>
                <option value="FARMACO">Farmaco</option>
                <option value="ALTRO">Altro</option>
            </select>

            <button onClick={handleSubmit}>PRENOTA POSTO</button>


        </div>

    )

}