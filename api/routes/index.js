const router = require('express').Router();




// Rota dos usuários
const usersRoutes = require('./users.routes');
router.use('/user', usersRoutes);




module.exports = router ;

