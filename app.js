import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";

const app = express();

const CokieStore = MongoStore(session);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      resave: true,
      saveUninitialized: false,
      store: new CokieStore({ mongooseConnection: mongoose.connection })
    })
);

export default app;