import {compare} from 'bcrypt'
import { selectStudentDb } from '../model/usersDb.js'
import jwt from 'jsonwebtoken'
import {config} from 'dotenv'

config()
const checkStudent=async(req,res,next)=>{
    const {emailAdd, userPass} =req.body
    let hashedP =(await selectStudentDb(emailAdd)).userPass
    console.log(hashedP);

let result = await compare(userPass,hashedP )
console.log(result);

        if(result ==true) {
            let token =jwt.sign({emailAdd:emailAdd},process.env.SECRET_KEY)
            // console.log(token);
             
            req.body.token =token
             next()
        }else{
            res.send("Please sign in with the correct  Password/Email  !!")  
        }
       
            
             

        // let outcome = await compare(emailAdd ,emailAdd)
        // // console.log(result);
        
        //         if(outcome ==true) {
        //             let token =jwt.sign({emailAdd:emailAdd},process.env.SECRET_KEY)
        //             // console.log(token);
                     
        //             req.body.token = token
        //             next()
        //         } else{
        //                 res.send("Please sign in with the correct Email  !!")  
        //         }
        


}
const verifyAToken =(req,res,next)=>{
    // let {cookie} =req.headers
    // //checks if the token exists first
    // let token = cookie && cookie.split ('=')[1]
    // // console.log(cookie);
    
    jwt.verify(token ,process.env.SECRET_KEY,(err,decoded)=>{
        if(err){
            res.json({message:'Token invalid'})
        }else{
              req.body.user =decoded.emailAdd
        // console.log(decoded);
           next()
        }
   
    })
    
}

export {checkStudent,verifyAToken}


