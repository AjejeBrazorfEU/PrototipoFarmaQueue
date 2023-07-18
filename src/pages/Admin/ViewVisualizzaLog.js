

function ViewVisualizzaLog() {
  const [log, setLog] = useState([]);

  useEffect(() => {
      axios.get(`http://localhost:3001/homeAdmin/getLog`)
      .then(res => {
          setLog(res.data);
      })
  }, []);

  return (
      <div className='container'>
      <h1>Visualizza Log</h1>
      <div className="prenotazioniUtente">
          {log.map((log) => (
              <div className="cardPrenotazione">
                  <p>Operazione:</p>
                  <h2>{log.tipo}</h2>
                  <p>IdUtente</p>
                  <h3>{log.idUtente}</h3>
                  <p>Orario:</p>
                  <h3>{log.orario}</h3>
              </div>
          ))}
      </div>
      </div>
  );
}

export default ViewVisualizzaLog;