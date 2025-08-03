import { getStudentDb,selectStudentIDDb,insertStudentDb,deleteStudentDb,updateStudentDb,selectStudentDb} from './model/StudentDB.js'
import {hash} from 'bcrypt'

const getStudents =async(req,res)=>{
    try{
    res.json(await getStudentDb())    
    }catch(e){
        res.status(500).send('Server error!')
    }
    
}

const selectStudent = async(req,res)=>{
    // console.log(req.params.id);
    try{
     res.json(await selectStudentIDDb(req.params.id))     
    }catch(e){
        res.status(400).send('Unable to get user !')
    }
  
    // res.send('Endpoint reached !')
    
}


const insertStudent =async(req,res)=>{
    

    
    let {firstName,lastName,userAge,Gender,userRole,emailAdd,userPass,userProfile}= req.body
    let exisitingEmail = (await selectStudentDb(emailAdd)).emailAdd
    if (emailAdd == exisitingEmail) {
        res.status(403).send('Email already exisits')
        return
    } else{
        userRole = 'user'   
        userProfile = 'https://codjoelmayer.github.io/projectImages/images/profile-Image.png'
        
        hash(userPass,10,async(err,hashedP)=>{
            if(err) throw err
            console.log(hashedP);
            
            try{
                await insertStudentDb(firstName,lastName,userAge,Gender,userRole,emailAdd,hashedP,userProfile)
                res.send('Data was inserted successfully !')
            }catch(e){
                res.status(400).send('All fields must be filled in , re-insert data !')
            }
        })
        
    }
}
    //     
    
       
    
const deleteStudent = async(req,res)=>{
    try{
       await deleteStudentDb(req.params.id)
    res.status(200).send('Data was deleted successfully ! ') 
    }catch(e){
        res.status(400).send('Invalid User !')
    }
    
}
    const updateStudent=async(req,res)=>{
       try{

       
        let {firstName,lastName,userAge,Gender,emailAdd,userProfile}=req.body
        console.log(req.body);

        let user =await selectStudentIDDb(req.params.id)
        firstName ? firstName=firstName: firstName = user.firstName
        lastName? lastName=lastName: lastName = user.lastName
        userAge ? userAge=userAge: userAge = user.userAge
        Gender ? Gender=Gender: Gender = user.Gender
        emailAdd ?  emailAdd= emailAdd:  emailAdd = user. emailAdd
        userProfile ?   userProfile=  userProfile:   userProfile = user.  userProfile
        res.json({
            results: await updateStudentDb(firstName,lastName,userAge,Gender,emailAdd,userProfile, req.params.id),
            msg: 'Data was successfully updated ! '
        })}catch(e){
            res.status(500).send('Server error !!')
        }
      
    }
   
 const loginStudent =(req,res)=>{
    try{
      res.json({message:"Successfully Logged in!!",token :req.body.token})     
    }catch(e){
        res.send('Register first if you do not have login credentials ! ')
    }
 
    
    
    
}

export{getStudents,selectStudent,insertStudent,deleteStudent,updateStudent,loginStudent}


