
class Prenotazione {
    idPrenotazione;
    dataEOra;
    servita;
    prestazione;
    farmaci;
    farmacia;

    constructor(idPrenotazione, dataEOra, servita, prestazione, farmaci, farmacia) {
        this.idPrenotazione = idPrenotazione;
        this.dataEOra = dataEOra;
        this.servita = servita;
        this.prestazione = prestazione;
        this.farmaci = farmaci;
        this.farmacia = farmacia;
    }
}

export default Prenotazione;