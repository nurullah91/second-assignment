import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ProductRoutes } from "./app/modules/products/product.route";
import { OrderRoutes } from "./app/modules/orders/order.route";

const app: Application = express();

// Parser
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello.... E-commerce website backend is running");
});

export default app;
