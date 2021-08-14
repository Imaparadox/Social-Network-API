const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network', {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

module.exports = mongoose.connection
