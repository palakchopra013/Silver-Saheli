import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import contactRoutes from "./routes/contacts.js";
import tripsRoute from "./routes/trips.js";
import emergencyRoute from "./routes/emergency.js";
import familyRoute from "./routes/family.js";
app.use("/api/family", familyRoute);
app.use("/api/emergency", emergencyRoute);
app.use("/api/trips", tripsRoute);
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// DB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Routes
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
    res.send("Silver Saheli Backend Running");
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
