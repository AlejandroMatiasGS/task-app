const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth-routes');
const taskRoutes = require('./routes/task-routes');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: process.env.ALLOWED_HOSTS,
    credentials: true,
}))

app.use('/api', authRoutes)
app.use('/api', taskRoutes)

module.exports = app;