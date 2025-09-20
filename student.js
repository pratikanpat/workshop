//GET - /students - return all students
//POST - /students - create a student
//GET - /students/:id - return a student
//PUT - /students/:id -update a student
//DELETE - /student/:id - delete a student

const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory "database"
let users = [
  { id: 1, name: "Pratik", age: 21 },
  { id: 2, name: "Aman", age: 20 }
];

// GET all users
app.get('/students', (req, res) => {
  res.json(users);
});

// GET single user by id
app.get('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  user ? res.json(user) : res.status(404).json({ message: "User not found" });
});

// POST create new user
app.post('/students', (req, res) => {
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT replace entire user
app.put('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users[index] = { id, ...req.body };
    res.json(users[index]);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// PATCH update part of a user
app.patch('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (user) {
    Object.assign(user, req.body);
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// DELETE remove user
app.delete('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(u => u.id !== id);
  res.json({ message: "User deleted" });
});



// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
