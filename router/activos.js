const express = require('express')
const router = express.Router()

const Modelo = require('../models/activos')
const TipoActivoModelo = require('../models/tipoActivos')
const ProveedoresModelo = require('../models/Proveedores')
const CiudadesModelo = require('../models/ciudades')

router.get('/', async (request, response) => {
    try {
        const db = await Modelo.find()
        response.render("activos/lista", {
            listado: db
        })
    }
    catch (error) {
        console.log(error)
    }
})

router.get('/crear', async (request, response) => {
    try {
        const tipoActivos = await TipoActivoModelo.find()
        const proveedores = await ProveedoresModelo.find()
        response.render('activos/crear',{
            tipoActivos: tipoActivos,
            proveedores: proveedores
        })
    }
    catch (error) {
        console.log(error)
    }
})

router.post('/', async (request, response) => {
    const body = request.body
    body.creado = Date.now()
    try {
        await Modelo.create(body);
        response.redirect('activos')
    }
    catch(error){
        console.log(error)
    }
})

router.get('/:id', async (request, response) => {
    const id = request.params.id
    try {
        const db = await Modelo.findOne({ _id: id })
        const tipoActivos = await TipoActivoModelo.find()
        const proveedores = await ProveedoresModelo.find()
        const ciudades = await CiudadesModelo.find()
        response.render('activos/modificar',{
            activo: db,
            tipoActivos: tipoActivos,
            proveedores: proveedores,
            ciudades: ciudades
        })
    }
    catch (error) {
        response.render('activos/modificar',{
            error: `No se encontró un elemento con id '<b>${id}</b>'`
        })
    }
})

router.post('/:id', async (request, response) => {
    const id = request.params.id
    const body = request.body

     try {
         const db = await Modelo.findByIdAndUpdate(id, body, { useFindAndModify: false })
         if (db == null) {
            response.render(`activos/modificar/${id}`,{
                activo: body,
                error: "No se pudo modificar el elemento"
            })
         }
         else {
            response.redirect('/activos')
         }
     }
     catch (error) {
        response.render(`activos/modificar/${id}`,{
            activo: body,
            error: "No se pudo modificar el elemento"
        })
     }
})



router.put('/notas/:id', async (request, response) => {
    const id = request.params.id
    try {
        let body = await Modelo.findOne({ _id: id })
        let nuevaNota = {
            descripcion: request.body.nota,
            tipo: request.body.asunto,
            fecha: Date.now()
        }
        body.observaciones.push(nuevaNota)
        const db = await Modelo.findByIdAndUpdate(id, body, { useFindAndModify: false })
        if (db == null) {
            response.json({
                estado: false,
                mensaje: 'No se pudo crear la nota'
            })
        } else {
            const activo = await Modelo.findOne({ _id: id })
            response.json({
                estado: true,
                mensaje: 'Nota creada',
                nota: activo.observaciones[activo.observaciones.length - 1]
            })
        }
    }
    catch (error) {
        console.log(error)
        response.json({
            estado: false,
            mensaje: 'No se pudo crear la nota'
        })
    }
})

router.put('/asignacion/:id', async (request, response) => {
    const id = request.params.id
    try {
        let body = await Modelo.findOne({ _id: id })
        let nuevaAsignacion = {
            condicionEntrega: request.body.condicionEntrega,
            empleado: request.body.empleado,
            ubicacion: request.body.ubicacion,
            entregado: Date.now()
        }
        body.asignacion.push(nuevaAsignacion)
        const db = await Modelo.findByIdAndUpdate(id, body, { useFindAndModify: false })
        if (db == null) {
            response.json({
                estado: false,
                mensaje: 'No se pudo crear la asignacion'
            })
        } else {
            const activo = await Modelo.findOne({ _id: id })
            response.json({
                estado: true,
                mensaje: 'Asignación creada',
                asignacion: activo.asignacion[activo.asignacion.length - 1]
            })
        }
    }
    catch (error) {
        console.log(error)
        response.json({
            estado: false,
            mensaje: 'No se pudo crear la asignacion'
        })
    }
})

router.put('/reintegro/:id', async (request, response) => {
    const id = request.params.id
    try {
        let body = await Modelo.findOne({ _id: id })
        body.asignacion[body.asignacion.length - 1].devuelto = Date.now()
        body.asignacion[body.asignacion.length - 1].condicionDevuelto = request.body.condicionDevuelto
        const db = await Modelo.findByIdAndUpdate(id, body, { useFindAndModify: false })
        if (db == null) {
            response.json({
                estado: false,
                mensaje: 'No se pudo registrar la devolución'
            })
        } else {
            const activo = await Modelo.findOne({ _id: id })
            response.json({
                estado: true,
                mensaje: 'Devolución registrada',
                asignacion: activo.asignacion[activo.asignacion.length - 1]
            })
        }
    }
    catch (error) {
        console.log(error)
        response.json({
            estado: false,
            mensaje: 'No se pudo registrar la devolución'
        })
    }
})

module.exports = router