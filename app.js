const express = require('express'),
      path = require('path');

const app = express(),
      port = process.env.PORT || 5000,
      clientPath = path.join(__dirname, 'client');

app.use(express.static(clientPath));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});