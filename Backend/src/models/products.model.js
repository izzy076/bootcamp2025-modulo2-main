// 1. Importamos
import mongoose from "mongoose";


// 2. Construir la plantilla del modelo

const productSchema = new mongoose.Schema({
    image: {
        type:String,
        required: true
    },
    title: {
        type:String,
        required: true
    },
    description: {
        type:String
    },
    price: {
        type:Number,
        required: true
    },
    categories: {
        type:String,
        enum: ["labiales", "bases", "sombras", "delineadores"]
    },
    isAvailable: {
        type:Boolean,
    }
});

export const productModel = mongoose.model("products", productSchema);