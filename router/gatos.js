const express = require('express')
const router = express.Router()

router.get('/', async (request, response) => {
    response.render("gatos/ver", { })
})

module.exports = router