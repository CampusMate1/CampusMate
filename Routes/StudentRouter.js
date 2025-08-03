import express from 'express'
import {getStudents,selectStudent,insertStudent,deleteStudent,loginStudent,updateStudent} from '../Controller/StudentController.js'
import { checkStudent } from '../Middleware/Authenticate.js'
const router = express.Router()
router.get('/',getStudents)
router.get('/:id',selectStudent)
router.post('/register',insertStudent)
router.delete('/delete/:id',deleteStudent)
router.post('/login',checkStudent,loginStudent)


// router.route('/:id').get(selectUser)

router.patch('/update/:id',updateStudent)




export default router

