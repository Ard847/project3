const express = require('express');
const app = express();

const connection = require('./server/config/db');

const PORT = process.env.PORT || 3001;

// middleware
let cors = require('cors');
app.use(cors());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set up routes
const userRoutes = require('./server/routes/userRoutes');
const taskRoutes = require('./server/routes/taskRoutes');
const householdRoutes = require('./server/routes/householdRoutes');

app.use('api/user', userRoutes );
// app.use('api/task', taskRoutes );
// app.use('api/household', householdRoutes);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
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