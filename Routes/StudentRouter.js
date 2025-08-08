import express from 'express'
import {getStudents,selectStudent,insertStudent,deleteStudent,loginStudent,updateStudent} from '../Controller/StudentController.js'
import { checkStudent } from '../Middleware/Authenticate.js'
const router = express.Router()
router.get('/students',getStudents)
router.get('/students/:id',selectStudent)
router.post('/students/register',insertStudent)
router.delete('/students/:id',deleteStudent)
router.post('/students/login',checkStudent,loginStudent)


// router.route('/:id').get(selectUser)

router.patch('/update/:id',updateStudent)




export default router

