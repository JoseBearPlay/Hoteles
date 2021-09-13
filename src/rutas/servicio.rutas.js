'use strict'

var express = require("express");
var servicioControlador = require("../controladores/servicio.controlador");

var md_autorizacion = require("../middlewares/authenticated");

var api = express.Router();
api.get('/ejemploServicio', md_autorizacion.ensureAuth, servicioControlador.ejemploServicio);
api.post('/registrarServicio', md_autorizacion.ensureAuth, servicioControlador.agregarServicio);
api.get('/obtenerServicios', servicioControlador.obtenerServicios);
api.get('/obtenerServicioId/:idServicio', servicioControlador.obtenerServicioId);
api.put('/editarServicio/:id', md_autorizacion.ensureAuth, servicioControlador.editarServicio);
api.delete('/eliminarServicio/:id', md_autorizacion.ensureAuth, servicioControlador.eliminarServicio);

module.exports = api;