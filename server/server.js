// server/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('./db');

const certificateRoutes = require('./routes/certificateRoutes');
const adminRoutes = require("./routes/adminRoutes");
const instituteRoutes = require("./routes/instituteRoutes");
const citizenRoutes = require("./routes/citizenRoutes");
const emailRoutes = require("./routes/emailRoutes");


const app = express();

connectDB();

// middlewares
app.use(cors());
app.use(express.json()); // for JSON bodies (not used by multer route, but useful)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/admin", adminRoutes);

// routes
app.use('/api/certificates', certificateRoutes);
app.use("/api/institutes", instituteRoutes);
app.use("/api/citizen", citizenRoutes); 
app.use("/api/email", emailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
