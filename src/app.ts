import express from "express";
import userRoutes from "./modules/user/user.routes";
import roleRoutes from './modules/role/role.routes'
import locationRoutes from './modules/location/location.routes'

const app = express();
app.use(express.json());

app.use('/api/v1/users', userRoutes);

app.use('/api/v1/roles', roleRoutes)

app.use('/api/v1/location', locationRoutes)

export default app;
