const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');
const {
	obtenerCategorias,
	obtenerCategoria,
	crearCategoria,
	actualizarCategoria,
	borrarCategoria,
} = require('../controllers/categorias.controller');
const { existeCategoriaPorId } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/categorias
 */
// Obtener todas las categorias - público
router.get('/', obtenerCategorias);

// Obtener una categoría por id - público
router.get(
	'/:id',
	[
		check('id', 'No es un id de mongo válido').isMongoId(),
		check('id').custom(existeCategoriaPorId),
		validarCampos,
	],
	obtenerCategoria
);

// Crear categoría - privado - cualquier persona con un token válido
router.post(
	'/',
	[
		validarJWT,
		check('nombre', 'El nombre es obligatorio').not().isEmpty(),
		validarCampos,
	],
	crearCategoria
);

// Actualizar registro por id - privado - cualquier persona con un token válido
router.put(
	'/:id',
	[
		validarJWT,
		check('nombre', 'El nombre es obligatorio').not().isEmpty(),
		check('id').custom(existeCategoriaPorId),
		validarCampos,
	],
	actualizarCategoria
);

// Borrar categoría - Sólo Admin
router.delete(
	'/:id',
	[
		validarJWT,
		esAdminRole,
		check('id', 'No es un id de mongo válido').isMongoId(),
		check('id').custom(existeCategoriaPorId),
		validarCampos,
	],
	borrarCategoria
);

module.exports = router;
