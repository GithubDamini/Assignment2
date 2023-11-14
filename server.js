import config from './config/config.js';
import app from './server/express.js';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to the database!");
})
.catch((err) => {
  console.error("Could not connect to the database. Exiting now...", err);
  process.exit();
});

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
});

// Update the message to reflect the marketplace application
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Marketplace application." });
});

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info('Server started on port %s.', config.port);
  console.info('URI %s.', config.mongoUri);
});
