const express = require('express');
const app = express();
app.use(express.json());

let users = [];
let nextId = 1;

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Create
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  const newUser = { id: nextId++, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Read All
app.get('/users', (req, res) => {
  res.status(200).json(users);
});

// Read One
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(200).json(user);
});

// Update
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  const { name, email } = req.body;
  if (name !== undefined) user.name = name;
  if (email !== undefined) user.email = email;
  res.status(200).json(user);
});

// Delete
app.delete('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  users.splice(index, 1);
  res.status(204).send();
});

// Reset for testing
app.post('/users/reset', (req, res) => {
    users = [];
    nextId = 1;
    res.status(200).send();
});

module.exports = app;
