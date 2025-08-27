import express from "express";
import userRoutes from "./modules/user/user.routes";
import roleRoutes from './modules/role/role.routes'
import locationRoutes from './modules/location/location.routes'
import contractRoutes from './modules/contract-type/ct.routes'
import fteRoutes from './modules/full-time-equivalent/fte.routes'
import benefitRoutes from './modules/benefit/benefit.routes'
import rsRoutes from './modules/recruitment-step/recruitment-step.routes'

const app = express();

app.use(express.json());

app.use('/api/v1/users', userRoutes);

app.use('/api/v1/roles', roleRoutes)

app.use('/api/v1/location', locationRoutes)

app.use('/api/v1/contract', contractRoutes)

app.use('/api/v1/fte', fteRoutes)

app.use('/api/v1/benefit', benefitRoutes)

app.use('/api/v1/recruitment-step', rsRoutes)

export default app;
