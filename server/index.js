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
    res.send(prenotazioni);
})

app.get('/homeUtente/nuovaPrenotazione', (req, res) => {
    const query = req.query;
    const prenotazione = {
        id: prenotazioni.length + 1,
        farmacia: query.farmacia,
        dataEOra: query.dataEOra,
        prestazione: query.prestazione
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

app.get('/homeAdmin/getFarmacie', (req, res) => {
    res.send(farmacie);
})

app.get('/homeAdmin/nuovaFarmacia', (req, res) => {
    const query = req.query;
    const farmacia = {
        id: farmacie.length + 1,
        nome: query.nome,
        indirizzo: query.indirizzo,
        farmacisti: []
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})