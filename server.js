const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Connect to MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'campusmate_user',
  password: 'campusmate_user',
  database: 'campusmate_user'
});

db.connect(err => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log('✅ MySQL Connected!');
});

// 🔐 Register Route
app.post('/register', (req, res) => {
  const {
    stud_no,
    first_name,
    last_name,
    email,
    phone_number,
    department_id,
    service_id,
    password
  } = req.body;

  if (!stud_no || !first_name || !last_name || !email || !phone_number || !password) {
    return res.status(400).json({ message: "All required fields must be filled" });
  }

  const sql = `
    INSERT INTO student 
    (stud_no, first_name, last_name, email, phone_number, department_id, service_id, password)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [stud_no, first_name, last_name, email, phone_number, department_id, service_id, password], (err, result) => {
    if (err) {
      console.error("❌ Registration error:", err);
      return res.status(500).json({ message: 'Failed to register', error: err.sqlMessage });
    }

    res.status(200).json({ message: '✅ Student registered successfully' });
  });
});

// 🔑 Login Route
app.post('/login', (req, res) => {
  const { stud_no, email, password } = req.body;

  if (!stud_no || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = 'SELECT * FROM student WHERE stud_no = ? AND email = ?';

  db.query(sql, [stud_no, email], (err, results) => {
    if (err) {
      console.error("❌ Login query error:", err);
      return res.status(500).json({ message: "Login failed", error: err.sqlMessage });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "❌ Student not found" });
    }

    const student = results[0];

    // 🧠 Debug log
    console.log(`DB password: "${student.password}", Entered password: "${password}"`);

    if (student.password !== password) {
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
        department_id: student.department_id,
        service_id: student.service_id
      }
    });
  });
});

// 🚀 Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
