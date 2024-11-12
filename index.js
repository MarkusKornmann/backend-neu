import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json()); 

const PORT = 5050;

let todos = [
  { id: 1, name: "Milch holen", userId: 1 },
  { id: 2, name: "Wasser holen", userId: 2 },
  { id: 3, name: "Brötchen holen", userId: 3 },
  { id: 4, name: "Pommes holen", userId: 4 },
];

app.get('/', (req, res) => {
  res.send('Hello my name is MSK');
});

// GET-Routen für To-Dos
app.get('/todos/all', (req, res) => {
  res.json(todos);
});

// ... (andere GET-Routen)

app.post('/todos', (req, res) => {
  // ... (Code zum Hinzufügen von Todos)
});

app.delete('/todos', (req, res) => {
  const todoIds2Del = req.query.todoIds ? req.query.todoIds.split(',') : [];

  todos = todos.filter(todo => !todoIds2Del.includes(todo.id.toString()));

  const missingIds = todoIds2Del.filter(id => !todos.some(todo => todo.id === parseInt(id)));
  if (missingIds.length > 0) {
    return res.status(404).json({ error: `Todos with IDs ${missingIds.join(', ')} not found` });
  }

  res.status(200).json({ message: 'Todos deleted successfully' });
});

app.get('/todos/byid', (req, res) => {
  const todoId = req.query.todoId;
  if (!todoId) {
    return res.status(400).json({ error: 'No todoId provided' });
  }
  const todoIdNr = parseInt(todoId);
  const todo = todos.in-memorytodos.find((item) => item.id === todoIdNr);
  res.json(todo || {});
});

app.get('/todos/byname', (req, res) => {
  const name = req.query.name;
  if (!name) {
    return res.status(400).json({ error: 'No name provided' });
  }
  const foundTodos = todos.filter(todo => todo.name.toLowerCase().includes(name.toLowerCase()));
  res.json(foundTodos);
});

app.get('/todos/byuserid', (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).json({ error: 'No userId provided' });
  }
  const userIdNr = parseInt(userId);
  const userTodos = todos.filter((item) => item.userId === userIdNr);
  res.json(userTodos);
});

// POST-Route
app.post('/todos', (req, res) => {
  const { name, userId } = req.body;

  // Validierung
  if (!name || !userId) {
    return res.status(400).json({ error: 'Name und UserId sind erforderlich' });
  }

  // Neues Todo erstellen mit einer neuen ID
  const newTodo = {
    id: todos.length + 1,
    name,
    userId,
  };

  // Todo zum Array hinzufügen
  todos.push(newTodo);

  res.status(201).json(newTodo);
});

app.listen(PORT, () => {
  console.log(`Express App rennt auf Port: ${PORT}`);
});

/* import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());

const PORT = 5050;

const todos = [
  { id: 1, name: "Milch holen", userId: 1 },
  { id: 2, name: "Wasser holen", userId: 2 },
  { id: 3, name: "Brötchen holen", userId: 3 },
  { id: 4, name: "Pommes holen", userId: 4 },
];

app.get("/", function (req, res) {
  res.send("Hello my name is MSK");
});

app.get("/todos/all", (req, res) => {
  res.json(todos);
});

app.get("/todos/byid", (req, res) => {
  const todoId = req.query.todoId;
  if (!todoId) {
    return res.status(400).json({ error: 'No todoId provided' });
  }
  const todoIdNr = parseInt(todoId);
  const todo = todos.find((item) => item.id === todoIdNr);
  res.json(todo || {});
});

app.get("/todos/byname", (req, res) => {
  const name = req.query.name;
  if (!name) {
    return res.status(400).json({ error: 'No name provided' });
  }
  const foundTodos = todos.filter(todo => todo.name.toLowerCase().includes(name.toLowerCase()));
  res.json(foundTodos);
});

app.get("/todos/byuserid", (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).json({ error: 'No userId provided' });
  }
  const userIdNr = parseInt(userId);
  const userTodos = todos.filter((item) => item.userId === userIdNr);
  res.json(userTodos);
});

app.listen(PORT, () => {
  console.log(`Express App rennt auf Port: ${PORT}`);
}); */