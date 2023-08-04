import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import connectDB from "./mongodb/connect.js";
import postRoutes from './mongodb/routes/postRoutes.js';
import dalleRoutes from './mongodb/routes/dalleRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

// middlewares
const allowedOrigins = ['https://modern-pixel-frontend.vercel.app/', 'https://modern-pixel.onrender.com'];

app.use(
    cors({
      origin:  function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      methods: ["GET", "POST"],
    })
  );
app.use(express.json({ limit: '50mb'}))

//routes
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from DALL.E!',
  });
});

const startServer = async () => {
    try {
      connectDB(process.env.MONGODB_URL);
      app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
    } catch (error) {
      console.log(error);
    }
  };
  
  startServer();