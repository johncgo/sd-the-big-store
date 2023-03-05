import express from "express";

const app = express();
const env = process.env;
const port = env.port || 8080;

app.get('/api/status', (req, res) =>{
    return res.json({
        service: 'auth-api',
        status: "Up",
        httpStatus: 200
    });
});

app.listen(port, () =>{
    console.info(`Server start successfully at port ${port}`)
})