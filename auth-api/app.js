import express from "express";
import * as db from "./src/config/db/initialData.js";
import userRoutes from "./src/modules/user/routes/UserRoutes.js";

import checkToken from "./src/config/auth/CheckToken.js";


const app = express();
const env = process.env;
const PORT = env.PORT || 8080;

db.createInitialData();

app.use(express.json());

app.use(userRoutes);

app.use(checkToken);

app.get('/api/status', (req, res) =>{
    return res.json({
        service: 'auth-api',
        status: "Up",
        httpStatus: 200
    });
});

app.listen(PORT, () =>{
    console.info(`Server start successfully at port ${PORT}`)
})