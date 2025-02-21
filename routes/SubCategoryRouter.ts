import {Request , Response , Router} from 'express'
import * as SubCategoryController from "../controller/SubCategoryController"
import { body } from 'express-validator'
import { request } from 'http'

const SubCategoryRouter:Router = Router()

SubCategoryRouter.get("/", async (request:Request, response:Response) => {
    await SubCategoryController.getAllSubCategory(request,response)
})

SubCategoryRouter.post("/",
    async (request:Request , response:Response) => {
        console.log("post");
        await SubCategoryController.createSubCategory(request,response)
})

SubCategoryRouter.get("/:subCategory_id", async (request:Request, response:Response) => {
    await SubCategoryController.getAllSubCategory(request,response)
})

SubCategoryRouter.put("/:subCategory_id", async (request:Request , response:Response) => {
    await SubCategoryController.updateSubCategory(request,response)
})

SubCategoryRouter.delete("/:subCategory_id", async (request:Request , response:Response) => {
    await SubCategoryController.deleteSubCategory(request,response)
})

export default SubCategoryRouter