import { Router } from "express";
import { getSales } from "../controllers/sales";

export default (router: Router) => {
  router.get("/sales", getSales);
};
