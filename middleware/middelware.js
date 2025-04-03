const ACCESS_TOKEN = "Abcdthulodidi"
const jwt = require('jsonwebtoken')
async function middleware(req,res,next){
    try{
        const auth = req.headers.authorization
        const splitted = auth.split(" ")
        const token = splitted[1]
        console.log(token)
        const decodedValue = await jwt.verify(token,ACCESS_TOKEN)
        console.log(decodedValue[1])

        if(decodedValue.username)
        {
            req.username = decodedValue.username
            next()
        }
        else{
            res.status(403).json({
                msg:"You are not authenticated"
            })
        }
    }
    catch(err){
        console.log(err)
        res.json({
            data: "Server error"
        })
    }
 

}

module.exports = middleware