import {pool} from '../Config/config.js'

const getStudentDb = async()=>{
    let [data] = await pool.query("SELECT * FROM Student ")
    return data
}
const selectStudentDb =  async(emailAdd)=>{
    let [[data]] = await pool.query('SELECT *FROM users WHERE emailAdd= ?',[emailAdd])
    return data? data : ''; 
    
    
}
const selectStudentIDDb =  async(userID)=>{
    let [[data]] = await pool.query('SELECT *FROM users WHERE userID= ?',[userID])
    return data; 
    
    
}
const insertStudentDb =async(firstName,lastName,userAge,Gender,userRole,emailAdd,userPass,userProfile)=>{
    let [data] =await pool.query(`
        INSERT INTO users(firstName,lastName,userAge,Gender,userRole,emailAdd,userPass,userProfile)
        VALUES (?,?,?,?,?,?,?,?)
        `,[firstName,lastName,userAge,Gender,userRole,emailAdd,userPass,userProfile])
     return data
    }
    const deleteStudentDb=async(userID)=>{
        await pool.query(' DELETE FROM users WHERE userID = ?',[userID])
               // return data 
           }

    const updateStudentDb=async(firstName,lastName,userAge,Gender,emailAdd,userProfile, userID)=>{
        
          await pool.query('UPDATE users SET firstName = ?, lastName = ?, userAge = ?, Gender = ?, emailAdd = ?  ,userProfile = ? WHERE userID = ?', [firstName,lastName,userAge,Gender,emailAdd,userProfile, userID]);

        }; 
    

export {getStudentDb,selectStudentDb,insertStudentDb,deleteStudentDb,updateStudentDb,selectStudentIDDb}

