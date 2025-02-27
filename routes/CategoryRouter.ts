import {Request , Response , Router} from 'express'
import * as CategoryController from "../controller/CategoryController"
import { body } from 'express-validator'
import { request } from 'http'

const CategoryRouter:Router = Router()

CategoryRouter.get("/", async (request:Request, response:Response) => {
    await CategoryController.getAllCategory(request,response)
})

CategoryRouter.post("/",
    async (request:Request , response:Response) => {
        console.log("post");
        await CategoryController.createCategory(request,response)
    }
)

CategoryRouter.get("/:categoryId", async (request:Request, response:Response) => {
    await CategoryController.getCategory(request,response)
})

CategoryRouter.put("/:categoryId", async (request:Request , response:Response) => {
    await CategoryController.updateCategory(request,response)
})

CategoryRouter.put("/delete/:categoryId", async (request:Request , response:Response) => {
    await CategoryController.updateCategoryStatus(request,response)
})

export default CategoryRouter