'use strict'

var Servicio = require("../modelos/servicios.model");

function ejemploServicio(req, res){
    if(req.user.rol === "ADMIN_APP"){
        res.status(200).send({mensaje: `Hola Mi Nobre es: ${req.user.nombre}`});
    }else{
        res.status(400).send({mensaje: 'Solo el rol tipo ADMIN_APP puede ver este mensaje'});
    }
}

function agregarServicio(req, res){
    var servicioModel = new Servicio();
    var params = req.body;

    if(req.user.rol != "ADMIN_APP"){
        return res.status(500).send({mensaje: 'Solo el rol tipo ADMIN_APP puede agregar Servicios'});
    }

    if(params.nombre && params.descripcion){
        servicioModel.nombre = params.nombre;
        servicioModel.descripcion = params.descripcion;
    
        servicioModel.save((err, servicioGuardado)=>{
            if(err) return res.status(500).send({mensaje: 'Error en la peticion del usuario'});
            if(!servicioGuardado) return res.status(500).send({mensaje: 'Error al agregar el servicio'});

            return res.status(200).send({servicioGuardado});
        })
    }
}

function obtenerServicios(req, res){

    Servicio.find().exec((err, servicios)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion de ver los servicios'});
        if(!servicios) return res.status(500).send({mensaje: 'Error al obtener los servicios'});

        return res.status(200).send({servicios});
    })
}

function obtenerServicioId(req, res){
    var servicioId = req.params.idServicio;

    Servicio.findById(servicioId, (err, servicioEncontrado)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion del servicio'});
        if(!servicioEncontrado) return res.status(500).send({mensaje: 'Error al obtener el servicio'});

        return res.status(200).send({servicioEncontrado});
    })
}

function editarServicio(req, res){
    var idServicio = req.params.id;
    var params = req.body;

    if(req.user.rol != "ADMIN_APP"){
        return res.status(500).send({mensaje: 'Solo el rol tipo ADMIN_APP puede editar los servicios'});
    }

    Servicio.findByIdAndUpdate(idServicio, params, {new: true}, ((err, servicioActuralizado)=>{
        if(err) return res.status(500).send({mensaje:'Error en la peticion de editar el servicio'});
        if(!servicioActuralizado) return res.status(500).send({mensaje: 'Erro al actualizar el servicio'});

        return res.status(200).send({servicioActuralizado});
    })) 
}

function eliminarServicio(req, res){
    var idServicio = req.params.id;

    if(req.user.rol != "ADMIN_APP"){
        return res.status(500).send({mensaje: 'Solo el rol tipo ADMIN_APP puede eliminar servicios'});
    }

    Servicio.findByIdAndDelete(idServicio, ((err, servicioEliminado)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion de eliminar el servicio'});
        if(!servicioEliminado) return res.status(500).send({mensaje: 'Error al eliminar el servicio'});
    
        return res.status(200).send({servicioEliminado});
    }))
}

module.exports = {
    ejemploServicio,
    agregarServicio,
    obtenerServicios,
    obtenerServicioId,
    editarServicio,
    eliminarServicio
}