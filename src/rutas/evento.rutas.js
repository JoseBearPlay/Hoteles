'use strict'

var express = require("express");
var eventoControlador = require("../controladores/evento.controlador");

var md_autorizacion = require("../middlewares/authenticated");

var api = express.Router();
api.get('/ejemploEvento', md_autorizacion.ensureAuth, eventoControlador.ejemploEvento);
api.post('/registarEvento', md_autorizacion.ensureAuth, eventoControlador.agregarEvento);
api.put('/editarEvento/:id', md_autorizacion.ensureAuth, eventoControlador.editarEvento);
api.delete('/eliminarEvento/:id', md_autorizacion.ensureAuth, eventoControlador.eliminarEvento);
api.get('/obtenerEventos', eventoControlador.obtenerEventos);
api.get('/obtenerEventoId/:idEvento', eventoControlador.obtenerEventoID);
api.get('/buscarEventoNombre', md_autorizacion.ensureAuth, eventoControlador.buscarEventoNombre);

module.exports = api;