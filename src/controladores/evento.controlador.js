'use strict'

var Evento = require("../modelos/evento.model");

function ejemploEvento(req, res){
    if(req.user.rol === "ROL_USUARIO"){
        res.status(500).send({mensaje: `Hola Mi Nombre es: ${req.user.nombre}`});
    }else{
        res.status(400).send({mensaje: 'Solo el rol tipo usuario puede ver este mensaje'});
    }
}

function agregarEvento(req, res){
    var eventoModel = new Evento();
    var params = req.body;
    console.log(params);

    if(req.user.rol != "ADMIN_APP"){
        return res.status(500).send({mensaje: 'Solo el Rol tipo ADMIN_APP puede agregar eventos'});
    }

    if(params.nombre && params.tipoEvento && params.descripcion){
        eventoModel.nombre = params.nombre;
        eventoModel.tipoEvento = params.tipoEvento;
        eventoModel.descripcion = params.descripcion;
        eventoModel.hotel = params.hotel

        eventoModel.save((err, eventoGuardado)=>{
            if(err) return res.status(500).send({mensaje: 'Error en la peticion del evento'});
            if(!eventoGuardado) return res.status(500).send({mensaje: 'Erro al agregar el evento'});
       
            return res.status(200).send({eventoGuardado});
        })
    }
}

function obtenerEventos(req, res){
    
    Evento.find().exec((err, eventos)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion de ver los eventos'});
        if(!eventos) return res.status(500).send({mensaje: 'Error al mostrar los eventos'});

        return res.status(200).send({eventos});
    })
}

function buscarEventoNombre(req, res){
    var hotelNombre = req.body;

    if(req.user.rol != "ROL_USUARIO"){
        return res.status(500).send({mensaje: 'Solo el rol tipo ROL_USUARIO buscar Eventos'});
    }

    Evento.find(hotelNombre,(err, eventoEncontrado)=>{
        if(err) return res.status(500).send({mensaje:'Error en la peticion'});
        if(!eventoEncontrado) return res.status(500).send({mensaje: 'Error al buscar el Evento'});

        return res.status(200).send({eventoEncontrado});
    })
}

function editarEvento(req, res){
    var idEvento = req.params.id;
    var params = req.body;

    if(req.user.rol != "ADMIN_APP"){
        return res.status(500).send({mensaje: 'Solo el rol tipo ADMIN_APP puede editar eventos'})
    }

    Evento.findByIdAndUpdate(idEvento, params, {new: true}, (err, eventoActualizado)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion de editar el evento'});
        if(!eventoActualizado) return res.status(500).send({mensaje: 'Erro al editar el evento'});
        
        return res.status(200).send({eventoActualizado});
    })
}

function eliminarEvento(req, res){
    var idEvento = req.params.id;

    if(req.user.rol != "ADMIN_APP"){
        return res.status(500).send({mensaje: 'Solo el rol tipo ADMIN_APP puede eliminar evento'});
    }

    Evento.findByIdAndDelete(idEvento, ((err, eventoEliminado)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion de eliminar el evento'});
        if(!eventoEliminado) return res.status(500).send({mensaje: 'Error al eliminara el evento'});

        return res.status(200).send({eventoEliminado});
    }))
}

function obtenerEventoID(req, res) {
  var eventoId = req.params.idEvento;

  Evento.findById(eventoId, (err, eventoEncontrado)=>{
    if(err) return res.status(500).send({mensaje:'Error en la peticion del evento'});
    if(!eventoEncontrado) return res.status(500).send({mensaje: 'Errpr al obtener el evento'});

    return res.status(200).send({eventoEncontrado});
  })
}





module.exports = {
    ejemploEvento,
    agregarEvento,
    buscarEventoNombre,
    editarEvento,
    eliminarEvento,
    obtenerEventos,
    obtenerEventoID
}