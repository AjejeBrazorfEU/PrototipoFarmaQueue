'use strict';

const utils = require('./Utils');
const roles = utils.roles;
const http = require("http");

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

const prenotazioni = require('./data/prenotazioni.json');

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
    let listaPrenotazioni = [];
    listaPrenotazioni.push(prenotazioni[Math.floor(Math.random() * prenotazioni.length)]);
    listaPrenotazioni.push(prenotazioni[Math.floor(Math.random() * prenotazioni.length)]);
    listaPrenotazioni.push(prenotazioni[Math.floor(Math.random() * prenotazioni.length)]);
    res.send(listaPrenotazioni);

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})