const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/URLS'
let userSchema = mongoose.Schema({
    url : String,
    alias : String
})
let Url = mongoose.model('url' , userSchema);
module.exports = {DB_URL , userSchema , Url}