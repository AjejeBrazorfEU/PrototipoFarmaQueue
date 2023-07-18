const roles = {
    admin: 0,
    utente: 1,
    farmacista: 2,
    totem: 3,
    unregistered: 4
}

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

module.exports  = {
    roles : roles,
    Prenotazione : Prenotazione
}