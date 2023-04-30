import express from "express";
import bodyParser from "body-parser";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes";
import { config } from "./config/config";

// data imports =>
import User from "./models/User";
import Product from "./models/Product";
import ProductStat from "./models/ProductStat";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from "./data/index";
import Transaction from "./models/Transaction";
import OverallStat from "./models/OverallStat";
import AffiliateStat from "./models/AffiliateStat";

/* Configuration */
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* Creating Server */
const server = http.createServer(app);
server.listen(config.server.port, () => {
  console.log("Server running on http://localhost:8000/");
});

/* Mongoose Setup */
mongoose.Promise = Promise;
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    console.log("Connected to Mongo");
    /* ONLY ADD DATA ONE TIME */
    // User.insertMany(dataUser);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // OverallStat.insertMany(dataOverallStat);
    // AffiliateStat.insertMany(dataAffiliateStat);
  })
  .catch((error) => {
    console.log(`${error} Unable to connect to Mongodb`);
  });
mongoose.connection.on("error", (error: Error) => console.log(error));

/* Routes */
app.use("/", routes());
