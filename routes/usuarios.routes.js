const { Router } = require('express');
const {
	usuariosGet,
	usuariosPut,
	usuariosPost,
	usuariosPatch,
	usuariosDelete,
} = require('../controllers/usuarios.controller');

const router = Router();

router.get('/', usuariosGet);

router.post('/', usuariosPost);

router.put('/:id', usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/', usuariosDelete);

module.exports = router;
