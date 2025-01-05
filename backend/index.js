import express , {urlencoded} from "express"
import cors from 'cors';
import userRoutes from "./routes/user.route.js";
import needRoutes from "./routes/need.route.js";
import volunteerRoutes from "./routes/volunteer.route.js"
import ConnectDB from "./utils/db.js";
import cookieParser from 'cookie-parser';

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser())

// Connect to MongoDB
ConnectDB();

app.use(urlencoded({extended:true}));
const corsOptions = {
    origin : 'http://localhost:5173',
    credentials : true
}
app.use(cors(corsOptions))

// Middleware for routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/need",needRoutes)
app.use("/api/v1/volunteers", volunteerRoutes);

// Port and Server
const PORT = 8000
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
