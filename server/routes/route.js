const {Router} = require('express')
const middleware = require("../middleware/middelware")
const {UserCredentials, UserTsks} = require("../db/models")
const router = Router()
const {ACCESS_TOKEN} = require('../config')

const jwt = require('jsonwebtoken')

router.post('/register',async (req,res)=>{
    const {username, password} = req.body
    try{
        const currentUsername = await UserCredentials.find({username})
        console.log(currentUsername)
        if(currentUsername.length == 0){
            const response = await UserCredentials.create({username,
                password
            })

            res.json({status: "successful"})
            return
        }
        res.json({status:"User already exists with that name"})
    }
    catch(err){
        console.log(err)
        res.json({
            data: "Database not responding"
        })
    }
   
    
})

router.post('/login',async (req,res)=>{
    try{
        const username = req.body.username
        const password = req.body.password

        console.log(username, password)

        const check = await UserCredentials.find({username,password})
        console.log(check)
        if(check){
            try{
                const token = await jwt.sign({username: username}, ACCESS_TOKEN)
                console.log(token)
    
                res.json({
                    token:token
                })
                // res.cookie("token",{
                //     httpOnly:true,
                //     secure:true,
                //     sameSite:"Strict",
                //     maxAge:7*24*60*60*1000

                // })
                return
            }
            catch(err){
                console.log(err)
                res.statuts(505).json({
                    data:"Server not working"
                })
            }
        }
        res.json({
            reason:"You're not registered"
        })
    }
    catch(err){
        console.log(err)
        res.statuts(505).json({
            data:"Server not working"
        })
    }
})
router.get('/tasks',middleware, async (req,res)=>{
    //this gets all the tasks of a user
    console.log("middleware passed")
    try{
        const username = req.username
        console.log(username)
        const response = await UserTsks.find({username:username});
        console.log(response)
        res.send(response)
    }
    catch(err){
        console.log(err)
        res.json({
            data: "Database not responding"
        })
    }
  
})
router.post('/tasks',middleware, async (req,res)=>{
    try{
        const username = req.username
        const {task} = req.body
        console.log(task)
        const response = await UserTsks.create({username,
            task,
        })
        res.json({
            status: "task created successfully",
            data:response,
        })
    }
    catch(err){
        console.log(err)
        res.json({
            data: "Database not responding"
        })
    }
})
router.put('/tasks/:id',middleware, async (req,res)=>{
    console.log("yooo")
    try{
        const id = req.params.id
        console.log(id)
        const {task,stats} = req.body
        const response = await UserTsks.findByIdAndUpdate({id},{
            task,
            stats,
        })
        res.json({
            status: "task updated successfully",
            data:response,
        })
    }
    catch(err){
        console.log(err)
        res.json({
            data: "Database not responding"
        })
    }
})
router.delete('/tasks/:id',middleware, async (req,res)=>{
    try{
        const id = req.params.id
        const response = await UserTsks.findByIdAndDelete(id)
        res.json({
            status: "successfull deleted"
        })
    }
    catch(err){
        console.log(err)
        res.json({
            data: "Database not responding"
        })
    }
})
router.get('/search',middleware, async (req,res)=>{
    try{
        const search = req.body.search
        const username = req.username
        const response = await UserTsks.find({username: username,
            task:{
            $regex:`^${search}`,$options:'i'
        }})
        if(response.length != 0){
            res.send(response)
        }
        else{
            res.json({
                status:"Couldn't find any",
                data:response
            })
        }
       
    }
    catch(err){
        console.log(err)
        res.json({
            data: "Database not responding"
        })
    }
    
})

router.get('/filter',middleware, async (req,res)=>{
    try{
        const search = req.body.status
        const username = req.username
        const response = await UserTsks.find({username:username,stats:{
            $regex:`^${search}`,$options:'i'
        }})
         console.log(response)
        res.send(response)
    }
    catch(err){
        console.log(err)
        res.json({
            data: "Database not responding"
        })
    }
    
})

module.exports = router