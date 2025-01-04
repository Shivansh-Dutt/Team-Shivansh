import express from "express"
import userRoutes from "./routes/user.route.js";
import needRoutes from "./routes/need.route.js";
import ConnectDB from "./utils/db.js";
import cookieParser from 'cookie-parser';

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser())

// Connect to MongoDB
ConnectDB();

// Middleware for routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/need",needRoutes)

// Port and Server
const PORT = 8000
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
