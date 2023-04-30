import express, { Router } from "express";
import general from "./general";
import client from "./client";
import sales from "./sales";
import management from "./management";

const router = express.Router();

export default (): Router => {
  general(router);
  client(router);
  sales(router);
  management(router);

  return router;
};
