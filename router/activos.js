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

// router.delete('/:id', async (request, response) => {
//     const id = request.params.id
//     try {
//         const db = await Modelo.findByIdAndDelete({ _id: id })
//         if (!db) {
//             response.render('activos',{
//                 mensaje: `No se pudo eliminar el registro '<b>${id}</b>'`
//             })
//         } else {
//             response.render('activos',{
//                 mensaje: `Registro eliminado`
//             })
//         }
//     }
//     catch (error) {
//         response.render('activos',{
//             mensaje: `No se pudo eliminar el registro '<b>${id}</b>'`
//         })
//     }
// })

module.exports = router