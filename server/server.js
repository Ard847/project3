const express = require('express');
const app = express();
const path = require("path")
// const cors = require('cors');

const connection = require('./config/db');

const PORT = process.env.PORT || 3001;

// middleware
// app.use(cors());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set up routes
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const householdRoutes = require('./routes/householdRoutes');
const imagesRoutes = require('./routes/imagesRoutes')

app.use('/api/user', userRoutes );
app.use('/api/task', taskRoutes );
app.use('/api/household', householdRoutes);
app.use('/api/images', imagesRoutes)
// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// server
connection.authenticate()
  .then(async () => {
    connection.sync();
    console.log('Connection has been established successfully.');
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log('CRA server running on port', PORT);
    });
  })
  .catch((err) => console.log('connection error=', err));