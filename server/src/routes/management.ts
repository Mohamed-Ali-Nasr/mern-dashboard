import { Router } from "express";
import { getAdmins, getUserPerformance } from "../controllers/management";

export default (router: Router) => {
  router.get("/management/admins", getAdmins);
  router.get("/management/performance/:id", getUserPerformance);
};
