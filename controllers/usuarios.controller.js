const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {
	// const { q, nombre = 'No name', apikey, page, limit } = req.query;
	const { limite = 5, desde = 0 } = req.query;
	const query = { estado: true };

	const [total, usuarios] = await Promise.all([
		Usuario.countDocuments(query),
		Usuario.find(query).skip(desde).limit(Number(limite)),
	]);

	res.json({
		total,
		usuarios,
	});
};

const usuariosPost = async (req, res) => {
	const { nombre, correo, password, rol } = req.body;
	const usuario = new Usuario({ nombre, correo, password, rol });

	// Encriptar la password
	const salt = bcryptjs.genSaltSync();
	usuario.password = bcryptjs.hashSync(password, salt);

	// Guardar en BD
	await usuario.save();

	res.json({
		usuario,
	});
};

const usuariosPut = async (req, res) => {
	const { id } = req.params;
	const { _id, password, google, correo, ...resto } = req.body;

	// TODO: validar contra BD

	if (password) {
		// Encriptar la password
		const salt = bcryptjs.genSaltSync();
		resto.password = bcryptjs.hashSync(password, salt);
	}

	const usuario = await Usuario.findByIdAndUpdate(id, resto);

	res.json(usuario);
};

const usuariosPatch = (req, res) => {
	res.json({
		msg: 'patch API - usuariosPatch',
	});
};

const usuariosDelete = async (req, res) => {
	const { id } = req.params;

	// Lo borramos físicamente
	// const usuario = await Usuario.findByIdAndDelete(id);

	const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

	res.json(usuario);
};

module.exports = {
	usuariosGet,
	usuariosDelete,
	usuariosPatch,
	usuariosPost,
	usuariosPut,
};
