import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import connectDB from "./mongodb/connect.js";
import postRoutes from './mongodb/routes/postRoutes.js';
import dalleRoutes from './mongodb/routes/dalleRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(function (req, res, next) {
  const allowedOrigins = ['https://modern-pixel-frontend.vercel.app/', 'https://modern-pixel.onrender.com/'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST");
  next();
});

app.use(express.json({ limit: '50mb' }))

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