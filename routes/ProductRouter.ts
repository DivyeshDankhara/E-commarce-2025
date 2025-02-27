import {Request , Response , Router} from 'express'
import * as ProductController from "../controller/ProductController"
import { body } from 'express-validator'
import { request } from 'http'

const ProductRouter:Router = Router()

ProductRouter.get("/", async (request:Request, response:Response) => {
    await ProductController.getAllProduct(request,response)
})

ProductRouter.post("/", async (request:Request , response:Response) => {
        console.log("post");
        await ProductController.createProduct(request,response)
})

ProductRouter.get("/:productId", async (request:Request, response:Response) => {
    await ProductController.getProduct(request,response)
})

ProductRouter.put("/:productId", async (request:Request , response:Response) => {
    await ProductController.updateProduct(request,response)
})

ProductRouter.put("/delete/:productId", async (request:Request , response:Response) => {
    await ProductController.updateProductStatus(request,response)
})

export default ProductRouter