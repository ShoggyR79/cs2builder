import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import cron from 'node-cron';
import updateDb from './scripts/updateDb.js'

// Import configuration
import config from '../config/config.js';

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

// schedule db update every 12 hours
cron.schedule('0 */12 * * *', () => {
  updateDb();
});

// Define your routes and API endpoints here
// Example route:
require("./api/index.js")(app);
// Listen on the configured port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
