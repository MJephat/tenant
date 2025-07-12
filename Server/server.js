import express from 'express'
import dotenv from "dotenv"
import { connectDB } from './utils/db.js';
import authRoutes from './routes/auth.route.js';
import tenantRoutes from './routes/tenant.route.js';
import paymentRoutes from './routes/payment.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from "path";

dotenv.config();

const app =express();
const PORT = process.env.PORT || 3001
connectDB();

app.use(cors({
    origin:[ "http://localhost:5173", 'https://tenant-kx95.onrender.com'],
    credentials: true,           
  }));

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/admin", authRoutes);
app.use("/api/v1/tenant", tenantRoutes);
app.use("/api/v1/payment", paymentRoutes);

//--------------------------Deplyment--------------------------

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));

  app.get("/files{path}", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}else{
  app.get("/", (req, res) => {
    res.send("API is running successfully");
  });
}


//-------------------------Deployment--------------------------



app.listen(PORT, ()=>{
    console.log(`Running on port ${PORT}`)
})