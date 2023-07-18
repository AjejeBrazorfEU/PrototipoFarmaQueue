import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewVisualizzaLog() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/homeAdmin/getLogs`)
            .then(res => {
                setLogs(res.data);
            })
    }, []);


  return (
    <div>
      <h1>ViewVisualizzaLog</h1>
        <div className="prenotazioniUtente">
            {logs.map((log) => (
                <div className="cardPrenotazione">
                    <h2>{log.tipo}</h2>
                    <p>IdUtente</p>
                    <h3>{log.idUtente}</h3>
                    <p>Orario</p>
                    <h3>{log.orario}</h3>
                </div>
            ))}
        </div>
    </div>
  );
}

export default ViewVisualizzaLog;