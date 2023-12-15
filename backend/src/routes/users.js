const { Router } = require('express')
const router = Router();
const { getUsers, createUsers, deleteUsers } = require('../controllers/users.controllers')
router.route('/')
    .get(getUsers)
    .post(createUsers)
// de esta manera lo que realizo es podre consultar la ruta all que me sirve para visualizar todos los usuarios esto es una prueba solo para ver como seria la ruta
router.route('/all')
    .get((req, res) => res.send('Users todos'))

router.route('/:id')
    // .get((req, res) => res.json({ message: 'info note :id' }))
    // .put((req, res) => res.json({ message: 'Note updated' }))
    .delete(deleteUsers)
module.exports = router;