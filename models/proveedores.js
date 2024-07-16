const mongoose = require('mongoose')

const proveedoresSchema = new mongoose.Schema({
    nombre: String
})

const Proveedores = mongoose.model('Proveedores', proveedoresSchema)

module.exports = Proveedores
