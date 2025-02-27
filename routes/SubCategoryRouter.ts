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

SubCategoryRouter.get("/:subCategoryId", async (request:Request, response:Response) => {
    await SubCategoryController.getSubCategory(request,response)
})

SubCategoryRouter.put("/:subCategoryId", async (request:Request , response:Response) => {
    await SubCategoryController.updateSubCategory(request,response)
})

SubCategoryRouter.put("/delete/:subCategoryId", async (request:Request , response:Response) => {
    await SubCategoryController.updateSubCategoryStatus(request,response)
})

export default SubCategoryRouter