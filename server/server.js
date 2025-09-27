// server/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('./db');

const certificateRoutes = require('./routes/certificateRoutes');

const app = express();
connectDB();

// middlewares
app.use(cors());
app.use(express.json()); // for JSON bodies (not used by multer route, but useful)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
app.use('/api/certificates', certificateRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
