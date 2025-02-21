import { Request , Response } from "express";
import { EcomCategory } from "../models/EcomCategory";
import mongoose from "mongoose";
import SubCategoryTable from "../database/SubCategorySchema";
import { EcomSubCategory } from "../models/EcomSubCategory";

export const getAllSubCategory = async (request:Request , response:Response) => {
    try{
        let subCategorys: EcomCategory[] | undefined = await SubCategoryTable.find();
        if(subCategorys) {
            return response.status(200).json(subCategorys)
        }
    } catch (error:any) {
        return response.status(500).json({"msg":"Data not found"});
    } 
}

export const createSubCategory = async (request:Request , response:Response) => {
    let { category_id,name,description,logo,} = request.body;
    let theSubCategory: EcomSubCategory | null | undefined = await new SubCategoryTable({
        category_id: category_id,
        name: name,
        description: description,
        logo: logo,
    }).save();

    if(theSubCategory) {
        return response.status(200).json({
            data: theSubCategory,
            msg: "Category is Created",
        })
    }
    
}

export const getSubCategory = async (request:Request, response:Response) => {
    let { subCategoryId } = request.params;
    const mongoSubCategoryId = new mongoose.Types.ObjectId(subCategoryId);
    let theSubCategory : EcomCategory | undefined | null = await SubCategoryTable.findById(
        mongoSubCategoryId
    );
    if(!theSubCategory){
        return response.status(404).json({
            data: null,
            error: "No Group is found",
        })
    }
    return response.status(200).json(theSubCategory);
}

export const updateSubCategory = async (request:Request , response:Response) => {
    let { subCategory_id } = request.params;
    let { category_id,name,description,logo} = request.body;
    let theSubCategory: EcomSubCategory | undefined | null = await SubCategoryTable.findByIdAndUpdate(
        subCategory_id,
        {
            category_id,
            name,
            description,
            logo
        },
        {
            new: true
        }
    )
    if(!theSubCategory) {
        return response.status(500).json({
            data: null,
            error: "No Category is found",
        });
    }
    return response.status(200).json(theSubCategory);
}

export const deleteSubCategory = async (request:Request , response:Response) => {
    let { subCategory_id } = request.params;
    let theSubCategory: EcomSubCategory | undefined | null = await SubCategoryTable.findByIdAndDelete(
        subCategory_id,
    );
    if(!theSubCategory) {
        return response.status(500).json({
            data:null,
            error: "No Category is found",
        })
    }
    return response.status(200).json(theSubCategory);
}