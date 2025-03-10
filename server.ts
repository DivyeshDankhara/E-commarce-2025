import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { log } from "console";
dotenv.config({ path: "./.env" });
import CategoryRouter from "./routes/CategoryRouter"
import SubCategoryRouter from "./routes/SubCategoryRouter";
import ProductRouter from "./routes/ProductRouter";

const port: string | number | undefined = process.env.PORT || 9900;
const hostName: string = "127.0.0.1";
const dbUrl: any = process.env.MONGO_DB_CLOUD_URL;
const dbName: string | undefined = process.env.MONGO_DB_DATABASE;


const app: Application = express();

app.get("/", (request: Request, response: Response) => {
  response.status(200);
  response.json({
    msg: "Welcome to express server",
  });
});

// configure the router
app.use(express.json());
app.use("/category",CategoryRouter);
app.use("/subcategory",SubCategoryRouter);
app.use("/product",ProductRouter);

if (port) {
  app.listen(Number(port), () => {
    if (dbUrl && dbName) {
      mongoose
        .connect(dbUrl, { dbName: dbName })
        .then((dbResponse) => {
          console.log("Connection Established....");
        //   console.log("Connection Established....");
        })
        .catch((error) => {
          console.error(error);
          process.exit(0); //Force stop express server
        });
    }
    console.log(`Express server is started at http://${hostName}:${port}`);
  });
}
