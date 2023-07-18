'use strict';

const utils = require('./Utils');
const roles = utils.roles;
const http = require("http");
var moment = require('moment'); // require

const express = require('express')
const app = express()
const port = 3001
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });

let prenotazioni = require('./data/prenotazioni.json');
let farmacie = require('./data/farmacie.json');
let utenti = require('./data/utenti.json');
let logs = require('./data/logs.json');
const { randomInt } = require('crypto');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/login', (req, res) => {
    const query = req.query;
    if(query.username === 'admin') {
        res.send({role: roles.admin});
    }else if(query.username === 'utente') {
        res.send({role: roles.utente});
    }else if(query.username === 'farmacista') {
        res.send({role: roles.farmacista});
    }else if(query.username === 'totem') {
        res.send({role: roles.totem});
    }else{
        res.send({role: roles.unregistered});
    }
})

app.get('/homeUtente/getPrenotazioni', (req, res) => {
  const prenotazioniUtente = prenotazioni.filter(p => p.idUtente === '123456');
    res.send(prenotazioniUtente);
})

app.get('/homeUtente/nuovaPrenotazione', (req, res) => {
    const query = req.query;
    const prenotazione = {
        id: prenotazioni.length + 1,
        farmacia: query.farmacia,
        dataEOra: query.dataEOra,
        prestazione: query.prestazione,
        idUtente: '123456'
        }
    console.log(prenotazione);
    prenotazioni.push(prenotazione);
    logs.push({
        tipo: "NuovaPrenotazione",
        orario: moment().format("DD/MM/YYYY HH:mm"),
        idUtente: '123456',
    });

    // sending ok message 200
    res.sendStatus(200);
  }
);

app.get('/homeUtente/eliminaPrenotazione', (req, res) => {
  const query = req.query;
    const prenotazione = prenotazioni.find(p => p.dataEOra === query.dataEOra && p.idUtente === '123456' && p.farmacia === query.farmacia && p.prestazione === query.prestazione);
    if(!prenotazione) {
      res.sendStatus(404);
    }else{
      prenotazioni = prenotazioni.filter(p => p.dataEOra !== query.dataEOra || p.idUtente !== '123456' || p.farmacia !== query.farmacia || p.prestazione !== query.prestazione);
      logs.push({
        tipo: "EliminaPrenotazione",
        orario: moment().format("DD/MM/YYYY HH:mm"),
        idUtente: '123456',
    });

      res.sendStatus(200);
    }
  }
);

app.get('/homeAdmin/getFarmacie', (req, res) => {
    res.send(farmacie);
})

app.get('/homeAdmin/nuovaFarmacia', (req, res) => {
    const query = req.query;
    const farmacia = {
        id: farmacie.length + 1,
        nome: query.nome,
        indirizzo: query.indirizzo,
        farmacisti: [],
        email: query.email,
        telefono: query.telefono
    }
    console.log(farmacia);
    farmacie.push(farmacia);
    logs.push({
        tipo: "NuovaFarmacia",
        orario: moment().format("DD/MM/YYYY HH:mm"),
        idUtente: 'ADMIN',
    });

    // sending ok message 200
    res.sendStatus(200);
  }
);

app.get('/homeAdmin/eliminaFarmacia', (req, res) => {
    const idFarmacia = parseInt(req.query.idFarmacia);
    const farmacia = farmacie.find(f => f.id === idFarmacia);
    if(!farmacia) {
      res.sendStatus(404);
    }else{
      farmacie = farmacie.filter(f => f.id !== idFarmacia);
      logs.push({
        tipo: "EliminaFarmacia",
        orario: moment().format("DD/MM/YYYY HH:mm"),
        idUtente: 'ADMIN',
    });
      res.sendStatus(200);
    }
});

app.get('/homeAdmin/eliminaFarmacista', (req, res) => {
    const idFarmacista = parseInt(req.query.idFarmacista);
    for(let i = 0; i < farmacie.length; i++) {
      const farmacia = farmacie[i];
      const farmacista = farmacia.farmacisti.find(f => f.id === idFarmacista);
      if(farmacista) {
        farmacia.farmacisti = farmacia.farmacisti.filter(f => f.id !== idFarmacista);
        logs.push({
          tipo: "EliminaFarmacista",
          orario: moment().format("DD/MM/YYYY HH:mm"),
          idUtente: 'ADMIN',
      });
        res.sendStatus(200);
        return;
      }
    }
    res.sendStatus(404);
});

app.get('/homeAdmin/getUtenti', (req, res) => {
    res.send(utenti);
})

app.get('/homeAdmin/getFarmacisti', (req, res) => {
    const idFarmacia = parseInt(req.query.idFarmacia);
    const farmacia = farmacie.find(f => f.id === idFarmacia);
    if(!farmacia) {
      res.send([]);
    }else{
      res.send(farmacia?.farmacisti);
    }
});

