import { getStudentDb,selectStudentIDDb,insertStudentDb,deleteStudentDb,updateStudentDb,selectStudentDb} from '../Model/StudentDB.js'
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
        res.status(400).send('Unable to get student !')
    }
  
    // res.send('Endpoint reached !')
    
}


const insertStudent =async(req,res)=>{
    

    
    let {stud_no,first_name,last_name,email,phone_number,password}= req.body
    let exisitingEmail = (await selectStudentDb(email)).email
    if (email == exisitingEmail) {
        res.status(403).send('Email already exisits')
        return
    } else{
        // userRole = 'user'   
        // userProfile = 'https://codjoelmayer.github.io/projectImages/images/profile-Image.png'
        
        hash(password,10,async(err,hashedP)=>{
            if(err) throw err
            console.log(hashedP);
            
            try{
                await insertStudentDb(stud_no,first_name,last_name,email,phone_number,password,hashedP)
                res.send('Student was inserted successfully !')
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
    res.status(200).send('Student was deleted successfully ! ') 
    }catch(e){
        res.status(400).send('Invalid Input !')
    }
    
}
    const updateStudent=async(req,res)=>{
       try{

       
        let {stud_no,first_name,last_name,email,phone_number,password}=req.body
        console.log(req.body);

        let student =await selectStudentIDDb(req.params.id)
        stud_no ? stud_no= stud_no : stud_no = student.stud_no
        first_name ? first_name=first_name: first_name = student.first_name
        last_name? last_name=last_name: last_name = student.last_name
        email ?  email= email:  email = student.email
        phone_number?   phone_number=  phone_number:   phone_number = student.phone_number
        password?   password=  password:   password = student.password
        
        res.json({
            results: await updateStudentDb(stud_no,first_name,last_name,email,phone_number,password, req.params.id),
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


