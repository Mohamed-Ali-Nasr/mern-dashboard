import { Router } from "express";
import {
  getCustomers,
  getGeography,
  getProducts,
  getTransactions,
} from "../controllers/client";

export default (router: Router) => {
  router.get("/client/products", getProducts);
  router.get("/client/customers", getCustomers);
  router.get("/client/transactions", getTransactions);
  router.get("/client/geography", getGeography);
};
