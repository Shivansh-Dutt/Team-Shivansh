import express from "express"
import userRoutes from "./routes/user.route.js";
import ConnectDB from "./utils/db.js";

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
ConnectDB();

// Middleware for routes
app.use("/api/v1/user", userRoutes);

// Port and Server
const PORT = 8000
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
