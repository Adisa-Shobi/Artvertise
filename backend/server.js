const express = require('express');
const cors = require('cors');
const router = require('./app/routes/index');

const corsOptions = {
    origin: "http://localhost:8081",
    credentials: true,
}

const port = process.env.PORT || 5000;
const app = express();

// Configuring CORS options
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.use(express.json());
app.use('/', router);

app.listen(port, () => {
    console.log(`Running backend server on http://localhost${port}`)
});
