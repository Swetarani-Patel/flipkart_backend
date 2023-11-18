import express from "express";
import { userLogin, userSignup } from "../controller/userController.js";
import {
  getProductByCategory,
  getProductById,
  getProducts,
} from "../controller/productController.js";
import { addPaymentGateway, getRazorKey, paymentVerification } from "../controller/paymentController.js";

const router = express.Router();
router.post("/signup", userSignup);
router.post("/login", userLogin);
router.get("/products", getProducts);
router.get("/product/category", getProductByCategory);
router.get("/product/:id", getProductById);
router.post("/payment", addPaymentGateway);
router.post("/paymentverification", paymentVerification)
router.get("/getkey", getRazorKey)


export default router;