app.get('/homeAdmin/aggiungiFarmacista', (req, res) => {
    const query = req.query;
    const farmacista = {
        id: utenti.length + 1,
        nome: query.nome,
        cognome: query.cognome,
        data: query.data
    }
    farmacie.find(f => f.id === parseInt(query.idFarmacia)).farmacisti.push(farmacista);

    logs.push({
        tipo: "AggiungiFarmacista",
        orario: moment().format("DD/MM/YYYY HH:mm"),
        idUtente: 'ADMIN',
    });
});

app.get('/homeAdmin/getLogs', (req, res) => {
  res.send(logs);
})

app.get('/homeAdmin/getTotem', (req, res) => {
  const idFarmacia = parseInt(req.query.idFarmacia);
  const farmacia = farmacie.find(f => f.id === idFarmacia);
  if(!farmacia) {
    res.send([]);
  }else{
    res.send(farmacia.totem);
  }
})

app.get('/homeAdmin/creaTotem', (req, res) => {
  const query = req.query;
  let farmacia = farmacie.find(f => f.id === parseInt(query.idFarmacia));
  farmacia.totem.push({
    id: randomInt(100000, 999999),
  });
  logs.push({
    tipo: "CreaTotem",
    orario: moment().format("DD/MM/YYYY HH:mm"),
    idUtente: 'ADMIN',
  })
  res.sendStatus(200);
})

app.get('/homeAdmin/eliminaTotem', (req, res) => {
  const query = req.query;
  let farmacia = farmacie.find(f => f.id === parseInt(query.idFarmacia));
  farmacia.totem = farmacia.totem.filter(t => t.id !== parseInt(query.idTotem));
  logs.push({
    tipo: "EliminaTotem",
    orario: moment().format("DD/MM/YYYY HH:mm"),
    idUtente: 'ADMIN',
  })
  res.sendStatus(200);
})

app.get('/homeFarmacista/getPrenotazioni', (req, res) => {
    const idFarmacia = parseInt(req.query.idFarmacia);
    const farmacia = farmacie.find(f => f.id === idFarmacia);
    if(!farmacia) {
      res.send([]);
    }else{
      res.send(prenotazioni.filter(p => p.farmacia === farmacia.nome));
    }
})

app.get('/homeFarmacista/avantiUnAltro', (req, res) => {
    const idFarmacia = parseInt(req.query.idFarmacia);
    const farmacia = farmacie.find(f => f.id === idFarmacia);
    if(!farmacia) {
      res.sendStatus(404);
    }else{
      const prossimaPrenotazione = prenotazioni.find(p => p.farmacia === farmacia.nome);
        prenotazioni = prenotazioni.filter(p => p.id !== prossimaPrenotazione.id);
        logs.push({
          tipo: "AvantiUnAltro",
          orario: moment().format("DD/MM/YYYY HH:mm"),
          idUtente: 'FARMACISTA',
      });
        res.send(prenotazioni.filter(p => p.farmacia === farmacia.nome));
    }
});

app.get('/homeTotem/nextPostoLibero', (req, res) => {
    const query = req.query;
    const farmacia = farmacie.find(f => f.id === parseInt(query.idFarmacia));
    const prenotazioniOggi = prenotazioni.filter(p => moment(p.dataEOra, "DD/MM/YYYY HH:mm").format("DD/MM/YYYY") === moment().format("DD/MM/YYYY") && p.farmacia === farmacia.nome);
    const orariOggi = prenotazioniOggi.map(p => moment(p.dataEOra, "DD/MM/YYYY HH:mm"));

    const orari = [];
    for(let i = 0; i < 24; i++) {
      for(let j=0;j<4;j++){
        // Controllo che sia un tempo futuro
        if(moment().hour(i).minute(j*15).isAfter(moment())) {
          orari.push(moment().hour(i).minute(j*15));
        }
      }
    }

    // devo trovare il primo orario libero
    for(let i = 0; i < orari.length; i++) {
      const orario = orari[i];
      if(!orariOggi.find(o => o.format("HH:mm") === orario.format("HH:mm"))) {
        res.send(orario.format("DD/MM/YYYY HH:mm"));
        return;
      }
    }

});

app.get('/homeTotem/aggiungiPrenotazioneTotem', (req, res) => {

    const query = req.query;
    const farmacia = farmacie.find(f => f.id === parseInt(query.idFarmacia));
    const prenotazione = {
        id: prenotazioni.length + 1,
        dataEOra: query.dataEOra,
        servita : false,
        farmacia: farmacia.nome,
        prestazione: query.prestazione,
        farmaci: [],
        idUtente: 'TOTEM',
    }
    prenotazioni.push(prenotazione);
    logs.push({
      tipo: "AggiungiPrenotazioneTotem",
      orario: moment().format("DD/MM/YYYY HH:mm"),
      idUtente: 'TOTEM',
    });

    res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})