const router = require('express').Router()
const {checkProductReturn} = require('./controller')

router.post('/transaction/return', checkProductReturn)

module.exports = router