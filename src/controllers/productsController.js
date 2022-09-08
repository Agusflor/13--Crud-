const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const readProducts = () => {
	const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	return products
} 
const saveProducts = (products) => fs.writeFileSync(productsFilePath, JSON.stringify(products,null,3));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		let products = readProducts()
	return res.render('products' , {
		products,
		
	})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		
		let product = readProducts().find(product=> product.id === +req.params.id )
		return res.render('detail', {product, toThousand
		})
	},

	// Create - Form to create
	create: (req, res) => {
		return res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let products = readProducts()

		const { name, price, discount, category, description} = req.body

		let newProduct ={
			id: products [products.length-1].id +1,
			name: name.trim(),
			description: description.trim(),
			price : +price,
			discount: +discount,
			image: req.file? req.file.filename : 'default-image.png'
		}
		products.push(newProduct)
		saveProducts(products)

		return res.redirect('/products')
	},

	// Update - Form to edit
	edit: (req, res) => {
		let productToEdit= readProducts().find(product=> product.id === +req.params.id )
		return res.render('product-edit-form',{
			productToEdit, toThousand
		})
	},
	// Update - Method to update
	update: (req, res) => {
		let products = readProducts()

		const { name, price, discount, category, description} = req.body

		const product = products.find(product=>product.id === +req.params.id)

		const modifyProduct =  products.map(product=> { if (product.id === +req.params.id){
			let productEdit ={
				...product,
				name: name.trim(),
				description: description.trim(),
				price : +price,
				discount: +discount,
				image: req.file? req.file.filename : product.image,
				category
		}
			return productEdit
		}
		return product
	});
	if (req.file && product.image !== "default-image.png") {
		if (fs.existsSync("./public/images/products/" + product.image)) {
			fs.unlinkSync("./public/images/products/" + product.image)
		}
	}
	saveProducts(modifyProduct)
	return res.redirect('/products')
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let products = readProducts();
		const productsModify = products.filter(product=>product.id !== +req.params.id)
		saveProducts(productsModify)
		return res.redirect('/products')
	}
};

module.exports = controller;