import express from "express";
// import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "../routes/booksRoute.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());

// app.use(
//   cors({
//     origin: "http://localhost:3000/", // React app runs on this port
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("response!!! hello world");
});

app.use("/books", booksRoute);

mongoose
  .connect("mongodb+srv://ctyper824:simplepassword!@cluster0.gzcwm.mongodb.net/?retryWrites=true&w=majority&tls=true", {
    connectTimeoutMS: 10000, // 10 seconds
  })
  .then(() => {
    console.log("Successfully connected to database.");
    app.listen(5555, () => {
      console.log(`App is listening on port: ${5555}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
// export default app;