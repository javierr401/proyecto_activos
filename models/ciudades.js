const mongoose = require('mongoose')

const ciudadesSchema = new mongoose.Schema({
    nombre: String
})

const Ciudades = mongoose.model('Ciudades', ciudadesSchema)

module.exports = Ciudades
