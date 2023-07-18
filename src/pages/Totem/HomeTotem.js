


import { useState, useEffect } from 'react';

import axios from 'axios';

import { useNavigate, useParams } from "react-router-dom";




export default function HomeTotem() {

    const [state, setState] = useState({

        prestazione: "PRESSIONE",

        dataEOra: "",

      });




        const handleChange = (e) => {

            setState({

                ...state,

                [e.target.name]: e.target.value,

            });

        };




        useEffect(() => {

            axios.get(`http://localhost:3001/homeTotem/nextPostoLibero`,{ params: { idFarmacia: 699697 } })

            .then(res => {

                setState({

                    ...state,

                    dataEOra: res.dataEOra,

                    });

            })

        }, []);





        const handleSubmit = (e) => {

            console.log(state);

            e.preventDefault();

            axios.get(`http://localhost:3001/homeTotem/prenotaPosto`, {params:state})

            .then(res => {

                if(res.status === 200){

                    alert("Prenotazione effettuata");

                }else{

                    alert("Errore");

                }




            });

        };





    return (

        <div>

            <h1>Buongiorno, da questo totem si può prenotare il prossimo posto libero in fila</h1>




            <h2>Prossimo posto libero</h2>

            {dataEOra}

            <h2>Seleziona la prestazione</h2>

            <select name="prestazione" onChange={handleChange}>

                <option value="PRESSIONE">Pressione</option>

                <option value="PESO">Peso</option>

                <option value="FARMACO">Farmaco</option>

                <option value="ALTRO">Altro</option>

            </select>




            <button >PRENOTA POSTO</button>





        </div>

    )

}