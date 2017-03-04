/**
 * Created by Administrator on 2017/3/4.
 */
var mongoose = require('mongoose'),
    DB_URL = 'mongodb://localhost:27017/shoutbox';

mongoose.connect(DB_URL);

module.exports = mongoose;