const db = require('../db/connection');

exports.getAllStudents = (req, res) => {
  db.query('SELECT * FROM student', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.createStudent = (req, res) => {
  const { student_id, first_name, last_name, adv_id } = req.body;
  db.query('INSERT INTO student VALUES (?, ?, ?, ?)', [student_id, first_name, last_name, adv_id], (err) => {
    if (err) return res.status(500).send(err);
    res.send('🎉 Student added successfully!');
  });
};
