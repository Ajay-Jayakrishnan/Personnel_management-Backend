const mongoose = require('mongoose')
mongoose.connect(
    'mongodb://localhost:27017/hr', () => {
        console.log("database connected");
    }
)

const User = mongoose.model('User', {
    userName: String,
    passWord: String,
    employees: []
   
}
)
module.exports = {
    User
}