import { useNavigate } from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function HomeFarmacista() {
    const [prenotazioni, setPrenotazioni] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/homeUtente/getPrenotazioni`)
          .then(res => {
            setPrenotazioni(res.data);
          })
    }, []);

    
    return (
        <div className="">
            <h1>HomeFarmacista</h1>
        </div>
    )
}