'use strict'

var express = require("express");
var facturaControlador = require("../controladores/factura.controlador");

var md_autorizacion = require("../middlewares/authenticated");

var api = express.Router();
api.get('/ejemploFactura', md_autorizacion.ensureAuth, facturaControlador.ejemploFactura);
api.post('/agregarFactura', md_autorizacion.ensureAuth, facturaControlador.agregarFactura);
api.get('/obtenerFacturas', md_autorizacion.ensureAuth,facturaControlador.obtenerFacturas);
api.get('/obtenerFacturaID/:idFactura', facturaControlador.obtenerFacturaID);
api.put('/editarFactura/:id', md_autorizacion.ensureAuth, facturaControlador.editarFactura);
api.delete('/eliminarFactura/:id', md_autorizacion.ensureAuth, facturaControlador.eliminarFactura);

module.exports = api;