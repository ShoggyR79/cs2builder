const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import configuration
const config = require('../config/config.json');

const app = express();

// Use the port from config, or default to 3001
const port = config.port || 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB using the URI from config
mongoose.connect(config.mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define your routes and API endpoints here
// Example route:
require("./api/index.js")(app);
// Listen on the configured port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
