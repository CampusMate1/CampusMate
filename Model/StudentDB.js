import {pool} from '../Config/config.js'

const getStudentDb = async()=>{
    let [data] = await pool.query("SELECT * FROM student ")
    return data
}
const selectStudentDb =  async(email)=>{
    let [[data]] = await pool.query('SELECT *FROM student WHERE emailAdd= ?',[email])
    return data? data : ''; 
    
    
}
const selectStudentIDDb =  async(stud_no)=>{
    let [[data]] = await pool.query('SELECT *FROM student WHERE stud_no= ?',[stud_no])
    return data; 
    
    
}
const insertStudentDb =async(stud_no,first_name,last_name,email,phone_number,password)=>{
    let [data] =await pool.query(`
        INSERT INTO student(stud_no,first_name,last_name,email,phone_number,password)
        VALUES (?,?,?,?,?,?)
        `,[stud_no,first_name,last_name,email,phone_number,password])
     return data
    }
    const deleteStudentDb=async(stud_no)=>{
        await pool.query(' DELETE FROM Student WHERE stud_no = ?',[stud_no])
               // return data 
           }

    const updateStudentDb=async(first_name,last_name,email,phone_number,password, stud_no)=>{
        
          await pool.query('UPDATE student SET first_name = ?, last_name = ?,  email = ?  ,phone_number = ? ,password =? WHERE stud_no = ?', [first_name,last_name,email,phone_number,password, stud_no]);

        }; 
    

export {getStudentDb,selectStudentDb,insertStudentDb,deleteStudentDb,updateStudentDb,selectStudentIDDb}

