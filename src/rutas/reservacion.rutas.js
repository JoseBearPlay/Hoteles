'use strict'

var express = require("express");
var reservacionControlador = require("../controladores/reservacion.controlador");

var md_autorizacion = require("../middlewares/authenticated");

var api = express.Router();
api.get('/ejemploReservacion', md_autorizacion.ensureAuth, reservacionControlador.ejemploReservacion);
api.post('/agregarReservacion', md_autorizacion.ensureAuth, reservacionControlador.agregarReservacion);
api.get('/obtenerReservaciones', md_autorizacion.ensureAuth,reservacionControlador.obtenerReservaciones);
api.get('/obtenerReservacionID/:id', reservacionControlador.obtenerReservacionID);
api.put('/editarReservacion/:id', md_autorizacion.ensureAuth, reservacionControlador.editarReservacion);
api.delete('/eliminarReservacion/:id', md_autorizacion.ensureAuth, reservacionControlador.eliminarReservacion);
module.exports = api;