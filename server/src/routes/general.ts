import { Router } from "express";
import { getDashboardStats, getUser } from "../controllers/general";

export default (router: Router) => {
  router.get("/general/user/:id", getUser);
  router.get("/general/dashboard", getDashboardStats);
};
