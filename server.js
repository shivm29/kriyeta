import express from "express";
import connectDB from "./config/db.js"
import cors from "cors"
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv"

import authRoutes from "./routes/auth.js"
import connectionRoutes from "./routes/connections.js"
import videoRoutes from "./routes/video.js"
import commentRoutes from "./routes/comments.js"

dotenv.config();

// database config
// connects to MongoDB database using Mongoose and returns the database connection object
connectDB();

// initializing express app
const app = express();


// middlewares

// parses the JSON data and makes it available as JavaScript objects 
// use the body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json())
//  sits between Express application and the incoming HTTP request, and it logs all incoming requests. useful for debugging and troubleshooting application.
app.use(morgan('dev'))

// routes 
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/connections", connectionRoutes)
app.use("/api/v1/video", videoRoutes)
app.use("/api/v1/comments", commentRoutes)




// listening at home port
app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server running on port ${port}`));