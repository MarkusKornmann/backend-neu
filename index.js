import express from "express";
import cors from "cors";
const app = express();

// Middleware
app.use(cors()) // Aktiviert CORS, damit andere Apps Anfragen an unsere API stellen können
app.use(express.json()) // Damit wir JSON-Daten aus dem Body der Anfragen lesen können

const PORT = 5050 // Unser Server wird auf diesem Port laufen

// hier haben wir ein einfaches Array, das als "Datenbank" für unsere Todos dient
let todos = [
  { id: 1, name: "Milch holen", userId: 1 },
  { id: 2, name: "Brötchen holen", userId: 1 },
];

app.get("/", function (req, res) {
  res.send("Hello my name is Tom");
});

app.get("/todos/all", (req, res) => {
  res.json(todos) // Schickt alle Todos als JSON zurück
})

// endpunkt um ein Todo anhand der ID zu suchen
app.get("/todos/byid", (req, res) => {
  // const query = req.query --> {"todoId": 1}
  const todoId = req.query.todoId;
  console.log("MY TODOID", typeof todoId);
  if (!todoId) res.send("No Todo Id provided");
  const todoIdNr = parseInt(todoId);
  const todo = todos.find((item) => item.id === todoIdNr);
  res.json(todo);
});

app.listen(PORT, () => {
  console.log(`Express App is running on http://localhost:${PORT}`);
});
