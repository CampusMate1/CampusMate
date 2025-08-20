const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static frontend files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MySQL
const db = mysql.createConnection({
  host :'b12k3n0gnleccou2eqyc-mysql.services.clever-cloud.com',
user :'ukjuxafahmphiwc2',
database :'b12k3n0gnleccou2eqyc',
password :'mOxV7QtscFnLws7Swa4o',
port : 3306

});

db.connect(err => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log('✅ MySQL Connected!');
});
//Get all students route
app.get('/students' ,async (req,res ) =>{
  console.log(req.body);
    
      db.query("SELECT * FROM student", (err, results) => {
        if (err) {
          console.error("❌ Student not found !:", err);
          return res.status(500).json({ message: "Database error" });
        }
        res.status(200).json(results);
        res.send(results);
      });
      
  
    
});

//Delete a student
app.delete('/students/:stud_no', (req, res) => {
  const { stud_no } = req.params;

  if (!stud_no) {
    return res.status(400).json({ message: "Student number is required" });
  }

  const sql = 'DELETE FROM student WHERE stud_no = ?';

  db.query(sql, [stud_no], (err, result) => {
    if (err) {
      console.error("❌ Error deleting student:", err);
      return res.status(500).json({ message: "Database error", error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "❌ Student not found" });
    }

    res.status(200).json({ message: "✅ Student deleted successfully" });
  });
});


// Register Route
app.post('/register', async (req, res) => {
  console.log(req.body);
  const {
    stud_no,
    first_name,
    last_name,
    email,
    phone_number,
    password
  } = req.body;

  if (!stud_no || !first_name || !last_name || !email || !phone_number || !password) {
    return res.status(400).json({ message: "All required fields must be filled" });
  }
  
  
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    

    const sql = `
      INSERT INTO student 
      (stud_no, first_name, last_name, email, phone_number,  password)
      VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(sql, [stud_no, first_name, last_name, email, phone_number,  hashedPassword], (err, result) => {
      if (err) {
        console.error("❌ Registration error:", err);
        return res.status(500).json({ message: 'Failed to register', error: err.message});
      }
      res.status(201).json({ message: '✅ Student registered successfully' });
      console.log(result);
    });
  } catch (error) {
    console.error("❌ Hashing error:", error);
    
  }
  
});

// Login Route
app.post('/login', (req, res) => {
  const { stud_no, email, password } = req.body;

  if (!stud_no || !email || !password  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = 'SELECT * FROM student WHERE stud_no = ? AND email = ?';

  db.query(sql, [stud_no, email], async (err, results) => {
    if (err) {
      console.error("❌ Login query error:", err);
      return res.status(500).json({ message: "Login failed", error: err.sqlMessage });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "❌ Student not found" });
    }

    const student = results[0];

    try {
      const match = await bcrypt.compare(password, student.password);
      if (!match) {
        return res.status(401).json({ message: "❌ Incorrect password" });
      }

      res.status(200).json({
        message: "✅ Login successful",
        student: {
          stud_no: student.stud_no,
          first_name: student.first_name,
          last_name: student.last_name,
          email: student.email,
          phone_number: student.phone_number,
         
        }
      });
    } catch (error) {
      console.error("❌ Password Invalid ! put correct password:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
});

//Employee login
app.post('/login-emp', (req, res) => {
  const {  employee_email, password } = req.body;

  if ( !employee_email || !password  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = 'SELECT * FROM employees WHERE employee_email = ? ';

  db.query(sql, [employee_email], async (err, results) => {
    if (err) {
      console.error("❌ Login query error:", err);
      return res.status(500).json({ message: "Login failed", error: err.message });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "❌ Employee not found" });
    }

    const employee = results[0];

    try {
      const match = await bcrypt.compare(password, employee.password);
      if (!match) {
        return res.status(401).json({ message: "❌ Incorrect password" });
      }

      res.status(200).json({
        message: "✅ Login successful",
        employee: {
          employee_email: employee.employee_email,
          password: employee.password 
          
         
        }
      });
    } catch (error) {
      console.error("❌ Password Invalid ! put correct password / email:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
});


// Register Employee
app.post('/register-emp', async (req, res) => {
  console.log(req.body);
  const {
   employee_name ,
   employee_surname,
   employee_email,
    phone_no,
    availability_status,
    employee_type ,
    password
  } = req.body;

  if (!employee_name || !employee_surname || !employee_email || !phone_no || !availability_status || !employee_type || !password) {
    return res.status(400).json({ message: "All required fields must be filled" });
  }
  
  
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    

    const sql = `
      INSERT INTO employees
      (employee_name, employee_surname, employee_email, phone_no, availability_status, employee_type ,password)
      VALUES (?, ?, ?, ?, ?, ?,?)`;

    db.query(sql, [employee_name, employee_surname, employee_email, phone_no, availability_status,employee_type,  hashedPassword], (err, result) => {
      if (err) {
        console.error("❌ Registration error:", err);
        return res.status(500).json({ message: 'Failed to register', error: err.message});
      }
      res.status(201).json({ message: '✅ Employee registered successfully' });
      console.log(result);
    });
  } catch (error) {
    console.error("❌ Hashing error:", error);
    
  }
  
});

//Get all employees route
app.get('/employees' ,async (req,res ) =>{
  console.log(req.body);
    
      db.query("SELECT * FROM employees", (err, results) => {
        if (err) {
          console.error("❌ Employees not found !:", err);
          return res.status(500).json({ message: "Database error" });
        }
        res.status(200).json(results);
        res.send(results);
      });
      
  //Get a single employee route
app.get('/employees/:employee_id' ,async (req,res ) =>{
  console.log(req.body);
    
      db.query("SELECT * FROM employees WHERE employee_id =? ", (err, results) => {
        if (err) {
          console.error("❌ Employee not found !:", err);
          return res.status(500).json({ message: "Database error" });
        }
        res.status(200).json(results);
        res.send(results);
      });
      
    
});
//Delete an employee
app.delete('/employees/:employee_id', (req, res) => {
  const { employee_id } = req.params;

  if (!employee_id) {
    return res.status(400).json({ message: "employee_id is required" });
  }

  const sql = 'DELETE FROM employees WHERE employee_mail = ?';

  db.query(sql, [employee_id], (err, result) => {
    if (err) {
      console.error("❌ Error deleting employee ", err);
      return res.status(500).json({ message: "Database error", error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "❌ Employee not found" });
    }

    res.status(200).json({ message: "✅ Employee deleted successfully" });
  });
});


// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
})