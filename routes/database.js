const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/URLS'
let userSchema = mongoose.Schema({
    url : String
})
let Url = mongoose.model('url' , userSchema);
const exports = {DB_URL , userSchema , Url}