import express from 'express'
import StudentRouter from './Routes/StudentRouter.js'

import cors from 'cors'

const app =express()
let port=process.env.PORT || 5005
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Request-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Expose-Headers", "Authorization");
    next()
})
app.use(express.json())
app.use(express.static('public'))
app.use(cors())

app.use('/students',StudentRouter)



app.listen(port,()=>{
    console.log("http://localhost:" +port);
})