const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');
const path = require('path');
const updateDb = require('./scripts/updateDb.cjs');

// Import configuration
const config = require('../config/config.js');

const app = express();

// Use the port from config, or default to 3001
const port = config.port || 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB using the URI from config
mongoose.connect(config.mongodb)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// schedule db update every 12 hours
cron.schedule('0 */12 * * *', () => {
  updateDb();
});

// Define your API routes here
// Example route:
require("./api/index.cjs")(app);

// Serve static files from the React app
app.use(express.static(path.resolve(__dirname, '../csgo-inventory-frontend/build')));

// The catchall handler: for any request that doesn't match the above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../csgo-inventory-frontend/build/index.html'));
});

// Listen on the configured port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
