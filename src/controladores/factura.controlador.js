'use strict'

var Factura = require("../modelos/factura.model");

function ejemploFactura(req, res){
    if(req.user.rol === "ROL_USUARIO"){
        res.status(500).send({mensaje: `Hola Mi Nombre es: ${req.user.nombre}`});
    }else{
        res.status(400).send({mensaje: 'Solo el rol tipo usuario puede ver este mensaje'});
    }
}

function agregarFactura(req,res){
    var facturaModel = new Factura();
    var params = req.body;
    console.log(params);

    if(req.user.rol != "ADMIN_HOTEL"){
        return res.status(500).send({mensaje: 'Solo el rol tipo ADMIN_HOTEL puede agregar una factura'});
    }

    if(params.nombreHotel && params.direccionHotel && params.nombreUsuario){
        facturaModel.nombreHotel = params.nombreHotel;
        facturaModel.direccionHotel = params.direccionHotel;
        facturaModel.nombreUsuario = params.nombreUsuario;
        facturaModel.fecha = params.fecha;
        facturaModel.numeroFactura = params.numeroFactura;
        facturaModel.serie = params.serie;
        facturaModel.serviciosHospedado = params.serviciosHospedado;
        facturaModel.precioServicios = params.precioServicios;
        facturaModel.precioHospedaje = params.precioHospedaje;
        facturaModel.diasHospedado = params.diasHospedado;
        facturaModel.total = facturaModel.precioServicios + facturaModel.precioHospedaje * facturaModel.diasHospedado;

        facturaModel.save((err, facturaGuardada)=>{
            if(err) return res.status(500).send({mensaje: 'Error en la peticion de la factura'});
            if(!facturaGuardada) return res.status(500).send({mensaje: 'Erro al agregar la factura'});

            return res.status(200).send({facturaGuardada});
        })
    }
}

function obtenerFacturas(req, res){

    if(req.user.rol != "ADMIN_HOTEL"){
        return res.status(500).send({mensaje: 'Solo el rol tipo ADMIN_HOTEL puede ver las facturas hechas'});
    }
    
    Factura.find().exec((err, facturas)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion de listar las facturas'});
        if(!facturas) return res.status(500).send({mensaje: 'Error al mostrar las facturas'});

        return res.status(200).send({facturas});
    })
}

function obtenerFacturaID(req, res){
    var facturaId = req.params.idFactura;

    Factura.findById(facturaId, (err, facturaEncontrada)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion de obtenere la factura'});
        if(!facturaEncontrada) return res.status(500).send({mensaje:'Error al obtener la factura'});

        return res.status(200).send({facturaEncontrada});

    })
}

function editarFactura(req, res){
    var idFatura = req.params.id;
    var params = req.body;

    if(req.user.rol != "ADMIN_HOTEL"){
        return res.status(500).send({mensaje: 'Solo el rol tipo ADMIN_HOTEL puede editar una factura'});
    }

    Factura.findByIdAndUpdate(idFatura, params, {new: true}, (err, facturaActualizada)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion de editar la factura'});
        if(!facturaActualizada) return res.status(500).send({mensaje: 'Error al actualizar la factura'});

        return res.status(200).send({facturaActualizada});
    })
}


function eliminarFactura(req, res){
    var idFactura = req.params.id;
    var params = req.body;

    if(req.user.rol != "ADMIN_HOTEL"){
        return res.status(500).send({mensaje: 'Solo el rol tipo ADMIN_HOTEL puede eliminar una factura'});
    }

    Factura.findByIdAndDelete(idFactura, ((err, facturaEliminada)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion de eliminar una factura'});
        if(!facturaEliminada) return res.status(500).send({mensaje: 'Erro al eliminar la factura'});

        return res.status(200).send({facturaEliminada});
    }))

}

module.exports = {
    ejemploFactura,
    agregarFactura,
    obtenerFacturas,
    obtenerFacturaID,
    editarFactura,
    eliminarFactura
}