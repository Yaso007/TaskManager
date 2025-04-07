const ACCESS_TOKEN = "Abcdthulodidi"
const jwt = require('jsonwebtoken')
async function middleware(req,res,next){
    console.log("middleware reached")
    try{
        const auth = req.headers.authorization
        const splitted = auth.split(" ")
        const token = splitted[1]
        if (!token) return res.status(401).json({ message: "Unauthorized header" });

        console.log(token)
        const decodedValue = await jwt.verify(token,ACCESS_TOKEN)
        //console.log(decodedValue[1])
        console.log(decodedValue.username)
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