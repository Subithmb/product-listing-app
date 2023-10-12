
// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 5000;
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
// const path = require('path');
// const mongoose = require('./DB'); 
// const adminRouter = require("./routes/AdminRoute");

// app.use(express.json());
// app.use(cors({ origin: process.env.CORS_URL, credentials: true }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.options('*', cors());

// app.use("/", adminRouter);



const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('./DB'); 
const adminRouter = require('./routes/AdminRoute');
// const cloudinary = require('cloudinary').v2;

app.use(express.json());
app.use(cors({ origin:'http://localhost:3000', credentials: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.options('*', cors());

app.use('/', adminRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Mongoose connection setup
const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

// db.once('open', () => {
//   console.log('MongoDB Connected');
// });
