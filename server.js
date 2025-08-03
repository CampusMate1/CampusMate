const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Enables CORS for frontend-backend communication
app.use(express.json()); // Parses JSON requests

// Example API route
app.get('/api/student', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

const PORT = 3306;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});