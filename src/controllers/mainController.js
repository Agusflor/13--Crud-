const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		let productsVisited = products.filter(product => product.category ==="visited");
		let productsOferta = products.filter(producto => producto.category ==="in-sale");
		return res.render('index', {productsVisited, productsOferta})
	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;