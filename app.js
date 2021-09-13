'use strict'

// VARIABLES GLOBALES
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");

// IMPORTACION DE RUTAS
var usuario_rutas = require("./src/rutas/usuario.rutas");
var encuestas_rutas = require("./src/rutas/encuestas.rutas");
var hotel_rutas = require("./src/rutas/hotel.rutas");
var reservacion_rutas = require("./src/rutas/reservacion.rutas");
var eventos_rutas = require("./src/rutas/evento.rutas");
var servicios_rutas  = require("./src/rutas/servicio.rutas");
var habitaciones_rutas = require("./src/rutas/habitacion.rutas");
var facturas_rutas = require("./src/rutas/factura.rutas");

// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CABECERAS
app.use(cors());

// APLICACION DE RUTAS  localhost:3000/api/ejemplo
app.use('/api', usuario_rutas, encuestas_rutas, hotel_rutas, 
reservacion_rutas, eventos_rutas, servicios_rutas, habitaciones_rutas,
facturas_rutas);

// EXPORTAR
module.exports = app;