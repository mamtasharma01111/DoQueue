// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/dbconfig');
require('dotenv').config();
const cookieParser = require("cookie-parser");
const errorHandler = require('./middleware/errorHandler');
const Auth = require('./routes/user/user.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
const corsOptions = {
  origin: [
    'http://localhost:5173'
  ],
  credentials: true,
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
connectDB();

app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Api of login
app.use('/auth',Auth);

app.use(errorHandler);
// Start server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
