var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var controlador = require('../servidor/controlador/controlador');
var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/competencias',controlador.competencias);

var puerto = process.env.PORT || 8080;

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});