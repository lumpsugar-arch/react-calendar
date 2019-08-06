const express = require('express'),
      path = require('path'),
      mongoose = require('mongoose'),
      keys = require('./keys'),
      eventRouter = require('./routes/event'),
      bodyParser = require('body-parser');

const app = express(),
      port = process.env.PORT || 5000,
      clientPath = path.join(__dirname, 'client');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true} )
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use(bodyParser.json());
app.use('/api/events', eventRouter);
app.use(express.static(clientPath));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});