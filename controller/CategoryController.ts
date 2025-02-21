import { Request , Response } from "express";
import { EcomCategory } from "../models/EcomCategory";
import mongoose from "mongoose";
import CategoryTable from "../database/CategorySchema";

export const getAllCategory = async (request:Request , response:Response) => {
    try{
        let categorys: EcomCategory[] | undefined = await CategoryTable.find();
        if(categorys) {
            return response.status(200).json(categorys)
        }
    } catch (error:any) {
        return response.status(500).json({"msg":"Data not found"});
    } 
}

export const createCategory = async (request:Request , response:Response) => {
    let { category_name,category_description,category_logo} = request.body;
    let theCategory: EcomCategory | null | undefined = await new CategoryTable({
        category_name: category_name,
        category_description: category_description,
        category_logo: category_logo
    }).save();

    if(theCategory) {
        return response.status(200).json({
            data: theCategory,
            msg: "Category is Created",
        })
    }
}

export const getCategory = async (request:Request, response:Response) => {
    let { categoryId } = request.params;
    const mongoCategoryId = new mongoose.Types.ObjectId(categoryId);
    let theCategory : EcomCategory | undefined | null = await CategoryTable.findById(
        mongoCategoryId
    );
    if(!theCategory){
        return response.status(404).json({
            data: null,
            error: "No Group is found",
        })
    }
    return response.status(200).json(theCategory);
}

export const updateCategory = async (request:Request , response:Response) => {
    let { categoryId } = request.params;
    let { category_name, category_description, category_logo } = request.body;
    let theCategory: EcomCategory | undefined | null = await CategoryTable.findByIdAndUpdate(
        categoryId,
        {
            category_name,
            category_description,
            category_logo,
        },
        {
            new: true
        }
    )
    if(!theCategory) {
        return response.status(500).json({
            data: null,
            error: "No Category is found",
        });
    }
    return response.status(200).json(theCategory);
}

export const deleteCategory = async (request:Request , response:Response) => {
    let { categoryId } = request.params;
    let theCategory: EcomCategory | undefined | null = await CategoryTable.findByIdAndDelete(
        categoryId,
    );
    if(!theCategory) {
        return response.status(500).json({
            data:null,
            error: "No Category is found",
        })
    }
    return response.status(200).json(theCategory);
}