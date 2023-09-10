const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');
const {
	obtenerProductos,
	obtenerProducto,
	crearProducto,
	actualizarProducto,
	borrarProducto,
} = require('../controllers/productos.controller');

const {
	existeCategoriaPorId,
	existeProductoPorId,
} = require('../helpers/db-validators');

const router = Router();

// Obtener Productos
router.get('/', obtenerProductos);

// Obtener Producto por Id - público
router.get(
	'/:id',
	[
		check('id', 'No es un id de mongo válido').isMongoId(),
		check('id').custom(existeProductoPorId),
		validarCampos,
	],
	obtenerProducto
);

// Crear Producto
router.post(
	'/',
	[
		validarJWT,
		check('nombre', 'El nombre es obligatorio').not().isEmpty(),
		check('categoria', 'No es un id de Mongo válido.').isMongoId(),
		check('categoria').custom(existeCategoriaPorId),
		validarCampos,
	],
	crearProducto
);

// Actualizar Producto
router.put(
	'/:id',
	[
		validarJWT,
		// check('categoria', 'No es un id de Mongo válido.').isMongoId(),
		check('id').custom(existeProductoPorId),
		validarCampos,
	],
	actualizarProducto
);

// Borrar Producto
router.delete(
	'/:id',
	[
		validarJWT,
		esAdminRole,
		check('id', 'No es un id de mongo válido').isMongoId(),
		check('id').custom(existeProductoPorId),
		validarCampos,
	],
	borrarProducto
);

module.exports = router;
