const usersRoutes = require('express').Router();
const users = require('../controllers/users.controller');

usersRoutes.post("/login", users.login);
usersRoutes.post("/create", users.create);
usersRoutes.get("/all", users.findAll);
usersRoutes.get("/show/:id", users.findOne);

usersRoutes.put("/recovery", users.recovery);
usersRoutes.put("/updatepassword", users.updatepassword);




module.exports = usersRoutes;