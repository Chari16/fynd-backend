const express = require('express')
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth');
 
const router = express.Router()

/* User routes */

router.post('', userController.createUser)
// router.post('/:id', userController.getUserDetails)
router.post('/login', userController.login)

module.exports = router;
