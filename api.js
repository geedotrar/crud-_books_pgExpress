const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const bodyParser = require("body-parser");

const client = require("./connection");

const app = express();

app.use(bodyParser.json()); // berfungsi untuk menangkap post dari endpoint yang akan dibuat di postman

app.listen(3100, () => {
  console.log("Server running in port 3100");
});

client.connect((err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Connected");
  }
});

app.get("/books", (req, res) => {
  client.query(`Select * from books`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
  });
});

app.post("/books", (req, res) => {
  const { title, description, author } = req.body;

  client.query(`INSERT INTO books(title,description,author) VALUES ('${title}','${description}','${author}')`, (err, result) => {
    if (!err) {
      res.send("Insert Success");
    } else {
      res.send(err.message);
    }
  });
});

app.put("/books/:id", (req, res) => {
  const { title, description, author } = req.body;
  client.query(`update books set title = '${title}',description='${description}',author='${author}' where id = '${req.params.id}'`, (err, result) => {
    if (!err) {
      res.send("Update Success");
    } else {
      res.send(err.message);
    }
  });
});

app.delete("/books/:id", (req, res) => {
  client.query(`delete from books where id = ${req.params.id}`, (err, result) => {
    if (!err) {
      res.send("Delete Success");
    } else {
      res.send(err.message);
    }
  });
});

// app.delete("/books/:id", (request, response) => {
//   const id = parseInt(request.params.id);

//   app.query("DELETE FROM books WHERE id = $1", [id], (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(200).send(`User deleted with ID: ${id}`);
//   });
// });
