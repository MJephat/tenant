import express from 'express'
import dotenv from "dotenv"
import { connectDB } from './utils/db.js';
import authRoutes from './routes/auth.route.js';
import tenantRoutes from './routes/tenant.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app =express();
const PORT = process.env.PORT || 3001
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/admin", authRoutes);
app.use("/api/v1/tenant", tenantRoutes);

app.listen(PORT, ()=>{
    console.log(`Running on port ${PORT}`)
})