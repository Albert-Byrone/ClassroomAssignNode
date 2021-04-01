const express  = require('express');

const router = express.Router()
const Product  = require('../models/product');

//add a new product in the database
router.post('/api/products',(req, res, next)=>{

    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        inStock: req.body.inStock,
        price: req.body.price,
    });
    product.save().then(()=>{
        res.status(201).json({
            message: " Object added to the database",
        });
    }).catch((error)=>{
        res.status(400).json({
            error: error,
        });       
    });

});

//get a single product from the database
router.get('/api/products/:id',(req,res, next)=>{
    Product.findOne({
        _id: req.params.id
    }).then((product) =>{
        res.status(200).json(product)
    }).catch((error) =>{
        res.status(404).json({
            error: error,
        })
    })
})
//delete a product from the databse
router.delete('/api/products/:id', (req, res, next) =>{
    Product.deleteOne({_d: req.params.id}).then(
        ()=>{
            res.status(200).json({
                message : " Product deleted from the databse"
            });
        }
    ).catch(error =>{
        res.status(400).json({
            error: error
        });
    });
});

//update a single prodyt from the datanbase
// name: req.body.name,
//         description: req.body.description,
//         inStock: req.body.inStock,
//         price: req.body.price,
router.put('/api/products/:id', (req, res, next)=>{
    const product = new Product({
        _id: req.params.id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        inStock: req.body.inStock,
    })
    Product.updateOne({ _id: req.params.id}, product).then(
        ()=>{
            res.status(200).json({
                message: "Product updated successfully"
            });
        }
    ).catch(error =>{
        res.status(400).json({
            error: error
        })
    })
})
//retrieve all the products from the database
router.get('/api/products',(req,res, next)=>{
    Product.find().then((products) =>{
        res.status(200).json(products)
    }).catch((error) =>{
        res.status(400).json({
            error: error,
        });
    });
});
module.exports = router;