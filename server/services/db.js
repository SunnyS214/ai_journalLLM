const { default: mongoose } = require("mongoose")

 const connect_db=async()=>{
    try {
        mongoose.connect(process.env.DB_URL)
        console.log(' MongoDB database connected')

    } catch (error) {
        console.log('db not connected')
    }
} 

module.exports= connect_db