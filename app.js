const express = require('express'),
      path = require('path'),
      mongoose = require('mongoose'),
      keys = require('./config/keys'),
      eventRouter = require('./routes/event'),
      usersRouter = require('./routes/users'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      passport = require('passport');

const app = express(),
      port = process.env.PORT || 5000,
      clientPath = path.join(__dirname, 'client');

require('./config/passport')(passport);

mongoose.connect(keys.mongoURI, { useNewUrlParser: true } )
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors({ origin: '*'}));
app.use('/api/events', eventRouter);
app.use('/api/users', usersRouter);
app.use(express.static(clientPath));
app.get('*', (req, res) => {
  res.sendFile(clientPath + '/index.html');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});