const mongoose = require('mongoose');
const Maps = mongoose.model('markers', {
    name: String,
    position: [Number, Number]
});
module.exports = Maps