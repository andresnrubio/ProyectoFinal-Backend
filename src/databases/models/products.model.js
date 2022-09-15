import mongoose from 'mongoose'

const ProductsSchema= new mongoose.Schemma({
nombre:{
    type: String,
    required: true,
    trim:true,
    max:50,
},
price:{
    type: Number,
    required: true,
    max: 100000
},
thumbnail:{
type: String,
required: true
}
})

module.exports = mongoose.model('products',ProductsSchema)


