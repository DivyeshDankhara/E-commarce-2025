import { Request , Response } from "express";
import { EcomProduct } from "../models/EcomProduct";
import mongoose from "mongoose";
import ProductTable from "../database/ProductSchema";

export const getAllProduct = async (request:Request , response:Response) => {
    try{
        let products : EcomProduct[] | undefined = await ProductTable.find();
        if(products) {
            return response.status(200).json(products)
        }
    } catch (error:any){
        return response.status(500).json({"msg":"Data not found"});
    }
}

export const createProduct = async (request:Request , response:Response) => {
    let { Sub_Category_id,Product_name,Product_description,Product_image,Product_Images,Product_price,Product_brand,Product_quantity } = request.body;
    let theProduct: EcomProduct | null | undefined = await new ProductTable({
        Sub_Category_id: Sub_Category_id,
        Product_name: Product_name,
        Product_description: Product_description,
        Product_image: Product_image,
        Product_Images: Product_Images,
        Product_price: Product_price,
        Product_brand: Product_brand,
        Product_quantity: Product_quantity
    }).save();

    if(theProduct) {
        return response.status(200).json({
            data: theProduct,
            msg: "Product is Created",
        })
    }
    
}

export const getProduct = async (request:Request, response:Response) => {
    let { productId } = request.params;
    const mongoProductId = new mongoose.Types.ObjectId(productId);
    let theProduct : EcomProduct | undefined | null = await ProductTable.findById(
        mongoProductId
    );
    if(!theProduct){
        return response.status(404).json({
            data: null,
            error: "No Group is found",
        })
    }
    return response.status(200).json(theProduct);
}

export const updateProduct = async (request:Request , response:Response) => {
    let { productId } = request.params;
    let { Sub_Category_id,Product_name,Product_description,Product_image,Product_Images,Product_price,Product_brand,Product_quantity } = request.body;
    let theProduct: EcomProduct | undefined | null = await ProductTable.findByIdAndUpdate(
        productId,
        {
            Sub_Category_id,
            Product_name,
            Product_description,
            Product_image,
            Product_Images,
            Product_price,
            Product_brand,
            Product_quantity
        },
        {
            new: true
        }
    )
    if(!theProduct) {
        return response.status(500).json({
            data: null,
            error: "No Category is found",
        });
    }
    return response.status(200).json(theProduct);
}

export const updateProductStatus = async (request:Request , response:Response) => {
    let { productId } = request.params;
    let theProduct: EcomProduct | undefined | null = await ProductTable.findByIdAndUpdate(
        productId,
        {
            isActive:false
        },
        {
            new:true
        }
    );
    if(!theProduct) {
        return response.status(500).json({
            data:null,
            error: "No Product is found",
        })
    }
    return response.status(200).json(theProduct);
}