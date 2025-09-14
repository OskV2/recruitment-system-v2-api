import express from "express";
import cors from "cors"
import userRoutes from "./modules/user/user.routes";
import roleRoutes from './modules/role/role.routes'
import locationRoutes from './modules/location/location.routes'
import contractRoutes from './modules/contract-type/ct.routes'
import fteRoutes from './modules/full-time-equivalent/fte.routes'
import benefitRoutes from './modules/benefit/benefit.routes'
import rsRoutes from './modules/recruitment-step/recruitment-step.routes'
import rpRoutes from './modules/recruitment-process/recruitment-process.routes'
import jobOfferRoutes from './modules/job-offer/job-offer.routes'
import logRoutes from './modules/log/log.routes'
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
  origin: "http://localhost:3000", // your Next.js frontend
  credentials: true,               // allow cookies
}));

app.use(cookieParser());


app.use(express.json());

app.use('/api/v1/users', userRoutes);

app.use('/api/v1/roles', roleRoutes)

app.use('/api/v1/location', locationRoutes)

app.use('/api/v1/contract', contractRoutes)

app.use('/api/v1/fte', fteRoutes)

app.use('/api/v1/benefit', benefitRoutes)

app.use('/api/v1/recruitment-step', rsRoutes)

app.use('/api/v1/recruitment-process', rpRoutes)

app.use('/api/v1/job-offer', jobOfferRoutes)

app.use('/api/v1/logs', logRoutes)

export default app;
