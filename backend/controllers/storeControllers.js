const getProducts = (req, res) => {
    res.status(200).json({mesage: "get productos"})
}

const createProducts = (req, res) => {
    res.status(201).json({mesage: "create productos"})
}

const updateProducts = (req, res) => {
    res.status(200).json({mesage: `modificar el producto con id: ${req.params.id}`})
}

const deleteProducts = (req, res) => {
    res.status(200).json({mesage: `eliminar el producto con id: ${req.params.id}`})
}

module.exports = {
    getProducts,
    createProducts,
    updateProducts,
    deleteProducts
}