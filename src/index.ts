import "reflect-metadata";
import express = require("express");
const bodyParser = require('body-parser');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
import Router from "./routes";
import errorMiddleware from "./middleware/errorMiddleware";
import {dataSource} from "../ormconfig";

require('dotenv').config();

const PORT = process.env.APP_PORT || 8000;

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, type: 'form-data' }));
app.use(xss());
app.use(hpp());
app.use(Router);
app.use(errorMiddleware);

dataSource.initialize()
    .then((_connection) => {
        app.listen(PORT, () => {
            console.log("Server is running on port", PORT);
        });
    })
    .catch((err) => {
        console.log("Unable to connect to db", err);
        process.exit(1);
    });
