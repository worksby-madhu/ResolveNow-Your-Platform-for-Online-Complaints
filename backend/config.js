const mongoose = require('mongoose');
const app = require('./app'); // or your express app

mongoose.connect('mongodb://localhost:27017/yourdbname')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(3000, () => console.log('Server started'));
  })
  .catch(err => console.error(err));