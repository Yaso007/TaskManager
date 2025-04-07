const mongoose = require('mongoose')

const User = mongoose.Schema({
    username:String,
    password:String
})

const UserTasks = mongoose.Schema({
    username:String,
    task:String,
    stats: {
        type:String,
        default:"Pending"
    },

})

const UserCredentials = mongoose.model('UserCredentials',User)
const UserTsks = mongoose.model('UserTasks',UserTasks)

module.exports = {
    UserCredentials,
    UserTsks
}