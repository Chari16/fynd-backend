const {Router} = require('express')
const {json, urlencoded} = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const router = Router()

router.use(cors())
router.use(json())
router.use(urlencoded({extended: true}))
router.use(morgan('dev'))

module.exports = router;
